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

function formatDateForDisplay(dateStr) {
  if (!dateStr) return 'Undated';
  // If already ISO, prettify; otherwise return as-is
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

  const TrendBadge = ({ trendClass, trend }) => {
    const s = TREND_STYLES[trendClass] || TREND_STYLES.neutral;
    const label = trend && trend.trim() ? trend.trim() : s.label;
    return (
      <span
        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
        style={{ backgroundColor: s.bg, color: s.fg }}
      >
        {label}
      </span>
    );
  };

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

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
          {notes.length} note{notes.length === 1 ? '' : 's'}
          {updatedAt && ' · Updated ' + new Date(updatedAt).toLocaleTimeString()}
        </span>
      </div>

      <div className="space-y-10">
        {grouped.map(([date, items]) => (
          <div key={date || 'undated'}>
            <h3
              className="text-sm font-sans font-semibold uppercase tracking-wider mb-4 pb-2 border-b"
              style={{
                color: 'var(--color-evercore-accent-blue)',
                borderColor: 'var(--color-border)',
              }}
            >
              {formatDateForDisplay(date)}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((note, i) => (
                <article
                  key={`${date}-${i}`}
                  className="evercore-card rounded-lg p-5 flex flex-col"
                  style={{ backgroundColor: 'var(--color-card-bg)' }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4
                      className="font-sans font-semibold text-base leading-snug"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {note.stock || 'Market note'}
                    </h4>
                    <TrendBadge trendClass={note.trend_class} trend={note.trend} />
                  </div>

                  {note.summary && (
                    <p
                      className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {note.summary}
                    </p>
                  )}

                  {note.link && (
                    <a
                      href={note.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium"
                      style={{ color: 'var(--color-evercore-accent-blue)' }}
                    >
                      Read more
                      <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyNotesFeed;
