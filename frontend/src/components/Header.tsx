// src/components/Header.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Menu, X, ChevronDown, ShoppingCart, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ProductCardData } from './common/ProductCardData'; // Correct path from /src/components/

// Import the exported product data
import { earbudsData } from '../pages/EarbudsPage';
import { headphonesData } from '../pages/HeadphonesPage';
import { smartwatchesData } from '../pages/SmartwatchesPage';


interface NavSubLink {
  name: string;
  categoryQuery: string;
}
interface NavLinkItem {
  name: string;
  path: string;
  subLinks?: NavSubLink[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownTimeoutRef = useRef<number | null>(null);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  // --- START: Search Functionality State and Logic ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductCardData[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Aggregate all products into a single list, memoized for performance
  const allProducts = useMemo(() => [
    ...earbudsData,
    ...headphonesData,
    ...smartwatchesData
  ], []);

  // Effect to handle search filtering
  useEffect(() => {
    if (searchQuery.trim().length > 1) { // Start searching after 1 character
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        (product.description && product.description.toLowerCase().includes(lowerCaseQuery))
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, allProducts]);

  // Effect to handle focus and body scroll when search is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      searchInputRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }; // Cleanup
  }, [isSearchOpen]);
  
  // Effect to handle 'Escape' key to close search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  const handleSearchLinkClick = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };
  // --- END: Search Functionality State and Logic ---

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLinkItem[] = [
    { name: 'Home', path: '/' },
    {
      name: 'Smartwatches',
      path: '/smartwatches',
      subLinks: [
        { name: 'All Smartwatches', categoryQuery: '' },
        { name: 'Fitness', categoryQuery: 'Fitness' },
        { name: 'Lifestyle', categoryQuery: 'Lifestyle' },
      ],
    },
    {
      name: 'Earbuds',
      path: '/earbuds',
      subLinks: [
        { name: 'All Earbuds', categoryQuery: '' },
        { name: 'Wireless', categoryQuery: 'Wireless' },
        { name: 'ANC', categoryQuery: 'ANC' },
      ],
    },
    {
      name: 'Headphones',
      path: '/headphones',
      subLinks: [
        { name: 'All Headphones', categoryQuery: '' },
        { name: 'Studio', categoryQuery: 'Studio' },
        { name: 'Wireless', categoryQuery: 'Wireless' },
      ],
    },
    { name: 'Vision', path: '/vision' },
    { name: 'Support', path: '/support' },
  ];

