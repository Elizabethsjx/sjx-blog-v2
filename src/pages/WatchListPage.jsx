import { useState } from 'react';
import { Link } from 'react-router-dom';

const WatchListPage = () => {
  // State for filter settings
  const [filterOption, setFilterOption] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Sample watch list data
  const watchListStocks = [
    {
      id: 1,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 187.62,
      change: 1.24,
      changePercent: 0.67,
      volume: '38.2M',
      marketCap: '2.94T',
      chartColor: 'green'
    },
    {
      id: 2,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 329.37,
      change: -2.76,
      changePercent: -0.83,
      volume: '22.5M',
      marketCap: '2.45T',
      chartColor: 'red'
    },
    {
      id: 3,
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.93,
      change: 1.86,
      changePercent: 1.32,
      volume: '19.7M',
      marketCap: '1.82T',
      chartColor: 'green'
    },
    {
      id: 4,
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 148.25,
      change: -0.35,
      changePercent: -0.24,
      volume: '31.6M',
      marketCap: '1.54T',
      chartColor: 'red'
    },
    {
      id: 5,
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      price: 217.83,
      change: 6.52,
      changePercent: 3.08,
      volume: '42.1M',
      marketCap: '692.59B',
      chartColor: 'green'
    },
    {
      id: 6,
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 456.31,
      change: 12.86,
      changePercent: 2.90,
      volume: '35.3M',
      marketCap: '1.12T',
      chartColor: 'green'
    },
    {
      id: 7,
      symbol: 'META',
      name: 'Meta Platforms, Inc.',
      price: 374.93,
      change: -1.47,
      changePercent: -0.39,
      volume: '15.8M',
      marketCap: '964.23B',
      chartColor: 'red'
    },
    {
      id: 8,
      symbol: 'BRK.B',
      name: 'Berkshire Hathaway Inc.',
      price: 382.95,
      change: 0.73,
      changePercent: 0.19,
      volume: '3.5M',
      marketCap: '842.78B',
      chartColor: 'green'
    }
  ];

  // Mini chart component (simplified for demo)
  const MiniChart = ({ color }) => {
    const chartHeight = 30;
    const chartWidth = 80;
    
    // Generate random data points for the mini chart
    const generatePoints = () => {
      const points = [];
      const numPoints = 10;
      let y = chartHeight / 2;
      
      for (let i = 0; i < numPoints; i++) {
        // Add some random variation for the chart
        const randomChange = Math.random() * 5 - 2.5;
        y = Math.max(5, Math.min(chartHeight - 5, y + randomChange));
        points.push(`${(i / (numPoints - 1)) * chartWidth},${y}`);
      }
      
      return points.join(' ');
    };

    return (
      <svg width={chartWidth} height={chartHeight} className="stock-mini-chart">
        <polyline
          points={generatePoints()}
          stroke={color === 'green' ? '#10b981' : '#ef4444'}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    );
  };

  // Filter the stocks based on the current filter option
  const filteredStocks = watchListStocks.filter(stock => {
    if (filterOption === 'gainers') {
      return stock.changePercent > 0;
    } else if (filterOption === 'losers') {
      return stock.changePercent < 0;
    }
    return true; // 'all' option
  });

  // Sort the filtered stocks based on the current sort option
  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      return b.price - a.price;
    } else if (sortBy === 'change') {
      return b.changePercent - a.changePercent;
    } else if (sortBy === 'volume') {
      return parseFloat(b.volume) - parseFloat(a.volume);
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Watch List</h1>
        <p className="text-xl mb-6">Track trending stocks and market movers in real-time.</p>
        <p className="text-lg opacity-80">Stay informed on price changes, trends, and market shifts.</p>
      </section>

      {/* Controls Section */}
      <section className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
              <select
                id="filter"
                className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
              >
                <option value="all">All Stocks</option>
                <option value="gainers">Gainers</option>
                <option value="losers">Losers</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                id="sort"
                className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="change">% Change</option>
                <option value="volume">Volume</option>
              </select>
            </div>
          </div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              Add New Stock
            </button>
          </div>
        </div>
      </section>

      {/* Watch List Table */}
      <section className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedStocks.map((stock) => (
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
                    <MiniChart color={stock.chartColor} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.volume}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stock.marketCap}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-red-600 hover:text-red-900">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Market Insights Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Today's Market Movers</h3>
              <p className="text-gray-600 mb-4">Tech stocks led gains today, with AI-related companies showing significant upward momentum.</p>
              <Link to="/blog/market-analysis" className="text-blue-600 hover:text-blue-800 font-medium">Read Market Analysis →</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">Upcoming Earnings Reports</h3>
              <p className="text-gray-600 mb-4">Major financial institutions are set to report Q3 earnings in the coming weeks. Prepare your watch list accordingly.</p>
              <Link to="/blog/earnings-calendar" className="text-blue-600 hover:text-blue-800 font-medium">View Earnings Calendar →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-50 p-8 rounded-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Stay Ahead of the Market</h2>
          <p className="text-gray-600 mb-6">Get daily watch list updates and market analysis delivered to your inbox.</p>
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

export default WatchListPage;
