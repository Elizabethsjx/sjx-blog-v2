"""Google Sheets service.

Pulls the advisor's daily market notes from a private Google Sheet using a
service account (gspread). Results are cached in-process with a time-to-live
so the sheet is not hammered on every request, and so the site degrades
gracefully (last-good data) when Google is unreachable.

Expected "Daily Notes" tab columns (row 1 = headers):
    Date | Stock's Name | News Abstraction | Trend | Link
"""
from __future__ import annotations

import logging
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

from ..core.config import settings

logger = logging.getLogger(__name__)

# Simple in-process TTL cache: key -> (expires_at_epoch, value)
_cache: Dict[str, tuple[float, Any]] = {}
_last_success: Dict[str, Any] = {}


def _is_configured() -> bool:
    return bool(settings.GOOGLE_SHEET_ID and settings.GOOGLE_SERVICE_ACCOUNT_FILE)


def _resolve_credentials_path() -> str:
    """Resolve the service account JSON path robustly.

    Supports an absolute path or a path relative to the backend directory
    (so both `credentials/x.json` and `./credentials/x.json` work regardless
    of the process's current working directory).
    """
    raw = settings.GOOGLE_SERVICE_ACCOUNT_FILE or ""
    if not raw:
        return ""

    candidate = Path(raw).expanduser()
    if candidate.is_absolute():
        return str(candidate)

    # Backend directory is two levels up from this file: services -> app -> backend
    backend_dir = Path(__file__).resolve().parent.parent.parent
    return str(backend_dir / raw)


def _get_client():
    """Return an authorized gspread client (lazily imported)."""
    import gspread

    return gspread.service_account(filename=_resolve_credentials_path())

def _normalize(value: Any) -> str:
    """Coerce a cell value to a clean string; blank -> empty string."""
    if value is None:
        return ""
    if isinstance(value, (int, float)):
        # Avoid float noise like 2024.0 -> "2024"
        if isinstance(value, float) and value.is_integer():
            return str(int(value))
        return str(value)
    return str(value).strip()


def _parse_date(value: Any) -> Optional[str]:
    """Normalize a date cell to ISO 'YYYY-MM-DD', or None if unparseable.

    Handles: 'YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'DD-Mon-YY/YYYY',
    and yearless 'DD-Mon' (year taken from SHEET_NOTES_DEFAULT_YEAR).
    gspread datetime objects are handled directly.
    """
    if isinstance(value, datetime):
        return value.strftime("%Y-%m-%d")

    text = _normalize(value)
    if not text:
        return None

    # Formats with an explicit year
    for fmt in (
        "%Y-%m-%d",
        "%d/%m/%Y",
        "%m/%d/%Y",
        "%d-%m-%Y",
        "%m-%d-%Y",
        "%d-%b-%Y",
        "%d-%b-%y",
        "%Y/%m/%d",
    ):
        try:
            return datetime.strptime(text, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue

    # Yearless 'D-Mon' / 'D Mon' formats
    for fmt in ("%d-%b", "%d %b", "%d-%B", "%d %B"):
        try:
            dt = datetime.strptime(text, fmt)
            return dt.replace(year=settings.SHEET_NOTES_DEFAULT_YEAR).strftime("%Y-%m-%d")
        except ValueError:
            continue

    # Fall back to the raw string (still groupable, just not reordered perfectly)
    return text


def _classify_trend(trend: str) -> str:
    """Map arbitrary trend text to a canonical category for coloring."""
    t = trend.lower()
    bullish = ("bull", "up", "positive", "buy", "outperform", "overweight",
               "long", "constructive", "favorable", "strong")
    bearish = ("bear", "down", "negative", "sell", "underperform",
               "underweight", "short", "cautious", "weak", "risky", "deteriorat")

    if any(w in t for w in bullish) and not any(w in t for w in bearish):
        return "bullish"
    if any(w in t for w in bearish) and not any(w in t for w in bullish):
        return "bearish"
    return "neutral"

def _read_notes_raw() -> List[Dict[str, Any]]:
    """Read and normalize rows from the notes tab. Raises on misconfiguration."""
    if not _is_configured():
        raise RuntimeError(
            "Google Sheets is not configured. Set GOOGLE_SHEET_ID and "
            "GOOGLE_SERVICE_ACCOUNT_FILE in backend/.env and share the sheet "
            "with the service account email."
        )

    client = _get_client()
    sheet = client.open_by_key(settings.GOOGLE_SHEET_ID)
    worksheet = sheet.worksheet(settings.GOOGLE_SHEET_NOTES_TAB)
    rows = worksheet.get_all_values()

    if not rows:
        return []

    headers = [_normalize(h) for h in rows[0]]
    lower = [h.lower() for h in headers]

    def col(*keywords: str) -> Optional[int]:
        for i, h in enumerate(lower):
            if any(k in h for k in keywords):
                return i
        return None

    date_col = col("date", "dato")
    stock_col = col("stock", "name")
    summary_col = col("abstraction", "news", "take", "comment", "insight")
    trend_col = col("trend")
    link_col = col("link")

    notes: List[Dict[str, Any]] = []
    for row in rows[1:]:
        def cell(idx: Optional[int]) -> str:
            return _normalize(row[idx]) if idx is not None and idx < len(row) else ""

        stock = cell(stock_col)
        summary = cell(summary_col)
        if not stock and not summary:
            continue  # skip fully-empty rows

        date_raw = cell(date_col)
        trend_raw = cell(trend_col)
        link = cell(link_col)

        notes.append(
            {
                "date": _parse_date(date_raw) or date_raw,
                "date_raw": date_raw,
                "stock": stock,
                "summary": summary,
                "trend": trend_raw,
                "trend_class": _classify_trend(trend_raw),
                "link": link,
            }
        )

    return notes


def get_daily_notes() -> List[Dict[str, Any]]:
    """Return daily notes with a TTL cache and last-good fallback.

    The list is returned raw (rows in sheet order); the router groups/sorts by
    date for display. On upstream errors we serve the last successful result
    if available, otherwise re-raise.
    """
    cache_key = "daily_notes"
    ttl_seconds = max(60, settings.SHEETS_CACHE_MINUTES * 60)
    now = time.time()

    cached = _cache.get(cache_key)
    if cached and cached[0] > now:
        return cached[1]

    try:
        notes = _read_notes_raw()
        _last_success[cache_key] = notes
        _cache[cache_key] = (now + ttl_seconds, notes)
        return notes
    except Exception as exc:  # noqa: BLE001 - degrade gracefully for any failure
        logger.warning("Failed to read Google Sheet notes: %s", exc)
        last = _last_success.get(cache_key)
        if last is not None:
            return last
        raise