  const handleLinkClick = (path: string, mainPath?: string, categoryQuery?: string) => {
    setIsMenuOpen(false);
    setOpenDropdown(null);

    if (categoryQuery !== undefined && mainPath) {
      navigate(`${mainPath}?category=${encodeURIComponent(categoryQuery)}`);
    } else if (path.includes('#')) {
      const [basePath, hash] = path.split('#');
      if ((basePath === location.pathname || (basePath === '/' && location.pathname === '/')) && hash) {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  const handleMouseEnter = (itemName: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(itemName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = window.setTimeout(() => setOpenDropdown(null), 200);
  };

  const headerBgClass = isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : (isMenuOpen ? 'bg-black shadow-md' : 'bg-black');
  const textColorClass = isScrolled ? 'text-gray-900' : 'text-white';
  const hoverTextColorClass = isScrolled ? 'hover:text-gray-600' : 'hover:text-gray-300';
  const activeLinkClass = isScrolled ? 'text-blue-600' : 'text-gray-300';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-16">
          <Link to="/" className={`text-3xl font-bold transition-colors duration-300 ${textColorClass}`} onClick={() => { setIsMenuOpen(false); setOpenDropdown(null); }}>
            Zero
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => (
              <div key={item.name} className="relative" onMouseEnter={item.subLinks ? () => handleMouseEnter(item.name) : undefined} onMouseLeave={item.subLinks ? handleMouseLeave : undefined}>
                <button onClick={() => handleLinkClick(item.path, item.path, item.subLinks ? '' : undefined)} className={`px-3 py-2 text-sm font-medium transition-colors duration-300 flex items-center ${textColorClass} ${hoverTextColorClass} ${location.pathname === item.path.split('#')[0] && !item.path.includes('#') ? activeLinkClass : ''}`}>
                  {item.name}
                  {item.subLinks && <ChevronDown size={16} className={`ml-1 ${textColorClass}`} />}
                </button>
                {item.subLinks && openDropdown === item.name && (
                  <div className="absolute left-0 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 z-50" onMouseEnter={() => handleMouseEnter(item.name)} onMouseLeave={handleMouseLeave}>
                    {item.subLinks.map((subLink) => (
                      <button key={subLink.name} onClick={() => handleLinkClick(item.path, item.path, subLink.categoryQuery)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                        {subLink.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* --- Search Icon - Desktop --- */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className={`p-2 rounded-full transition-colors duration-300 
                         ${textColorClass} ${isScrolled ? 'hover:bg-gray-200' : 'hover:bg-white/20'}`}
            >
              <Search size={22} />
            </button>
            {/* Cart Icon - Desktop */}
            <Link to="/cart" className={`relative ml-2 p-2 rounded-full transition-colors duration-300 ${textColorClass} ${isScrolled ? 'hover:bg-gray-200' : 'hover:bg-white/20'}`}>
              <ShoppingCart size={22} />
              {itemCount > 0 && (
                <span className={`absolute -top-1 -right-1 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${isScrolled ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}>
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu button & Icons */}
          <div className="lg:hidden flex items-center">
             {/* --- Search Icon - Mobile --- */}
             <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              className={`mr-2 p-2 rounded-full transition-colors duration-300 
                         ${textColorClass} ${isScrolled ? 'hover:bg-gray-200' : (isMenuOpen ? 'hover:bg-gray-700' : 'hover:bg-white/20')}`}
            >
                <Search size={24} />
            </button>
            <Link to="/cart" className={`relative mr-2 p-2 rounded-full transition-colors duration-300 ${textColorClass} ${isScrolled ? 'hover:bg-gray-200' : (isMenuOpen ? 'hover:bg-gray-700' : 'hover:bg-white/20')}`}>
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                     <span className={`absolute -top-1 -right-1 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ${isScrolled ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}>
                        {itemCount}
                    </span>
                )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`transition-colors duration-300 ${textColorClass}`}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 shadow-lg bg-black">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((item) => (
                <div key={item.name}>
                  <button onClick={() => handleLinkClick(item.path, item.path, item.subLinks ? '' : undefined)} className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-gray-800 rounded-md transition-colors duration-300">
                    {item.name}
                  </button>
                  {item.subLinks && (
                    <div className="pl-4 pt-1 pb-2">
                      {item.subLinks.map(subLink => (
                        <button key={subLink.name} onClick={() => handleLinkClick(item.path, item.path, subLink.categoryQuery)} className="block w-full text-left px-3 py-1.5 text-sm font-medium text-gray-200 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-300">
                           - {subLink.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Fullscreen Search Overlay --- */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fade-in"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="bg-white max-w-2xl mx-auto mt-[10vh] rounded-xl shadow-2xl flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
            <div className="relative p-4 border-b border-gray-200">
              <Search size={20} className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for smartwatches, earbuds, headphones..."
                className="w-full pl-12 pr-12 py-3 border-none rounded-md focus:ring-2 focus:ring-slate-500 focus:outline-none text-lg"
              />
              <button 
                onClick={() => setIsSearchOpen(false)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-all"
                aria-label="Close search"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto">
              {searchQuery.length > 1 && searchResults.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <p className="font-semibold">No products found for "{searchQuery}"</p>
                    <p className="text-sm mt-1">Try searching for another term.</p>
                  </div>
              )}
              {searchResults.length > 0 && (
                <ul>
                  {searchResults.map(product => (
                    <li key={product.id}>
                      <Link
                        to={`/product/${product.id}`}
                        state={{ productData: product }}
                        onClick={handleSearchLinkClick}
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-contain rounded-md mr-4 bg-gray-200 p-1" />
                        <div className="flex-grow">
                          <p className="font-semibold text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{product.description}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-700 ml-4">Rs{product.salePrice?.toLocaleString() || product.originalPrice.toLocaleString()}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {searchQuery.length <= 1 && (
                <div className="p-8 text-center text-gray-400">
                  <p>Start typing to see matching products.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;