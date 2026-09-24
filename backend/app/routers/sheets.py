from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException

from ..schemas.schemas import DailyNote, DailyNotesResponse
from ..services.gsheets import get_daily_notes

router = APIRouter(
    prefix="/api",
    tags=["sheets"],
)


def _sort_key(note: dict) -> str:
    # ISO dates sort correctly as strings; blank dates sort last.
    return note.get("date") or "0000-00-00"


@router.get("/daily-notes", response_model=DailyNotesResponse)
def daily_notes() -> DailyNotesResponse:
    """Return the advisor's daily market notes, newest first.

    Pulls from Google Sheets (cached/fallback handled in the service).
    """
    try:
        raw = get_daily_notes()
    except Exception as exc:  # noqa: BLE001 - surface a friendly error to the client
        raise HTTPException(status_code=502, detail=f"Unable to load daily notes: {exc}")

    # Newest date first, keep original order within the same date.
    raw_sorted = sorted(raw, key=_sort_key, reverse=True)
    items = [DailyNote(**n) for n in raw_sorted]
    return DailyNotesResponse(
        items=items,
        total=len(items),
        updated_at=datetime.now(timezone.utc),
    )
