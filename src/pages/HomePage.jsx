import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import '../assets/css/hero.css';

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  
  const carouselItems = [
    {
      title: "Financial Insights",
      description: "Analysis and insights on financial markets, investment strategies, and economic trends",
      buttonText: "Explore Articles",
      buttonLink: "/blog"
    },
    {
      title: "Suggested Stocks",
      description: "Track trending stocks and market movers in real-time.",
      buttonText: "View Suggested Stocks",
      buttonLink: "/watchlist"
    }
  ];

  // Auto-play function
  const startAutoPlay = () => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 4000); // Change every 4 seconds
  };

  // Navigate to next slide
  const nextSlide = () => {
    setActiveIndex(prevIndex => 
      prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous slide
  const prevSlide = () => {
    setActiveIndex(prevIndex => 
      prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
    );
  };

  // Start/reset timer when activeIndex changes
  useEffect(() => {
    clearInterval(timerRef.current);
    startAutoPlay();
    
    return () => clearInterval(timerRef.current); // Clean up on unmount
  }, [activeIndex]);
  return (
    <div>
      {/* Hero Section with Carousel */}
      <section className="hero-background text-white py-16 rounded-lg mb-12 relative overflow-hidden">
        <div className="hero-carousel relative">
          {/* Carousel Track */}
          <div 
            className="carousel-track flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {/* Carousel Items */}
            {carouselItems.map((item, index) => (
              <div key={index} className="carousel-item w-full flex-shrink-0">
                <div className="hero-content container mx-auto px-4 text-center">
                  <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
                  <p className="hero-description text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    {item.description}
                  </p>
                  <Link 
                    to={item.buttonLink} 
                    className="bg-white text-blue-800 hover:bg-blue-100 transition px-6 py-3 rounded-full font-semibold text-lg inline-block cursor-pointer"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <button 
            className="carousel-nav-btn carousel-prev absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 focus:outline-none z-20"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="carousel-nav-btn carousel-next absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 focus:outline-none z-20"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="carousel-indicators absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Stocks Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Suggested Stocks</h2>
          <Link to="/watchlist" className="text-blue-600 hover:text-blue-800 transition">View All</Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symbol / Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chart
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: 1,
                    symbol: 'AAPL',
                    name: 'Apple Inc.',
                    price: 187.62,
                    change: 1.24,
                    changePercent: 0.67,
                    chartColor: 'green'
                  },
                  {
                    id: 2,
                    symbol: 'MSFT',
                    name: 'Microsoft Corporation',
                    price: 329.37,
                    change: -2.76,
                    changePercent: -0.83,
                    chartColor: 'red'
                  },
                  {
                    id: 3,
                    symbol: 'GOOGL',
                    name: 'Alphabet Inc.',
                    price: 142.93,
                    change: 1.86,
                    changePercent: 1.32,
                    chartColor: 'green'
                  },
                  {
                    id: 4,
                    symbol: 'AMZN',
                    name: 'Amazon.com Inc.',
                    price: 148.25,
                    change: -0.35,
                    changePercent: -0.24,
                    chartColor: 'red'
                  },
                  {
                    id: 5,
                    symbol: 'TSLA',
                    name: 'Tesla, Inc.',
                    price: 217.83,
                    change: 6.52,
                    changePercent: 3.08,
                    chartColor: 'green'
                  }
                ].map((stock) => (
                  <tr key={stock.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{stock.symbol}</div>
                        <div className="text-sm text-gray-500">{stock.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${stock.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
                        <span className="ml-1">({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Mini chart component */}
                      <svg width={80} height={30} className="stock-mini-chart">
                        <polyline
                          points={(() => {
                            // Generate random points for the mini chart
                            const points = [];
                            const numPoints = 10;
                            let y = 15; // Start in the middle
                            
                            for (let i = 0; i < numPoints; i++) {
                              // Add some random variation for the chart
                              const randomChange = Math.random() * 5 - 2.5;
                              y = Math.max(5, Math.min(25, y + randomChange));
                              points.push(`${(i / (numPoints - 1)) * 80},${y}`);
                            }
                            
                            return points.join(' ');
                          })()}
                          stroke={stock.chartColor === 'green' ? '#10b981' : '#ef4444'}
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/stocks/${stock.symbol}`} className="text-blue-600 hover:text-blue-900">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <Link to="/blog" className="text-blue-600 hover:text-blue-800 transition">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Featured Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Market Analysis" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Stock Analysis</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Understanding Market Volatility in 2025</h3>
              <p className="text-gray-600 mb-4">An in-depth look at what's driving market fluctuations this year and strategies to navigate uncertainty.</p>
              <Link to="/blog/1" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Featured Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Cryptocurrency" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Cryptocurrency</span>
              <h3 className="text-xl font-bold mb-2 mt-1">The Evolution of Blockchain and Financial Markets</h3>
              <p className="text-gray-600 mb-4">How blockchain technology continues to reshape traditional finance and investment opportunities.</p>
              <Link to="/blog/2" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Featured Post 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Investment Strategy" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Investment Strategy</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Building a Resilient Portfolio for Long-term Growth</h3>
              <p className="text-gray-600 mb-4">Essential strategies for creating a diversified investment portfolio that can withstand market turbulence.</p>
              <Link to="/blog/3" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stocks Market Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Stocks Market</h2>
          <Link to="/stocks" className="text-blue-600 hover:text-blue-800 transition">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stock Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Stock Trading" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Market Trends</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Q3 Earnings Season: What to Expect</h3>
              <p className="text-gray-600 mb-4">Our analysis of upcoming earnings reports and their potential impact on major market indices.</p>
              <Link to="/stocks/earnings" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Stock Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Tech Stocks" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Sector Analysis</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Tech Sector: Growth Opportunities in AI</h3>
              <p className="text-gray-600 mb-4">Exploring how artificial intelligence innovations are creating new investment opportunities in the tech sector.</p>
              <Link to="/stocks/tech-sector" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Stock Post 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Green Investing" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">ESG Investing</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Sustainable Stocks: The Green Revolution</h3>
              <p className="text-gray-600 mb-4">How environmental, social, and governance factors are reshaping investment strategies in traditional markets.</p>
              <Link to="/stocks/esg-investing" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bonds Market Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Bonds Market</h2>
          <Link to="/bonds" className="text-blue-600 hover:text-blue-800 transition">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bond Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Treasury Bonds</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Treasury Yield Curve: Signals and Implications</h3>
              <p className="text-gray-600 mb-4">Understanding what the current yield curve tells us about economic expectations and investor sentiment.</p>
              <Link to="/bonds/yield-curve" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Bond Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Corporate Bonds</span>
              <h3 className="text-xl font-bold mb-2 mt-1">High-Yield vs. Investment Grade: Risk Assessment</h3>
              <p className="text-gray-600 mb-4">Analyzing the risk-reward profiles of different corporate bond categories in the current market.</p>
              <Link to="/bonds/corporate" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* Bond Post 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <span className="text-blue-600 text-sm font-semibold">Municipal Bonds</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Tax-Exempt Strategies for Income Investors</h3>
              <p className="text-gray-600 mb-4">How municipal bonds can provide tax advantages while generating steady income in your portfolio.</p>
              <Link to="/bonds/municipal" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOMC Section */}
      <section className="mb-12 bg-gray-50 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Federal Reserve & Monetary Policy</h2>
          <Link to="/fomc" className="text-blue-600 hover:text-blue-800 transition">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FOMC Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
            <div className="w-1/3 bg-blue-100 flex items-center justify-center">
              <div className="text-blue-800 text-4xl font-bold">FED</div>
            </div>
            <div className="w-2/3 p-6">
              <span className="text-blue-600 text-sm font-semibold">FOMC Meetings</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Interest Rate Outlook: Fed's Next Moves</h3>
              <p className="text-gray-600 mb-4">Expert analysis of recent FOMC statements and what they indicate about future monetary policy.</p>
              <Link to="/fomc/interest-rates" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>

          {/* FOMC Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
            <div className="w-1/3 bg-green-100 flex items-center justify-center">
              <div className="text-green-800 text-4xl font-bold">QE</div>
            </div>
            <div className="w-2/3 p-6">
              <span className="text-blue-600 text-sm font-semibold">Monetary Policy</span>
              <h3 className="text-xl font-bold mb-2 mt-1">Quantitative Easing: Impact on Markets</h3>
              <p className="text-gray-600 mb-4">How central bank asset purchases affect different asset classes and investment strategies.</p>
              <Link to="/fomc/quantitative-easing" className="text-blue-600 hover:text-blue-800 font-medium">Read More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/categories/stocks" className="bg-blue-100 hover:bg-blue-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-blue-800">Stocks</h3>
          </Link>
          <Link to="/categories/crypto" className="bg-purple-100 hover:bg-purple-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-purple-800">Cryptocurrency</h3>
          </Link>
          <Link to="/categories/strategies" className="bg-green-100 hover:bg-green-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-green-800">Investment Strategies</h3>
          </Link>
          <Link to="/categories/economy" className="bg-yellow-100 hover:bg-yellow-200 transition p-6 rounded-lg text-center">
            <h3 className="font-bold text-yellow-800">Economy</h3>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 p-8 rounded-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest financial insights and analysis.</p>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg border flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
