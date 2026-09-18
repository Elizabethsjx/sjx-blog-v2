import '../assets/css/hero.css';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DailyNotesFeed from '../components/DailyNotesFeed';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section — personal-brand positioning */}
      <section className="hero-section mb-16">
        <div className="hero-overlay"></div>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Financial district skyline"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-content container mx-auto px-6 text-center">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Wealth Management · Global Markets
          </p>
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto">
            Clearer markets. Confident decisions.
          </h1>
          <p className="hero-description text-lg md:text-xl">
            Daily market notes and plain-language guidance across equities, bonds,
            currencies, alternatives, and funds — from my desk to yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#daily-notes"
              className="hero-cta"
            >
              Read Today&apos;s Notes
            </a>
            <Button to="/contact" variant="outline" size="lg">
              Book a Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Market Notes — primary section */}
      <section id="daily-notes" className="mb-16 container mx-auto px-6">
        <h2 className="section-title">Daily Market Notes</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          A running read on the stories and names I&apos;m watching, updated from my desk.
        </p>
        <DailyNotesFeed />
      </section>

      {/* Latest insights teaser */}
      <section className="mb-16 container mx-auto px-6">
        <h2 className="section-title">Latest Insights</h2>
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Deeper analysis on the themes moving markets.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8">
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-evercore-accent-blue)' }}>
              Equities
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">Market Commentary</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Insights and commentary on what&apos;s driving equities, bonds, and funds.
            </p>
            <Button to="/blog" variant="text" size="sm">
              View all insights →
            </Button>
          </Card>
          <Card className="p-8">
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-evercore-accent-blue)' }}>
              Markets
            </div>
            <h3 className="font-serif text-xl font-semibold mb-2">Market Watch</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              A snapshot of the names and indices on my radar.
            </p>
            <Button to="/watchlist" variant="text" size="sm">
              View markets →
            </Button>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16 container mx-auto px-6">
        <Card className="p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl font-semibold mb-3">Subscribe to My Notes</h2>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Receive my market notes and commentary directly in your inbox.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="evercore-input px-4 py-2 md:flex-1"
              />
              <Button variant="primary">Subscribe</Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
