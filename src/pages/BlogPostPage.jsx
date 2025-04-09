import { useParams, Link } from 'react-router-dom';

// In a real app, this would come from an API or database
const samplePosts = [
  {
    id: 1,
    title: 'Understanding Market Volatility in 2025',
    content: `
      <p>Market volatility has been a defining characteristic of financial markets in 2025, presenting both challenges and opportunities for investors. This article examines the key factors driving these fluctuations and offers strategies to navigate this complex environment.</p>
      
      <h2>Key Drivers of Current Market Volatility</h2>
      
      <p>Several factors have contributed to the heightened volatility we're experiencing:</p>
      
      <ul>
        <li><strong>Monetary Policy Adjustments:</strong> Central banks around the world are navigating a delicate balance between controlling inflation and supporting economic growth.</li>
        <li><strong>Geopolitical Tensions:</strong> Ongoing conflicts and trade disputes continue to create uncertainty in global markets.</li>
        <li><strong>Technological Disruption:</strong> Rapid advancements in AI and automation are reshaping entire industries, creating winners and losers at an unprecedented pace.</li>
        <li><strong>Climate-Related Risks:</strong> Extreme weather events and the transition to renewable energy are affecting market sentiment and sector performance.</li>
      </ul>
      
      <h2>Volatility Metrics at Historic Levels</h2>
      
      <p>The VIX index, often referred to as the "fear gauge," has seen sustained elevation compared to historical averages. Daily price swings in major indices have increased by 35% compared to the previous five-year average.</p>
      
      <div class="chart-placeholder bg-gray-100 p-8 rounded-lg mb-6 text-center text-gray-500">
        [Chart: VIX Index 2020-2025 Comparison]
      </div>
      
      <h2>Strategies for Navigating Volatile Markets</h2>
      
      <h3>1. Maintain a Diversified Portfolio</h3>
      
      <p>Diversification remains one of the most effective strategies for managing risk during volatile periods. This means spreading investments across different asset classes, sectors, and geographies. Consider including:</p>
      
      <ul>
        <li>Value stocks with strong balance sheets</li>
        <li>Quality bonds for income and stability</li>
        <li>Alternative investments with low correlation to traditional markets</li>
        <li>Defensive sectors like utilities and consumer staples</li>
      </ul>
      
      <h3>2. Implement Strategic Hedging</h3>
      
      <p>Hedging strategies can provide downside protection during market turbulence. Options strategies, inverse ETFs, and precious metals can all serve as effective hedges against market volatility.</p>
      
      <h3>3. Maintain a Long-Term Perspective</h3>
      
      <p>While it's easy to get caught up in day-to-day market movements, maintaining a long-term investment horizon helps avoid emotional decision-making. Historical data consistently shows that markets recover from periods of volatility, rewarding patient investors.</p>
      
      <div class="chart-placeholder bg-gray-100 p-8 rounded-lg mb-6 text-center text-gray-500">
        [Chart: Market Recovery Periods Following Major Downturns]
      </div>
      
      <h3>4. Consider Dollar-Cost Averaging</h3>
      
      <p>Dollar-cost averaging—investing fixed amounts at regular intervals—can reduce the impact of volatility on your overall investment strategy. This approach allows you to purchase more shares when prices are lower and fewer when prices are higher.</p>
      
      <h2>Opportunities in Volatility</h2>
      
      <p>While volatility creates risks, it also presents opportunities for strategic investors:</p>
      
      <ul>
        <li><strong>Tactical Asset Allocation:</strong> Rebalancing portfolios to take advantage of oversold sectors</li>
        <li><strong>Quality at a Discount:</strong> Identifying fundamentally strong companies trading at temporarily depressed valuations</li>
        <li><strong>Enhanced Income Strategies:</strong> Volatility can increase premiums for option-writing strategies</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Market volatility is likely to remain elevated throughout 2025 as markets continue to process complex macroeconomic and geopolitical factors. By understanding the drivers of this volatility and implementing sound investment strategies, investors can not only preserve capital but potentially benefit from the opportunities that volatility creates.</p>
      
      <p>Remember that financial markets have historically rewarded those who maintain discipline through turbulent periods. A well-constructed investment plan that accounts for volatility is your best defense against market uncertainty.</p>
    `,
    category: 'stocks',
    categoryName: 'Stock Analysis',
    image: 'https://via.placeholder.com/1200x600',
    date: 'April 2, 2025',
    readTime: '8 min read',
    author: 'Jane Doe',
    authorImage: 'https://via.placeholder.com/100',
    tags: ['Market Volatility', 'Investment Strategy', 'Risk Management']
  },
  {
    id: 2,
    title: 'The Evolution of Blockchain and Financial Markets',
    content: `
      <p>Blockchain technology continues to transform traditional finance in profound ways. This article explores the current state of blockchain adoption in financial markets and what the future might hold.</p>
      
      <h2>The Current State of Blockchain in Finance</h2>
      
      <p>From decentralized finance (DeFi) to central bank digital currencies (CBDCs), blockchain applications are reshaping how financial services are delivered and consumed.</p>
      
      <h3>Key Developments:</h3>
      
      <ul>
        <li>Major banks now use blockchain for cross-border payments, reducing settlement times from days to minutes</li>
        <li>Securities exchanges have implemented blockchain for post-trade settlement</li>
        <li>Decentralized finance protocols have grown to manage over $150 billion in assets</li>
        <li>Several countries have launched or are piloting central bank digital currencies</li>
      </ul>
      
      <div class="chart-placeholder bg-gray-100 p-8 rounded-lg mb-6 text-center text-gray-500">
        [Chart: Growth of Blockchain Applications in Financial Services 2020-2025]
      </div>
      
      <h2>How Blockchain is Changing Financial Infrastructure</h2>
      
      <h3>1. Payments and Settlements</h3>
      
      <p>Blockchain enables near-instantaneous settlement of transactions, eliminating the need for intermediaries and reducing costs. Cross-border payments, which traditionally took days and incurred high fees, can now be completed in minutes at a fraction of the cost.</p>
      
      <h3>2. Securities Trading</h3>
      
      <p>Blockchain technology is enabling the tokenization of traditional assets, allowing for fractional ownership and 24/7 trading of stocks, bonds, and real estate. This has democratized access to investments previously available only to institutional investors or the wealthy.</p>
      
      <h3>3. Identity and KYC/AML</h3>
      
      <p>Blockchain-based identity solutions are streamlining know-your-customer (KYC) and anti-money laundering (AML) processes, reducing compliance costs while improving security and privacy.</p>
      
      <h2>The Rise of Central Bank Digital Currencies (CBDCs)</h2>
      
      <p>Central banks around the world are exploring or implementing digital versions of their national currencies. These CBDCs aim to combine the efficiency of digital payments with the stability and regulatory oversight of traditional fiat currencies.</p>
      
      <p>Key developments include:</p>
      
      <ul>
        <li>China's digital yuan has seen widespread adoption with over 250 million users</li>
        <li>The European Central Bank is in advanced testing of a digital euro</li>
        <li>The Federal Reserve has published research on a potential digital dollar</li>
      </ul>
      
      <div class="chart-placeholder bg-gray-100 p-8 rounded-lg mb-6 text-center text-gray-500">
        [Chart: Global CBDC Development Status by Country]
      </div>
      
      <h2>Decentralized Finance (DeFi): The New Frontier</h2>
      
      <p>DeFi applications are creating parallel financial services without traditional intermediaries. From lending and borrowing to insurance and derivatives, DeFi protocols are offering alternatives to conventional financial products.</p>
      
      <p>Key innovations include:</p>
      
      <ul>
        <li><strong>Automated Market Makers:</strong> Enabling decentralized trading without order books</li>
        <li><strong>Yield Farming:</strong> Providing new ways to earn returns on digital assets</li>
        <li><strong>Flash Loans:</strong> Uncollateralized loans that must be borrowed and repaid within a single transaction</li>
        <li><strong>Synthetic Assets:</strong> Tokenized derivatives that track the value of traditional financial assets</li>
      </ul>
      
      <h2>Investment Implications</h2>
      
      <p>The continued evolution of blockchain in financial markets creates both opportunities and risks for investors:</p>
      
      <h3>Opportunities</h3>
      
      <ul>
        <li>Investments in financial institutions adopting blockchain technology</li>
        <li>Exposure to blockchain infrastructure providers</li>
        <li>Selected investments in digital assets with strong fundamentals and use cases</li>
        <li>Traditional companies implementing blockchain to improve efficiency</li>
      </ul>
      
      <h3>Risks</h3>
      
      <ul>
        <li>Regulatory uncertainty around certain blockchain applications</li>
        <li>Technological risks including smart contract vulnerabilities</li>
        <li>Disruption to traditional financial business models</li>
        <li>Volatility and liquidity concerns in nascent markets</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>Blockchain technology is no longer just a speculative technology but is becoming deeply integrated into the financial system. The transformation will continue in the coming years, with implications for investors, financial institutions, and consumers alike.</p>
      
      <p>While challenges remain, particularly around regulation and technological maturity, the trajectory is clear: blockchain is fundamentally altering how financial markets operate, creating a more efficient, accessible, and potentially more stable financial system for the future.</p>
    `,
    category: 'crypto',
    categoryName: 'Cryptocurrency',
    image: 'https://via.placeholder.com/1200x600',
    date: 'March 28, 2025',
    readTime: '6 min read',
    author: 'John Smith',
    authorImage: 'https://via.placeholder.com/100',
    tags: ['Blockchain', 'DeFi', 'Cryptocurrency', 'Financial Technology']
  },
  {
    id: 3,
    title: 'Building a Resilient Portfolio for Long-term Growth',
    content: `
      <p>In today's complex and rapidly changing financial landscape, building a resilient investment portfolio is more important than ever. This article explores strategies for creating a diversified portfolio that can withstand market turbulence while positioning for long-term growth.</p>
      
      <h2>The Foundation: Asset Allocation</h2>
      
      <p>A resilient portfolio begins with thoughtful asset allocation across different asset classes. The traditional approach involves spreading investments across:</p>
      
      <ul>
        <li><strong>Equities:</strong> For growth and inflation protection</li>
        <li><strong>Fixed Income:</strong> For income and stability</li>
        <li><strong>Cash and Equivalents:</strong> For liquidity and safety</li>
        <li><strong>Alternative Investments:</strong> For diversification and potential enhanced returns</li>
      </ul>
      
      <p>While these fundamental categories remain important, modern portfolio construction requires a more nuanced approach that considers factors like:</p>
      
      <ul>
        <li>Geographic diversification beyond traditional developed markets</li>
        <li>Factor-based allocation (value, growth, quality, momentum)</li>
        <li>Thematic investments aligned with long-term structural trends</li>
        <li>Environmental, social, and governance (ESG) considerations</li>
      </ul>
      
      <div class="chart-placeholder bg-gray-100 p-8 rounded-lg mb-6 text-center text-gray-500">
        [Chart: Sample Resilient Portfolio Allocation]
      </div>
      
      <h2>Beyond Traditional Diversification</h2>
      
      <h3>1. Geographic Diversification</h3>
      
      <p>While U.S. markets have dominated returns for much of the past decade, a truly resilient portfolio maintains exposure to international markets, both developed and emerging. Different economic cycles, monetary policies, and demographic trends across regions can provide valuable diversification benefits.</p>
      
      <h3>2. Sector and Industry Allocation</h3>
      
      <p>Different sectors perform differently depending on the economic cycle and structural trends. A resilient portfolio balances exposure across:</p>
      
      <ul>
        <li><strong>Defensive Sectors:</strong> Utilities, consumer staples, healthcare</li>
        <li><strong>Cyclical Sectors:</strong> Industrials, materials, consumer discretionary</li>
        <li><strong>Growth Sectors:</strong> Technology, communication services</li>
        <li><strong>Value Sectors:</strong> Financials, energy</li>
      </ul>
      
      <h3>3. Factor Diversification</h3>
      
      <p>Research has identified several persistent factors that drive returns over time:</p>
      
      <ul>
        <li><strong>Value:</strong> Companies trading at discounts to intrinsic worth</li>
        <li><strong>Quality:</strong> Companies with strong balance sheets and consistent earnings</li>
        <li><strong>Momentum:</strong> Companies with positive price trends</li>
        <li><strong>Size:</strong> Smaller companies that may offer higher growth potential</li>
        <li><strong>Low Volatility:</strong> Companies with more stable price movements</li>
      </ul>
      
      <p>A resilient portfolio typically includes exposure to multiple factors, as they tend to perform differently across market cycles.</p>
      
      <h2>Incorporating Thematic Investments</h2>
      
      <p>Long-term structural trends create investment opportunities that transcend traditional asset allocation. Key themes to consider include:</p>
      
      <ul>
        <li><strong>Demographics:</strong> Aging populations in developed markets, growing middle class in emerging markets</li>
        <li><strong>Technology:</strong> Artificial intelligence, cloud computing, cybersecurity</li>
        <li><strong>Healthcare Innovation:</strong> Genomics, precision medicine, digital health</li>
        <li><strong>Climate Change:</strong> Renewable energy, energy efficiency, sustainable agriculture</li>
        <li><strong>Resource Scarcity:</strong> Water, food security, critical minerals</li>
      </ul>
      
      <p>Allocating a portion of your portfolio to these themes can enhance long-term growth potential while providing exposure to trends that may be underrepresented in traditional indices.</p>
      
      <h2>Risk Management Strategies</h2>
      
      <p>A resilient portfolio incorporates specific risk management strategies:</p>
      
      <h3>1. Rebalancing</h3>
      
      <p>Regular rebalancing back to target allocations helps maintain the desired risk profile and can enhance returns by systematically buying assets that have become relatively cheaper and selling those that have become relatively more expensive.</p>
      
      <h3>2. Hedging Strategies</h3>
      
      <p>Depending on your risk tolerance and portfolio size, hedging strategies may include:</p>
      
      <ul>
        <li>Options strategies (protective puts, covered calls)</li>
        <li>Tail risk hedges</li>
        <li>Low-correlation assets like gold or certain absolute return strategies</li>
      </ul>
      
      <h3>3. Liquidity Management</h3>
      
      <p>Ensuring sufficient liquidity to meet cash needs without forcing untimely asset sales is essential for portfolio resilience. This typically involves maintaining an appropriate cash reserve and ladder of near-term maturities in fixed income holdings.</p>
      
      <h2>Example: A Modern Resilient Portfolio</h2>
      
      <div class="chart-placeholder bg-gray-100 p-8 rounded-lg mb-6 text-center text-gray-500">
        [Chart: Detailed Portfolio Allocation Breakdown]
      </div>
      
      <h2>Conclusion</h2>
      
      <p>Building a resilient portfolio is not about predicting which assets will perform best in the short term—it's about creating a diversified structure that can weather various market environments while capturing long-term growth opportunities.</p>
      
      <p>The most successful investors focus on what they can control: diversification, costs, tax efficiency, and disciplined rebalancing. By applying these principles and adapting them to your personal financial goals and risk tolerance, you can build a portfolio designed to withstand market turbulence while positioning for long-term growth.</p>
      
      <p>Remember that resilience is not just about defensive positioning—it's about creating a portfolio that can adapt to changing circumstances and capitalize on opportunities across different market environments.</p>
    `,
    category: 'strategies',
    categoryName: 'Investment Strategy',
    image: 'https://via.placeholder.com/1200x600',
    date: 'March 22, 2025',
    readTime: '10 min read',
    author: 'Michael Brown',
    authorImage: 'https://via.placeholder.com/100',
    tags: ['Portfolio Management', 'Asset Allocation', 'Diversification', 'Risk Management']
  }
];

