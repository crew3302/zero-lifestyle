// src/pages/HomePage.tsx
import React, { useState, useRef, useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Newsletter from '../components/Newsletter';
import { Link } from 'react-router-dom';
import {
  Headphones, Bluetooth, Watch, ArrowRight, Zap, Flame, Rocket, Target, Heart, Globe,
  Volume2, VolumeX // <-- Added volume icons
} from 'lucide-react';

// Path to your ProductCard that uses CartContext internally
import ProductCard, { ProductCardData as DisplayProductData } from '../components/ProductCard';
// ProductType is the core type used by CartContext for cart items
import { ProductType } from '../types/ProductType';


// This adapter now creates an object that is compatible with DisplayProductData.
// DisplayProductData extends ProductType, so core numeric prices are essential.
const adaptToDisplayProductData = (item: any, defaultCategory: string): DisplayProductData => {
  const originalPriceNumber = typeof item.originalPrice === 'number' ? item.originalPrice : 0;
  const salePriceNumber = typeof item.salePrice === 'number' ? item.salePrice : undefined;

  const discountPercent = (salePriceNumber !== undefined && originalPriceNumber > 0 && salePriceNumber < originalPriceNumber)
    ? Math.round(((originalPriceNumber - salePriceNumber) / originalPriceNumber) * 100)
    : 0;

  return {
    // Core ProductType fields (required by ProductCardData as it extends ProductType)
    id: String(item.id), // Ensure id is a string
    name: item.name,
    description: item.description,
    imageUrl: item.image, // ProductCard expects imageUrl
    originalPrice: originalPriceNumber, // Numeric original price
    salePrice: salePriceNumber,     // Numeric sale price (optional)
    category: defaultCategory,

    // Additional fields for ProductCard display (defined in ProductCardData interface in ProductCard.tsx)
    rating: typeof item.rating === 'number' ? item.rating : 0,
    discountPercentText: discountPercent > 0 ? `${discountPercent}% OFF` : undefined, // Optional text
    badge: item.badge,
    colors: Array.isArray(item.colors) ? item.colors : undefined,
  };
};


const hotSellingProductsRaw = [
  { id: 'hs1', name: "Zero Revolt Pro",category: "earbuds", description: "Gaming TWS with ultra-low latency...", image: "https://images.priceoye.pk/zero-arcade-beast-earbuds-pakistan-priceoye-8oxvo-500x500.webp", rating: 4.8, originalPrice: 7999, salePrice: 4899, discount: 39, badge: 'HOT SELLING', colors: ['black', 'white', '#FF8C00'] },
  { id: 'hs2', name: "Zero Luna Smartwatch",category: "Smartwatches", description: "Elegant AMOLED display...", image: "https://zerolifestyle.co/cdn/shop/files/02_14d4c7f7-c21c-49be-8519-5f340b58ebd5.webp?v=1734007033&width=400", rating: 4.9, originalPrice: 15999, salePrice: 9899, discount: 38, badge: 'BEST SELLER', colors: ['#FFC0CB', '#000000', '#C0C0C0'] },
  { id: 'hs3', name: "Zero Air X2 Earbuds",category: "Earbuds", description: "Crisp 13mm drivers...", image: "https://zerolifestyle.co/cdn/shop/files/JX05-11_01bbe9c4-14bf-4feb-88f3-2071fb20faf6.png?v=1741431715&width=400", rating: 4.7, originalPrice: 5999, salePrice: 3899, discount: 35, badge: 'CLEAR CALLS', colors: ['white', 'black', 'blue'] },
  { id: 'hs4', name: "Zero Sonic Bass",category: "Headphones", description: "Comfortable neckband...", image: "https://zerolifestyle.co/cdn/shop/files/black_1_bdf97883-4dd7-4609-8119-aae71f0f5e9c.webp?v=1747123777&width=700", rating: 4.6, originalPrice: 3999, salePrice: 2499, discount: 38, badge: 'HEAVY BASS', colors: ['black', 'red', 'green'] },
];
const justLaunchedProductsRaw = [
  { id: 'jl1', name: "Zero Aura X Headphones", description: "Premium Active Noise Cancellation...", image: "https://zerolifestyle.co/cdn/shop/files/beige_1.webp?v=1747124264&width=700", rating: 4.9, originalPrice: 12999, salePrice: 8999, discount: 31, badge: 'JUST LAUNCHED', colors: ['#2F4F4F', '#A0522D', '#D2B48C'] },
  { id: 'jl2', name: "Zero Pulse Smart Watch", description: "Minimalist smart ring...", image: "https://zerolifestyle.co/cdn/shop/files/17_64ea3336-5ae3-4a70-a24c-fbcf615fc99b.webp?v=1721470123&width=400", rating: 4.7, originalPrice: 8999, salePrice: 7499, discount: 17, badge: 'NEW ARRIVAL', colors: ['#C0C0C0', '#FFD700', '#000000'] },
  { id: 'jl3', name: "Zero Flow Mini Earbuds", description: "Ultra-compact true wireless...", image: "https://zerolifestyle.co/cdn/shop/files/loki_green.webp?v=1742983943&width=600", rating: 4.6, originalPrice: 4999, salePrice: 3999, discount: 20, badge: 'POCKET FRIENDLY', colors: ['#ADD8E6', '#90EE90', '#FFB6C1'] },
  { id: 'jl4', name: "Zero Next-Gen Watch", description: "Next-generation smart watch...", image: "https://zerolifestyle.co/cdn/shop/files/blackgold_3_b4feec76-b7e0-42d2-b65d-61e4358cefa8.png?v=1733741145&width=600", rating: 4.8, originalPrice: 29999, salePrice: 24999, discount: 17, badge: 'INNOVATION', colors: ['#36454F', 'white'] },
];
const latestProductsAdapterDataRaw = [
  { id: 'latest1', name: "Zero Buds Studio Pro", description: "Reference‑grade TWS earbuds...", image: "https://zerolifestyle.co/cdn/shop/files/029-black.525.webp?v=1733301155&width=600", rating: 4.9, originalPrice: 27900, salePrice: 24900, discount: 11, badge: 'PRO AUDIO', colors: ['#333333', '#E0E0E0'] },
  { id: 'latest2', name: "Zero Studio Max Comfort", description: "Over-ear headphones...", image: "https://zerolifestyle.co/cdn/shop/files/Black_7.webp?v=1747124264&width=600", rating: 4.8, originalPrice: 38000, salePrice: 34900, discount: 8, badge: 'ULTRA COMFORT', colors: ['black', 'cream'] },
  { id: 'latest3', name: "Zero Series X Titan", description: "The ultimate smartwatch...", image: "https://zerolifestyle.co/cdn/shop/files/Silver-vogue.webp?v=1742632877&width=400", rating: 4.9, originalPrice: 32000, salePrice: 29900, discount: 7, badge: 'PREMIUM EDITION', colors: ['#848482', '#4A4A4A'] },
  { id: 'latest4', name: "Zero Elite", description: "High-capacity headphones...", image: "https://zerolifestyle.co/cdn/shop/files/Blue_1_8b4b257d-f8f8-4473-9d5b-b588be9de8ae.webp?v=1747124264&width=600", rating: 4.7, originalPrice: 5999, salePrice: 4499, discount: 25, badge: 'ESSENTIAL POWER', colors: ['black', 'white'] }
];


const hotSellingProducts: DisplayProductData[] = hotSellingProductsRaw.map(p => adaptToDisplayProductData(p, "Hot"));
const justLaunchedProducts: DisplayProductData[] = justLaunchedProductsRaw.map(p => adaptToDisplayProductData(p, "New"));
const latestProductsAdapterData: DisplayProductData[] = latestProductsAdapterDataRaw.map(p => adaptToDisplayProductData(p, "Latest"));


// --- Reusable Product Section Component ---
interface ProductSectionProps {
  title: string;
  products: DisplayProductData[];
  icon?: React.ElementType;
  titleColor?: string;
  sectionBg?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title, products, icon: Icon, titleColor = "text-gray-700", sectionBg = "bg-gray-50"
}) => {
  return (
    <section className={`py-16 ${sectionBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center mb-12">
          {Icon && <Icon className={`w-8 h-8 ${titleColor} mr-3`} />}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <Link to={`/${product.category?.toLowerCase()}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Other Homepage Sections (ProductCategoriesPreview, Vision2025) ---
const productCategoriesData = [
  { name: "Earbuds", description: "Crystal clear sound, seamless connectivity", icon: Bluetooth, link: "/earbuds", productCount: "13 Models", bgColor: "bg-gradient-to-br from-blue-500 to-blue-600", image: "https://zerolifestyle.co/cdn/shop/files/wave2.jpg?v=1711356614&width=400" },
  { name: "Headphones", description: "Studio-quality audio experience", icon: Headphones, link: "/headphones", productCount: "14 Models", bgColor: "bg-gradient-to-br from-purple-500 to-purple-600", image: "https://zerolifestyle.co/cdn/shop/files/black_1_bdf97883-4dd7-4609-8119-aae71f0f5e9c.webp?v=1747123777&width=600" },
  { name: "Smartwatches", description: "Your perfect lifestyle companion", icon: Watch, link: "/smartwatches", productCount: "14 Models", bgColor: "bg-gradient-to-br from-green-500 to-green-600", image: "https://zerolifestyle.co/cdn/shop/files/1_ceb0f8ec-2695-4c16-b0cd-0862a61e3c6b.jpg?v=1732606599&width=400" }
];

const ProductCategoriesPreview = () => {
    return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">From premium earbuds to smart wearables, discover the perfect tech companion for your lifestyle</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategoriesData.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link key={index} to={category.link} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-80">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <div className={`${category.bgColor} p-3 rounded-xl shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-white mb-2"><span className="text-sm font-medium opacity-90">{category.productCount}</span></div>
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-gray-200 mb-4 h-12 overflow-hidden text-ellipsis">{category.description}</p>
                    <div className="flex items-center text-white font-medium group-hover:text-yellow-400 transition-colors">
                      <span>Shop Now</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Vision2025 = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"><div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-600/20 to-transparent"></div></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="mb-8"><div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-2xl animate-pulse"><span className="text-3xl font-bold text-white transform -rotate-12">Z</span></div></div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">Vision <span className="text-yellow-400">2025</span></h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">Technology is reshaping the world at an unprecedented pace. But in Pakistan, the gap between innovation and accessibility still exists. At ZERO, we see this not as a challenge, but as an opportunity—to push boundaries, rethink possibilities, and bring world-class technology within reach.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center"><div className="w-16 h-16 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center mb-4"><Target className="w-8 h-8 text-yellow-400" /></div><h3 className="text-xl font-bold text-white mb-2">Innovation First</h3><p className="text-gray-400">Leading Pakistan's tech revolution with cutting-edge products</p></div>
              <div className="text-center"><div className="w-16 h-16 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center mb-4"><Heart className="w-8 h-8 text-yellow-400" /></div><h3 className="text-xl font-bold text-white mb-2">Quality Promise</h3><p className="text-gray-400">Every product crafted with precision and passion</p></div>
              <div className="text-center"><div className="w-16 h-16 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center mb-4"><Globe className="w-8 h-8 text-yellow-400" /></div><h3 className="text-xl font-bold text-white mb-2">Global Impact</h3><p className="text-gray-400">Making world-class technology accessible to everyone</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// =========================================================================
// START: UPDATED CONCEPT SHOWCASE SECTION
// =========================================================================

// --- Concept Card with video preview and mute/unmute control ---
interface ConceptCardProps {
  image: string;
  video: string;
  isComingSoon?: boolean;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ image, video, isComingSoon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Video starts muted
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(error => console.error("Video autoplay prevented:", error));
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents other click events on the card
    e.preventDefault();
    setIsMuted(!isMuted);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl bg-black group hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg min-h-[420px]"
    >
      <img
        src={image}
        alt="Concept thumbnail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
      />
      <video
        ref={videoRef}
        src={video}
        muted={isMuted} // Mute state is controlled by the user
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {isComingSoon && (
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold z-10">
          Coming Soon
        </div>
      )}

      {/* Mute/Unmute button - appears on hover */}
      <div className={`absolute bottom-4 right-4 z-20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={toggleMute}
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/75 focus:outline-none"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const showcaseProducts = [
    { id: 'regal-ai', image: 'https://zerolifestyle.co/cdn/shop/files/811-Black-ER.jpg?v=1733301032', video: 'https://cdn.shopify.com/videos/c/o/v/a26243e404324a45aa8cc5f71310678a.mp4' },
    { id: 'robo', image: 'https://zerolifestyle.co/cdn/shop/files/ad_03_2.jpg?v=1750424623', video: 'https://cdn.shopify.com/videos/c/o/v/0c8d613003724b8686042f335726feef.mp4' },
    { id: 'display', image: 'https://zerolifestyle.co/cdn/shop/files/creative_2_-_battery.jpg?v=1750424540', video: 'https://cdn.shopify.com/videos/c/o/v/18fb1ebc99bb42fcbf93a86bc84ca236.mp4' },
    { id: 'thunder-box', image: 'https://zerolifestyle.co/cdn/shop/files/9.jpg?v=1750424571', video: 'https://cdn.shopify.com/videos/c/o/v/0914bbf7d893469b8389aa76f0a1b4a5.mp4', isComingSoon: true }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Concept Showcase</h2>
            <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">A glimpse into the future of Zero.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {showcaseProducts.map((product) => (
            <ConceptCard key={product.id} image={product.image} video={product.video} isComingSoon={product.isComingSoon} />
          ))}
        </div>
      </div>
    </section>
  );
};
// =========================================================================
// END: UPDATED CONCEPT SHOWCASE SECTION
// =========================================================================


