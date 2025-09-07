// src/pages/SupportPage.tsx
import React, { useState } from 'react';
import PageShell from '../components/common/PageShell';
import { ChevronDown, ChevronUp, Mail, Phone, HelpCircle } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-lg font-semibold text-gray-800 hover:text-black"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 leading-relaxed">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

const faqs = [
  { question: "How do I track my order?", answer: "Once your order is shipped, you will receive an email with a tracking number and a link to the carrier's website. You can use this to monitor your shipment's progress." },
  { question: "What is your return policy?", answer: "We offer a 30-day return policy for unused items in their original packaging. Please visit our returns portal or contact support to initiate a return." },
  { question: "How do I pair my Zero device?", answer: "Please refer to the user manual specific to your device. Generally, you'll need to enable Bluetooth on your phone, put your Zero device in pairing mode, and select it from the list of available devices on your phone." },
  { question: "Where can I find user manuals?", answer: "User manuals for all our products are available on their respective product pages on our website and in the 'Downloads' section of our support hub." },
  { question: "How do I contact customer support?", answer: "You can reach us via email at support@zero.com, call us at 1-800-ZERO-LIF, or use the contact form below. We aim to respond within 24 hours." },
];


const SupportPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a backend
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
         setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
    };

  return (
    <PageShell title="Support Center" className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* FAQ Section */}
        <div className="md:col-span-2">
          <div className="flex items-center mb-6">
            <HelpCircle className="w-8 h-8 text-gray-800 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Contact Info & Form Section */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-700">
                <Mail size={20} className="mr-3 text-gray-600" />
                <a href="mailto:support@zero.com" className="hover:text-black">support@zero.com</a>
              </div>
              <div className="flex items-center text-gray-700">
                <Phone size={20} className="mr-3 text-gray-600" />
                <span>1-800-ZERO-LIF</span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h3>
            {isSubmitted ? (
                 <div className="text-center p-4 bg-green-100 text-green-700 rounded-lg">
                    <p>Thank you! Your message has been sent.</p>
                </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black"></textarea>
              </div>
              <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Send Message
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default SupportPage;