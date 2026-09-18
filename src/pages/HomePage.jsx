import '../assets/css/hero.css';
import DailyNotesFeed from '../components/DailyNotesFeed';

const HomePage = () => {
  return (
    <div>
      {/* Slim hero band */}
      <section className="hero-band mb-12">
        <h1 className="hero-band-title">Clearer markets. Confident decisions.</h1>
        <p className="hero-band-sub">
          Daily market notes and plain-language guidance across equities, bonds,
          currencies, alternatives, and funds.
        </p>
      </section>

      {/* Daily Market Notes — primary focus */}
      <section id="daily-notes" className="mb-12 container mx-auto px-6">
        <h2 className="section-title">Today&apos;s Market Notes</h2>
        <DailyNotesFeed />
      </section>

      {/* Latest insights — quiet list */}
      <section className="mb-12 container mx-auto px-6">
        <h2 className="section-title">Latest Insights</h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          Deeper analysis on the themes moving markets.{' '}
          <a href="/blog" style={{ color: 'var(--color-evercore-accent-blue)' }} className="font-medium">
            View all →
          </a>
        </p>
      </section>
    </div>
  );
};

export default HomePage;