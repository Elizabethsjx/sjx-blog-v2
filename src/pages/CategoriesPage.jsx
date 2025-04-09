import { Link } from 'react-router-dom';

// Category definitions
const categories = [
  { 
    id: 'stocks', 
    name: 'Stocks', 
    description: 'Analysis of equity markets, individual stocks, and stock market trends.',
    color: 'bg-blue-100',
    textColor: 'text-blue-800',
    icon: '📈', 
    count: 8
  },
  { 
    id: 'crypto', 
    name: 'Cryptocurrency', 
    description: 'Insights on blockchain technology, cryptocurrencies, and digital assets.',
    color: 'bg-purple-100',
    textColor: 'text-purple-800',
    icon: '🔗', 
    count: 5
  },
  { 
    id: 'strategies', 
    name: 'Investment Strategies', 
    description: 'Portfolio management approaches, investment techniques, and risk management.',
    color: 'bg-green-100',
    textColor: 'text-green-800',
    icon: '🎯', 
    count: 7
  },
  { 
    id: 'economy', 
    name: 'Economy', 
    description: 'Macroeconomic analysis, central bank policies, and economic indicators.',
    color: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: '🌐', 
    count: 4
  },
  { 
    id: 'personal-finance', 
    name: 'Personal Finance', 
    description: 'Budgeting, retirement planning, and personal financial management.',
    color: 'bg-red-100',
    textColor: 'text-red-800',
    icon: '💰', 
    count: 6
  },
  { 
    id: 'technology', 
    name: 'Financial Technology', 
    description: 'Innovations in fintech, digital banking, and payment systems.',
    color: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    icon: '🖥️', 
    count: 3
  },
  { 
    id: 'real-estate', 
    name: 'Real Estate', 
    description: 'Property market analysis, REITs, and real estate investment opportunities.',
    color: 'bg-orange-100',
    textColor: 'text-orange-800',
    icon: '🏢', 
    count: 4
  },
  { 
    id: 'commodities', 
    name: 'Commodities', 
    description: 'Insights on gold, oil, agriculture, and other commodity markets.',
    color: 'bg-amber-100',
    textColor: 'text-amber-800',
    icon: '🪙', 
    count: 2
  }
];

const CategoriesPage = () => {
  return (
    <div>
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Categories</h1>
        <p className="text-gray-600">
          Browse our articles by topic to find insights on specific areas of finance and investing.
        </p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id}
            to={`/categories/${category.id}`} 
            className={`${category.color} hover:opacity-90 transition rounded-lg overflow-hidden shadow-md`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-bold ${category.textColor} flex items-center gap-2`}>
                  <span className="text-3xl">{category.icon}</span>
                  {category.name}
                </h2>
                <span className="text-gray-600 bg-white bg-opacity-50 rounded-full px-3 py-1">
                  {category.count} articles
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                {category.description}
              </p>
              <div className={`inline-flex items-center ${category.textColor} font-medium`}>
                Browse articles <span className="ml-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-blue-50 rounded-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">Looking for Something Specific?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our categorized articles help you find exactly what you're looking for, from market analysis to investment strategies.
          </p>
          <div className="max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search across all categories..."
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
