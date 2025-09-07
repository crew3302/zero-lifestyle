import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12">
          <Mail className="w-16 h-16 mx-auto mb-6 text-gray-900" />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Stay Connected
          </h2>
          <p className="text-xl text-gray-600">
            Get weekly insights, tips, and inspiration delivered directly to your inbox. 
            Join our community of mindful living enthusiasts.
          </p>
        </div>

        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-gray-500 transition-colors duration-300"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-green-800 mb-2">
                Welcome to Zero!
              </h3>
              <p className="text-green-700">
                Thank you for subscribing. Check your inbox for a welcome message 
                and your first dose of minimalist inspiration.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;