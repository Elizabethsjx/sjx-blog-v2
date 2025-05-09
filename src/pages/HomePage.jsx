import { Link } from 'react-router-dom';
import '../assets/css/hero.css';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';

const HomePage = () => {
  const { darkMode } = useTheme();
  
  return (
    <div>
      {/* Hero Section - Based on Evercore reference */}
      <section className="hero-section mb-16">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Financial district skyline" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-content container mx-auto px-6 text-center">
          <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl max-w-4xl mx-auto">
            Independent Financial Analysis &amp; Market Insights
          </h1>
          <p className="hero-description text-lg md:text-xl">
            Providing in-depth analysis and strategic perspectives on financial markets, investment opportunities, and economic trends.
          </p>
          <Button 
            to="/blog"
            variant="outline"
            size="lg"
            className="hero-cta"
          >
            View Our Insights
          </Button>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="mb-16 container mx-auto px-6">
        <h2 className="section-title">Market Overview</h2>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y" style={{ borderColor: 'var(--color-table-border)' }}>
              <thead style={{ backgroundColor: 'var(--color-table-header-bg)', color: 'var(--color-table-header-text)' }}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Symbol / Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Change
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Chart
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--color-table-border)' }}>
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
                  <tr key={stock.id} className="hover:bg-evercore-gray-50 dark:hover:bg-evercore-navy-800 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium">{stock.symbol}</div>
                        <div className="text-sm text-evercore-navy-500 dark:text-evercore-navy-400">{stock.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">${stock.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${stock.changePercent >= 0 ? 'evercore-positive' : 'evercore-negative'}`}>
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
                          stroke={stock.chartColor === 'green' ? 'var(--color-positive)' : 'var(--color-negative)'}
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/stocks/${stock.symbol}`} className="text-evercore-accent-blue hover:text-evercore-navy-700 underline-offset-2 hover:underline text-sm py-1 px-3">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-evercore-gray-200 dark:border-evercore-navy-700 text-right">
            <Button to="/watchlist" variant="text">View All Markets</Button>
          </div>
        </Card>
      </section>

      {/* Featured Insights Section */}
      <section className="mb-16 container mx-auto px-6">
        <h2 className="section-title">Featured Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Featured Post 1 */}
          <Card className="overflow-hidden" hover={true}>
            <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Market Analysis" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="text-xs text-evercore-navy-500 dark:text-evercore-navy-400 uppercase tracking-wider mb-2">Stock Analysis</div>
              <h3 className="section-subtitle">Understanding Market Volatility in 2025</h3>
              <p className="text-evercore-navy-600 dark:text-evercore-navy-300 text-sm mb-4">An in-depth look at what's driving market fluctuations this year and strategies to navigate uncertainty.</p>
              <Button to="/blog/1" variant="text">Read Analysis</Button>
            </div>
          </Card>

          {/* Featured Post 2 */}
          <Card className="overflow-hidden" hover={true}>
            <img src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Cryptocurrency" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="text-xs text-evercore-navy-500 dark:text-evercore-navy-400 uppercase tracking-wider mb-2">Cryptocurrency</div>
              <h3 className="section-subtitle">The Evolution of Blockchain and Financial Markets</h3>
              <p className="text-evercore-navy-600 dark:text-evercore-navy-300 text-sm mb-4">How blockchain technology continues to reshape traditional finance and investment opportunities.</p>
              <Button to="/blog/2" variant="text">Read Analysis</Button>
            </div>
          </Card>

          {/* Featured Post 3 */}
          <Card className="overflow-hidden" hover={true}>
            <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Investment Strategy" className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="text-xs text-evercore-navy-500 dark:text-evercore-navy-400 uppercase tracking-wider mb-2">Investment Strategy</div>
              <h3 className="section-subtitle">Building a Resilient Portfolio for Long-term Growth</h3>
              <p className="text-evercore-navy-600 dark:text-evercore-navy-300 text-sm mb-4">Essential strategies for creating a diversified investment portfolio that can withstand market turbulence.</p>
              <Button to="/blog/3" variant="text">Read Analysis</Button>
            </div>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Button to="/blog" variant="outline">View All Insights</Button>
        </div>
      </section>

      {/* Investment Sectors Section */}
      <section className="mb-16 container mx-auto px-6">
        <h2 className="section-title">Investment Sectors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6" hover={true}>
            <h3 className="font-serif text-lg font-semibold mb-3">Technology</h3>
            <p className="text-sm text-evercore-navy-600 dark:text-evercore-navy-300 mb-4">Analysis of tech sector trends, emerging technologies, and growth opportunities.</p>
            <Button to="/categories/technology" variant="text" size="sm">Explore</Button>
          </Card>
          
          <Card className="p-6" hover={true}>
            <h3 className="font-serif text-lg font-semibold mb-3">Healthcare</h3>
            <p className="text-sm text-evercore-navy-600 dark:text-evercore-navy-300 mb-4">Insights on healthcare innovations, regulatory impacts, and investment considerations.</p>
            <Button to="/categories/healthcare" variant="text" size="sm">Explore</Button>
          </Card>
          
          <Card className="p-6" hover={true}>
            <h3 className="font-serif text-lg font-semibold mb-3">Financials</h3>
            <p className="text-sm text-evercore-navy-600 dark:text-evercore-navy-300 mb-4">Market intelligence on banking, fintech, and changing financial landscapes.</p>
            <Button to="/categories/financials" variant="text" size="sm">Explore</Button>
          </Card>
          
          <Card className="p-6" hover={true}>
            <h3 className="font-serif text-lg font-semibold mb-3">Energy</h3>
            <p className="text-sm text-evercore-navy-600 dark:text-evercore-navy-300 mb-4">Research on traditional and renewable energy markets and sustainability trends.</p>
            <Button to="/categories/energy" variant="text" size="sm">Explore</Button>
          </Card>
        </div>
      </section>

      {/* Research & Analysis Section */}
      <section className="mb-16 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="section-title">Research Services</h2>
            <p className="text-evercore-navy-700 dark:text-evercore-navy-300 mb-6">
              Our team provides in-depth financial research and market analysis to help investors make informed decisions in an increasingly complex global landscape.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-evercore-accent-blue mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Macroeconomic trend analysis</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-evercore-accent-blue mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Sector-specific investment opportunities</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-evercore-accent-blue mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Risk assessment and portfolio optimization</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-evercore-accent-blue mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>Customized investment strategy development</span>
              </li>
            </ul>
            <Button to="/about" variant="primary">Learn More</Button>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="p-8" bordered={false} hover={false}>
              <h3 className="font-serif text-xl font-semibold mb-4">Federal Reserve & Monetary Policy</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Policy Item 1 */}
                <div className="border-b border-evercore-gray-200 dark:border-evercore-navy-700 pb-4">
                  <div className="text-xs text-evercore-navy-500 dark:text-evercore-navy-400 uppercase tracking-wider mb-2">FOMC</div>
                  <h4 className="font-medium text-base mb-2">Interest Rate Outlook: Fed's Next Moves</h4>
                  <p className="text-sm text-evercore-navy-600 dark:text-evercore-navy-300 mb-3">Expert analysis of recent FOMC statements and what they indicate about future monetary policy.</p>
                  <Button to="/fomc/interest-rates" variant="text" size="sm">Read Analysis</Button>
                </div>
                
                {/* Policy Item 2 */}
                <div className="border-b border-evercore-gray-200 dark:border-evercore-navy-700 pb-4">
                  <div className="text-xs text-evercore-navy-500 dark:text-evercore-navy-400 uppercase tracking-wider mb-2">Monetary Policy</div>
                  <h4 className="font-medium text-base mb-2">Quantitative Easing: Impact on Markets</h4>
                  <p className="text-sm text-evercore-navy-600 dark:text-evercore-navy-300 mb-3">How central bank asset purchases affect different asset classes and investment strategies.</p>
                  <Button to="/fomc/quantitative-easing" variant="text" size="sm">Read Analysis</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16 container mx-auto px-6">
        <Card className="p-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl font-semibold mb-3">Subscribe to Our Insights</h2>
              <p className="text-evercore-navy-600 dark:text-evercore-navy-300">
                Receive weekly market analysis and investment insights from our expert research team.
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