const BlogPostPage = () => {
  const { id } = useParams();
  
  // Find the post with the matching ID
  const post = samplePosts.find(post => post.id === parseInt(id));
  
  // If post not found, show error message
  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="mb-4">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
          Return to Blog
        </Link>
      </div>
    );
  }
  
  return (
    <article className="max-w-4xl mx-auto">
      {/* Article Header */}
      <header className="mb-8">
        <span className="text-blue-600 font-semibold">{post.categoryName}</span>
        <h1 className="text-4xl font-bold my-2">{post.title}</h1>
        
        <div className="flex items-center mt-6">
          <img 
            src={post.authorImage} 
            alt={post.author} 
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-medium">{post.author}</p>
            <div className="flex text-gray-500 text-sm">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Featured Image */}
      <img 
        src={post.image} 
        alt={post.title} 
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      
      {/* Article Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Tags */}
      <div className="mt-8 pt-6 border-t">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Related Posts */}
      <section className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {samplePosts
            .filter(relatedPost => relatedPost.id !== post.id && relatedPost.category === post.category)
            .slice(0, 2)
            .map(relatedPost => (
              <div key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-blue-600 text-sm font-semibold">{relatedPost.categoryName}</span>
                  <h3 className="text-xl font-bold mb-2 mt-1">{relatedPost.title}</h3>
                  <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
                  <Link to={`/blog/${relatedPost.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </article>
  );
};

export default BlogPostPage;
