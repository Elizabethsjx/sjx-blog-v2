import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostService, SheetsService } from "../services/api";

const sampleJournals = [
  {
    id: "sample-1",
    title: "Markets are moving. Do you need to do anything?",
    summary:
      "A simpler way to think about market headlines, your time horizon, and the next question to ask.",
    category: "The bigger picture",
    date: "Sample journal",
    demo: true,
  },
  {
    id: "sample-2",
    title: "A good company. But is it a good investment?",
    summary:
      "Why understanding a business is only one part of deciding whether an investment makes sense.",
    category: "Investing, explained",
    date: "Sample journal",
    demo: true,
  },
];
const researchPrompts = [
  {
    stock: "Beyond the AI headlines",
    summary: "Which businesses can turn investment in AI into lasting profits?",
    tag: "Technology",
  },
  {
    stock: "The interest-rate effect",
    summary: "How could changing borrowing costs affect companies and funds?",
    tag: "The economy",
  },
  {
    stock: "Looking beyond one market",
    summary:
      "Is a portfolio depending too heavily on a single country or idea?",
    tag: "Diversification",
  },
];
const watchlist = [
  {
    symbol: "AAPL",
    name: "Apple",
    sector: "Consumer technology",
    question: "What could drive the next stage of growth?",
    risk: "Demand, competition and the price paid for future growth.",
    letter: "a",
    tone: "silver",
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    sector: "Software & cloud",
    question: "Can growth keep pace with investment spending?",
    risk: "Capital spending, competition and earnings expectations.",
    letter: "m",
    tone: "mint",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet",
    sector: "Search & digital services",
    question: "How might competition change the long-term story?",
    risk: "Advertising demand, regulation and changing search habits.",
    letter: "g",
    tone: "sand",
  },
];

function plainText(html = "") {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}
function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Journal"
    : date.toLocaleDateString("en-SG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
}