// --- Z-Stars Section with Subscription Logic ---
const ZStarsSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000); // Reset form after 4 seconds
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://zerolifestyle.co/cdn/shop/files/talha1copy_27de8dee-3b6b-4513-b747-6bcea1e90b6a.webp?v=1747124264&width=600"
              alt="Z-Stars Celebrity Endorsement"
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-2xl flex flex-col justify-end items-center text-center p-6 sm:p-10">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-300 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl font-bold text-black transform -rotate-12">Z</span>
              </div>
              <p className="text-sm text-yellow-400 mb-1 font-semibold">Proud to Sign</p>
              <h3 className="text-4xl sm:text-5xl font-bold mb-1 text-white">Z-STARS</h3>
              <p className="text-sm text-yellow-400 mb-4 font-semibold">Power Combo</p>
              <p className="text-xs sm:text-sm text-gray-200 max-w-sm leading-relaxed">
                Welcome to the Zero Lifestyle family. You're at the forefront of
                wearable tech innovation. Let's make every moment stylish together.
              </p>
            </div>
          </div>
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">Hear the <span className="text-yellow-400">Zero</span> first.</h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                Sign up for exclusive updates on our latest offers, new products,
                collaborations, and all things Zero - straight to your inbox.
              </p>
            </div>
            <div className="max-w-lg mx-auto lg:mx-0">
              {!isSubscribed ? (
                <form className="flex flex-col sm:flex-row gap-3 sm:gap-4" onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="Your e-mail address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3 sm:px-6 sm:py-4 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  />
                  <button type="submit" className="bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:from-yellow-400 hover:to-amber-400 transition-all duration-300 shadow-md hover:shadow-lg">
                    SUBSCRIBE
                  </button>
                </form>
              ) : (
                <div className="text-center bg-green-500/20 text-green-300 font-bold px-6 py-4 rounded-lg">
                  Subscribed Successfully!
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3 text-center lg:text-left">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Main HomePage Component ---
const HomePage = () => {
  return (
    <>
      <Hero />

      <ProductSection
        title="Hot Selling Gadgets"
        products={hotSellingProducts}
        icon={Flame}
        titleColor="text-red-500"
        sectionBg="bg-white"
      />
      <ProductSection
        title="Just Launched"
        products={justLaunchedProducts}
        icon={Rocket}
        sectionBg="bg-gray-100"
      />
      <ProductSection
        title="Latest Releases"
        products={latestProductsAdapterData}
        icon={Zap}
        sectionBg="bg-white"
      />

      <ProductCategoriesPreview />
      <Vision2025 />
      
      <ProductShowcase />
      <ZStarsSection />
      
      <Newsletter />
    </>
  );
};

export default HomePage;