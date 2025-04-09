import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    // For now, we'll just simulate a successful submission
    console.log('Form data submitted:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: false
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions, feedback, or suggestions? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </p>

        {formStatus.submitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-8">
            <h3 className="font-bold">Thank you for your message!</h3>
            <p>We've received your inquiry and will respond shortly.</p>
          </div>
        ) : null}

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Other Ways to Connect</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-700">
              <a href="mailto:info@financialinsights.com" className="hover:text-blue-600">
                info@financialinsights.com
              </a>
            </p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">Social Media</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-blue-600">Twitter</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">LinkedIn</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Facebook</a>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-xl font-bold mb-2">Subscribe</h3>
            <p className="text-gray-700 mb-2">
              Get our newsletter for the latest insights.
            </p>
            <a href="#" className="text-purple-600 font-medium hover:text-purple-800">
              Sign up now →
            </a>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">FAQ</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-2">Do you offer personalized financial advice?</h3>
            <p className="text-gray-700">
              While our blog provides general financial insights and analysis, we don't offer personalized investment advice. Our content is for informational and educational purposes only.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">Can I contribute to the blog?</h3>
            <p className="text-gray-700">
              We welcome guest contributions from financial experts. Please contact us with your proposed topic and credentials.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">How often do you publish new content?</h3>
            <p className="text-gray-700">
              We publish new articles several times a week, focusing on timely market events and evergreen investment topics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