export default function HomePage() {
  const [journals, setJournals] = useState(sampleJournals);
  const [journalState, setJournalState] = useState("loading");
  const [notes, setNotes] = useState(researchPrompts);
  const [notesState, setNotesState] = useState("loading");
  const [readerPath, setReaderPath] = useState("guided");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setJournalState("loading");
    setNotesState("loading");
    PostService.getAllPosts(1, 2)
      .then((data) => {
        if (cancelled) return;
        const posts = (data.items || data.posts || []).slice(0, 2);
        if (!posts.length) {
          setJournalState("empty");
          return;
        }
        setJournals(
          posts.map((post) => ({
            id: post.id,
            title: post.title,
            summary: plainText(post.content).slice(0, 180),
            category: post.category?.name || "My journal",
            date: formatDate(post.updated_at || post.created_at),
            demo: false,
          })),
        );
        setJournalState("ready");
      })
      .catch(() => {
        if (!cancelled) setJournalState("offline");
      });
    SheetsService.getDailyNotes()
      .then((data) => {
        if (cancelled) return;
        const items = (data.items || []).slice(0, 3);
        if (!items.length) {
          setNotesState("empty");
          return;
        }
        setNotes(items);
        setNotesState("ready");
      })
      .catch(() => {
        if (!cancelled) setNotesState("offline");
      });
    return () => {
      cancelled = true;
    };
  }, [retry]);

  return (
    <div className="sjx-home">
      <section className="sjx-hero" aria-labelledby="sjx-hero-heading">
        <div className="sjx-hero-art" aria-hidden="true">
          <div className="sjx-orbit" />
          <div className="sjx-orbit sjx-orbit-two" />
          <div className="sjx-globe" />
          <div className="sjx-light-line" />
        </div>
        <div className="sjx-wrap sjx-hero-copy">
          <span className="sjx-pill sjx-hero-pill">
            <span className="sjx-dot" /> A personal perspective on investing
          </span>
          <h1 id="sjx-hero-heading">
            A clearer market view.
            <br />
            <span>A more confident you.</span>
          </h1>
          <p>
            What's happening, what I'm watching, and what it could mean for your
            money. Let's make sense of it together.
          </p>
          <div className="sjx-actions">
            <a className="sjx-button sjx-button-light" href="#latest-journals">
              Read my latest journals <span aria-hidden="true">↗</span>
            </a>
            <a className="sjx-button sjx-button-glass" href="#get-started">
              New to investing? Start here <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="sjx-hero-signature">
            <span className="sjx-avatar">J</span>
            <span>
              Notes by Junxi <span className="sjx-signature-divider">/</span>{" "}
              Finance in everyday language
            </span>
          </div>
        </div>
      </section>

      <div className="sjx-wrap">
        <section
          className="sjx-journals-section"
          id="latest-journals"
          aria-labelledby="sjx-journals-heading"
        >
          <div className="sjx-section-heading">
            <div>
              <span className="sjx-kicker">01 — FROM MY DESK</span>
              <h2 id="sjx-journals-heading">Your next five-minute read.</h2>
            </div>
            <Link className="sjx-inline-link" to="/blog">
              All journals <span aria-hidden="true">↗</span>
            </Link>
          </div>
          {journalState !== "ready" && (
            <div className="sjx-content-status" role="status">
              <span>
                {journalState === "loading"
                  ? "Connecting to the journal. Sample layouts shown below."
                  : journalState === "empty"
                    ? "Your first journals will appear here. These are sample layouts."
                    : "The journal is temporarily unavailable. Sample layouts shown below."}
              </span>
              {journalState === "offline" && (
                <button onClick={() => setRetry((value) => value + 1)}>
                  Try again
                </button>
              )}
            </div>
          )}
          <div className="sjx-journal-grid">
            {journals.map((journal, index) => (
              <article
                className={`sjx-journal-card ${index === 0 ? "sjx-journal-featured" : ""}`}
                key={journal.id}
              >
                <div
                  className={`sjx-journal-art sjx-art-${index}`}
                  aria-hidden="true"
                >
                  <div className="sjx-art-ring" />
                  <div className="sjx-art-ring sjx-art-ring-2" />
                  <div className="sjx-art-sphere" />
                  <span>
                    {index === 0 ? "A LITTLE PERSPECTIVE" : "A BETTER QUESTION"}
                  </span>
                </div>
                <div className="sjx-journal-content">
                  <div className="sjx-card-meta">
                    <span>{journal.category}</span>
                    <span>{journal.date}</span>
                  </div>
                  <h3>{journal.title}</h3>
                  <p>{journal.summary}</p>
                  {journal.demo ? (
                    <details className="sjx-journal-details">
                      <summary>
                        What you'll find in my journals{" "}
                        <span aria-hidden="true">↗</span>
                      </summary>
                      <p>
                        What happened → why it matters → my view → what could
                        change my mind. These sample headlines show the layout;
                        published journals will replace them.
                      </p>
                    </details>
                  ) : (
                    <Link
                      className="sjx-inline-link"
                      to={`/blog/${journal.id}`}
                    >
                      Read the journal <span aria-hidden="true">↗</span>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="sjx-section"
          id="research-trends"
          aria-labelledby="sjx-trends-heading"
        >
          <div className="sjx-section-heading">
            <div>
              <span className="sjx-kicker">02 — CONNECTING THE DOTS</span>
              <h2 id="sjx-trends-heading">What's on my radar.</h2>
              <p>The ideas behind the headlines, explained simply.</p>
            </div>
            <span className="sjx-pill">
              {notesState === "ready"
                ? "From my market notes"
                : "Example research prompts"}
            </span>
          </div>
          <div className="sjx-trend-grid">
            {notes.map((note, index) => (
              <article className="sjx-trend" key={`${note.stock}-${index}`}>
                <div className="sjx-trend-top">
                  <span className="sjx-trend-number">0{index + 1}</span>
                  <span>{note.tag || "Market note"}</span>
                </div>
                <h3>{note.stock || "A market idea"}</h3>
                <p>{note.summary || "More research to follow."}</p>
                {note.link && /^https?:\/\//i.test(note.link) && (
                  <a
                    className="sjx-inline-link"
                    href={note.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read the source ↗
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section
          className="sjx-portfolio sjx-section"
          id="client-portfolio"
          aria-labelledby="sjx-portfolio-heading"
        >
          <div className="sjx-portfolio-story">
            <span className="sjx-pill">GREAT EASTERN · CLIENT JOURNEY</span>
            <h2 id="sjx-portfolio-heading">
              A plan for real life.
              <br />
              <span>Progress you can follow.</span>
            </h2>
            <p>
              Behind every portfolio is a person and a goal. Here, I'll share
              the approach, the decisions, and the progress along the way.
            </p>
            <Link className="sjx-button sjx-button-dark" to="/contact">
              Talk about your goals <span aria-hidden="true">↗</span>
            </Link>
            <small>Great Eastern investment-linked policy (ILP)</small>
          </div>
          <div className="sjx-portfolio-preview">
            <div className="sjx-portfolio-preview-top">
              <span className="sjx-portfolio-icon" aria-hidden="true">
                ↗
              </span>
              <span>Portfolio update</span>
              <span className="sjx-pill">Coming soon</span>
            </div>
            <div className="sjx-return-placeholder">
              <span>Client portfolio return</span>
              <strong>
                Every number.
                <br />
                With its full story.
              </strong>
              <p>Verified results will be added here.</p>
            </div>
            <dl>
              <div>
                <dt>Investment goal</dt>
                <dd>To be shared</dd>
              </div>
              <div>
                <dt>Time period</dt>
                <dd>To be confirmed</dd>
              </div>
              <div>
                <dt>Funds & charges</dt>
                <dd>Included in the full update</dd>
              </div>
            </dl>
            <p className="sjx-small-print">
              No performance figures shown yet. Past performance does not
              guarantee future results.
            </p>
          </div>
        </section>

        <section
          className="sjx-section"
          id="weekly-watchlist"
          aria-labelledby="sjx-watchlist-heading"
        >
          <div className="sjx-section-heading">
            <div>
              <span className="sjx-kicker">03 — COMPANIES I'M EXPLORING</span>
              <h2 id="sjx-watchlist-heading">A watchlist. With the why.</h2>
              <p>
                Start with the business, the question, and what could go wrong.
              </p>
            </div>
            <Link className="sjx-inline-link" to="/watchlist">
              Explore the watchlist <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="sjx-watch-grid">
            {watchlist.map((stock) => (
              <article className="sjx-watch-card" key={stock.symbol}>
                <div className="sjx-watch-top">
                  <span
                    className={`sjx-stock-logo ${stock.tone}`}
                    aria-hidden="true"
                  >
                    {stock.letter}
                  </span>
                  <div>
                    <h3>{stock.name}</h3>
                    <span>
                      {stock.symbol} · {stock.sector}
                    </span>
                  </div>
                </div>
                <span className="sjx-pill">Sample research idea</span>
                <h4>{stock.question}</h4>
                <details>
                  <summary>
                    The risks to research <span aria-hidden="true">+</span>
                  </summary>
                  <p>{stock.risk}</p>
                </details>
              </article>
            ))}
          </div>
          <p className="sjx-small-print">
            Example entries for this layout, not current recommendations. Your
            weekly research will replace these.
          </p>
        </section>

        <section
          className="sjx-start sjx-section"
          id="get-started"
          aria-labelledby="sjx-start-heading"
        >
          <div className="sjx-start-intro">
            <span className="sjx-kicker">YOUR NEXT CHAPTER</span>
            <h2 id="sjx-start-heading">
              You don't need to
              <br /> figure it all out alone.
            </h2>
            <p>Choose where you'd like to start.</p>
          </div>
          <div className="sjx-start-panel">
            <div
              className="sjx-path-selector"
              role="group"
              aria-label="What would you like to learn about?"
            >
              <button
                aria-pressed={readerPath === "guided"}
                onClick={() => setReaderPath("guided")}
              >
                Explore GE ILPs with me
              </button>
              <button
                aria-pressed={readerPath === "stocks"}
                onClick={() => setReaderPath("stocks")}
              >
                Research individual stocks
              </button>
            </div>
            <div className="sjx-path-content" aria-live="polite">
              {readerPath === "guided" ? (
                <>
                  <h3>Understand the plan. Then decide.</h3>
                  <p>
                    Learn how an investment-linked policy works, the funds
                    available, its fees and risks, and what happens if you
                    withdraw early. Then we can discuss your goals.
                  </p>
                  <Link className="sjx-button sjx-button-light" to="/contact">
                    Let's have a conversation <span aria-hidden="true">↗</span>
                  </Link>
                </>
              ) : (
                <>
                  <h3>Get to know the business first.</h3>
                  <p>
                    Explore company research, understand the main risks, and
                    develop your own questions. My stock watchlist is separate
                    from the Great Eastern ILP journey.
                  </p>
                  <Link className="sjx-button sjx-button-light" to="/watchlist">
                    Explore company research <span aria-hidden="true">↗</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
        <section className="sjx-basics" aria-labelledby="sjx-basics-heading">
          <div>
            <span className="sjx-kicker">NO FINANCE BACKGROUND NEEDED</span>
            <h2 id="sjx-basics-heading">A few questions to start with.</h2>
          </div>
          <div>
            <details>
              <summary>
                What's the difference between stocks and funds?{" "}
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                A stock represents ownership in a company. A fund pools
                investors' money to hold investments according to a stated
                strategy. The risks depend on what you own, not simply how many
                investments there are.
              </p>
            </details>
            <details>
              <summary>
                What is an investment-linked policy?{" "}
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                An ILP combines life insurance with investment-linked funds.
                Policy charges, investment risks and withdrawal terms matter
                alongside fund performance.{" "}
                <a
                  href="https://www.greateasternlife.com/sg/en/personal-insurance/lifepedia/savings-and-investment/5-things-must-understand-before-buying-investment-linked-policy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Great Eastern's guide ↗
                </a>
              </p>
            </details>
            <details>
              <summary>
                Does a watchlist mean I should buy?{" "}
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                No. A watchlist is a starting point for research. Your goals,
                time horizon, risk tolerance and financial situation still need
                to be considered.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
