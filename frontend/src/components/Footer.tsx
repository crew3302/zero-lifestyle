// src/components/Footer.tsx
import React from 'react';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link

const Footer = () => {
  const footerLinksConfig = {
    Company: [
      { name: 'About Us', href: '/#about', isRouterLink: true },
      { name: 'Our Story', href: '/vision', isRouterLink: true },
      { name: 'Careers', href: '#', isRouterLink: false },
      { name: 'Press', href: '#', isRouterLink: false },
    ],
    Resources: [
      { name: 'Blog', href: '#', isRouterLink: false },
      { name: 'Guides', href: '#', isRouterLink: false },
      { name: 'Community', href: '/#community', isRouterLink: true },
      { name: 'Support', href: '/support', isRouterLink: true },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#', isRouterLink: false },
      { name: 'Terms of Service', href: '#', isRouterLink: false },
      { name: 'Cookie Policy', href: '#', isRouterLink: false },
      { name: 'Disclaimer', href: '#', isRouterLink: false },
    ],
  };

  const socialLinks = [
    { icon: <Instagram size={20} />, href: 'https://www.instagram.com/zer0lifestyle/' },
    { icon: <Twitter size={20} />, href: 'https://x.com/Zer0Lifestyle' },
    { icon: <Facebook size={20} />, href: 'https://www.facebook.com/Zer0Lifestyle' },
    { icon: <Mail size={20} />, href: '#' }
  ];

  const handleFooterLinkClick = (path: string) => {
    if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
       // Check if navigating to a hash on the current page or homepage
      if (window.location.pathname === basePath || (basePath === '/' && window.location.pathname === '/')) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // If navigating to a different page's section, Link handles page, ScrollToHashElement handles scroll
    }
  };

  return (
    <footer id="contact" className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"> {/* Changed md:grid-cols-4 to md:grid-cols-2 lg:grid-cols-4 for better spacing with logo */}
          {/* Logo and Description */}
          <div className="md:col-span-2 lg:col-span-1"> {/* Adjusted col-span */}
            <Link to="/" className="text-3xl font-bold mb-4 inline-block">Zero</Link>
            <p className="text-gray-400 leading-relaxed">
              Empowering individuals to live with purpose, clarity, and intention 
              through minimalist principles and mindful practices.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank" rel="noopener noreferrer" // Good practice for external links
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinksConfig).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((linkItem) => (
                  <li key={linkItem.name}>
                    {linkItem.isRouterLink ? (
                      <Link
                        to={linkItem.href.split('#')[0]} // Navigate to base path
                        onClick={() => handleFooterLinkClick(linkItem.href)}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {linkItem.name}
                      </Link>
                    ) : (
                      <a
                        href={linkItem.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {linkItem.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Zero Lifestyle. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Crafted with purpose and intention.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;