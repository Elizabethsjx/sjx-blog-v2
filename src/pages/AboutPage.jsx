import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">About Financial Insights</h1>
        <div className="bg-blue-50 p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src="https://via.placeholder.com/400x400" 
              alt="Financial Insights Founder" 
              className="w-64 h-64 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold mb-3">Welcome to My Financial Blog</h2>
              <p className="text-gray-700 mb-4">
                I'm passionate about sharing insights and analysis on financial markets, investment strategies, and economic trends. Through this blog, I aim to provide valuable information that helps readers make informed decisions about their investments and understand the complex world of finance.
              </p>
              <p className="text-gray-700">
                Whether you're an experienced investor or just getting started, my goal is to offer clear, actionable insights that can help you navigate the financial landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          Financial Insights was created with a simple mission: to demystify financial markets and make high-quality investment analysis accessible to everyone. We believe that understanding markets shouldn't be limited to financial professionals, and that with the right information, anyone can make smarter financial decisions.
        </p>
        <p className="text-gray-700 mb-4">
          Our content focuses on:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
          <li>Breaking down complex market events into clear, understandable insights</li>
          <li>Providing objective analysis of investment opportunities across various asset classes</li>
          <li>Explaining economic trends and their potential impact on markets</li>
          <li>Sharing practical investment strategies for different risk tolerances and goals</li>
          <li>Highlighting emerging trends and technologies reshaping the financial landscape</li>
        </ul>
      </section>

      {/* About the Author Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">About the Author</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              With over 10 years of experience in financial markets, I've developed a deep understanding of market dynamics, investment strategies, and economic principles. My background includes:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>Professional experience in equity research and portfolio management</li>
              <li>Advanced degree in Financial Economics</li>
              <li>Certified Financial Analyst designation</li>
              <li>Regular contributor to financial publications and media outlets</li>
            </ul>
            <p className="text-gray-700">
              I started this blog to share my knowledge and insights with a broader audience, helping individuals make more informed financial decisions in an increasingly complex market environment.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Our Investment Philosophy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-blue-800">Research-Driven</h3>
            <p className="text-gray-700">
              All our analysis is based on thorough research, data analysis, and fundamental principles rather than speculation or hype.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-green-800">Long-Term Focus</h3>
            <p className="text-gray-700">
              We emphasize sustainable, long-term investment approaches over short-term trading or get-rich-quick schemes.
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3 text-purple-800">Objective Analysis</h3>
            <p className="text-gray-700">
              We provide balanced, objective analysis without conflicts of interest or hidden agendas.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Ready to enhance your financial knowledge? Subscribe to our newsletter and get the latest insights delivered directly to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 rounded-lg border flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
        <div className="mt-6">
          <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
            Have questions? Contact us →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
