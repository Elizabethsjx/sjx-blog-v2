import { useEffect, useState, useMemo } from 'react';
import { SheetsService } from '../services/api';

/**
 * Daily Market Notes feed.
 * Pulls the advisor's daily notes from the backend (which reads Google Sheets)
 * and renders them grouped by date, newest first.
 */

const TREND_STYLES = {
  bullish: { label: 'Bullish', bg: 'var(--color-positive)', fg: '#ffffff' },
  bearish: { label: 'Bearish', bg: 'var(--color-negative)', fg: '#ffffff' },
  neutral: { label: 'Neutral', bg: 'var(--color-neutral)', fg: '#ffffff' },
};

const ASSET_KEYWORDS = [
  { tag: 'Bonds', words: ['bond', 'treasury', 'yield', 'rates', 'fixed income', 'IR'] },
  { tag: 'FX', words: ['yen', 'cny', 'dollar', 'usd', 'fx', 'currency', 'rmb', 'forex'] },
  { tag: 'Commodities', words: ['gold', 'silver', 'oil', 'commodity', 'copper', 'energy market', 'metals'] },
  { tag: 'Crypto', words: ['bitcoin', 'crypto', 'ethereum', 'eth', 'digital asset'] },
  { tag: 'Macro', words: ['macro', 'economy', 'inflation', 'federal reserve', 'fed', 'gdp', 'election', 'policy', 'labour', 'house'] },
];

function deriveAssetTag(stock) {
  const s = (stock || '').toLowerCase();
  for (const group of ASSET_KEYWORDS) {
    if (group.words.some((w) => s.includes(w))) return group.tag;
  }
  return 'Equities';
}

function formatDateForDisplay(dateStr) {
  if (!dateStr) return 'Undated';
  const d = new Date(dateStr);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  return dateStr;
}

const TrendBadge = ({ trendClass, trend }) => {
  const s = TREND_STYLES[trendClass] || TREND_STYLES.neutral;
  const label = trend && trend.trim() ? trend.trim() : s.label;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {label}
    </span>
  );
};

const NoteSummary = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 220;
  const shown = expanded || !isLong ? text : text.slice(0, 220) + '…';

  return (
    <div>
      <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        {shown}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs font-medium mt-1"
          style={{ color: 'var(--color-evercore-accent-blue)' }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

const NoteCard = ({ note }) => {
  const assetTag = deriveAssetTag(note.stock);
  return (
    <article
      className="rounded-lg border p-4 flex flex-col gap-2"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-semibold text-base leading-snug" style={{ color: 'var(--color-text-primary)' }}>
          {note.stock || 'Market note'}
        </h4>
        <TrendBadge trendClass={note.trend_class} trend={note.trend} />
      </div>

      {note.summary && <NoteSummary text={note.summary} />}

      <div className="flex items-center justify-between gap-3 mt-1">
        <span
          className="text-[11px] uppercase tracking-wider font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {assetTag}
        </span>
        {note.link && (
          <a
            href={note.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs font-medium"
            style={{ color: 'var(--color-evercore-accent-blue)' }}
          >
            Read source
            <svg className="h-3.5 w-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </article>
  );
};

const DailyNotesFeed = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    SheetsService.getDailyNotes()
      .then((data) => {
        if (cancelled) return;
        setNotes(data.items || []);
        setUpdatedAt(data.updated_at || null);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Unable to load daily notes.');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const note of notes) {
      const key = note.date || '';
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(note);
    }
    return Array.from(map.entries());
  }, [notes]);

  if (loading) {
    return (
      <div className="py-16 text-center" style={{ color: 'var(--color-text-muted)' }}>
        <div className="animate-pulse">Loading daily notes…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p className="font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Daily notes are temporarily unavailable
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {error}
        </p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="py-16 text-center" style={{ color: 'var(--color-text-muted)' }}>
        No daily notes yet. Check back soon.
      </div>
    );
  }

  const [latestDate, latestItems] = grouped[0];
  const olderGroups = grouped.slice(1);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-5">
        <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          {notes.length} note{notes.length === 1 ? '' : 's'}
          {updatedAt && ' · Updated ' + new Date(updatedAt).toLocaleTimeString()}
        </span>
      </div>

      {/* Latest panel — most recent date group, highlighted */}
      <div
        className="rounded-lg border-l-4 p-5 mb-8"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderLeftColor: 'var(--color-evercore-accent-blue)',
        }}
      >
        <div className="mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-evercore-accent-blue)' }}>
            Latest · {formatDateForDisplay(latestDate)}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latestItems.map((note, i) => (
            <NoteCard key={`latest-${i}`} note={note} />
          ))}
        </div>
      </div>

      {/* Older date groups */}
      <div className="space-y-8">
        {olderGroups.map(([date, items]) => (
          <div key={date || 'undated'}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                {formatDateForDisplay(date)}
              </span>
              <span className="flex-1 border-t" style={{ borderColor: 'var(--color-border)' }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((note, i) => (
                <NoteCard key={`${date}-${i}`} note={note} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyNotesFeed;
