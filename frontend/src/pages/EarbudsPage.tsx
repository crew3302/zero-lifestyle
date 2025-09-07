// src/pages/EarbudsPage.tsx
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PageShell from '../components/common/PageShell';
import ProductCard, { ProductCardData } from '../components/ProductCard';

// Data should now conform to ProductCardData
// 👇 ADD 'export' HERE
export const earbudsData: ProductCardData[] = [
  // 🎧 Wireless (7)
  {
    id: 'eb1',
    name: "Zero Buds Air",
    description: "Crystal clear sound and seamless connectivity...",
    originalPrice: 14900,
    salePrice: 12900,
    discountPercentText: "13% OFF",
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/deep-5.png?v=1742454750&width=400",
    category: "Wireless",
    rating: 4.5,
    badge: "New",
    colors: ["#FFFFFF", "#000000"]
  },
  {
    id: 'eb2',
    name: "Zero Buds Connect",
    description: "Multipoint Bluetooth for dual‑device use...",
    originalPrice: 15900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/Ecommerce-Image-1.webp?v=1729196999&width=600",
    category: "Wireless",
    rating: 4.4,
    colors: ["#333333", "#CCCCCC"]
  },
  {
    id: 'eb3',
    name: "Zero Buds Flex",
    description: "Flexible wireless design with quick charge...",
    originalPrice: 9900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/AtomPro_4.webp?v=1736865384&width=600",
    category: "Wireless",
    rating: 4.3,
    colors: ["#222222", "#FFCC00"]
  },
  {
    id: 'eb4',
    name: "Zero Buds Glide",
    description: "Wireless freedom with smooth connectivity...",
    originalPrice: 10900,
    salePrice: 9400,
    discountPercentText: "14% OFF",
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/3-Arcade-800.webp?v=1730905139&width=600",
    category: "Wireless",
    rating: 4.2,
    colors: ["#444444", "#00BFFF"]
  },
  {
    id: 'eb5',
    name: "Zero Buds Pulse",
    description: "Seamless pairing and strong Bluetooth signal...",
    originalPrice: 13900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/5-Arcade-800.webp?v=1730273506&width=600",
    category: "Wireless",
    rating: 4.6,
    colors: ["#FF4500", "#FFFFFF"]
  },
  {
    id: 'eb6',
    name: "Zero Buds Neo",
    description: "Stylish wireless buds with fast charging...",
    originalPrice: 12500,
    salePrice: 11200,
    discountPercentText: "10% OFF",
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/ROBO_6.webp?v=1742691968&width=600",
    category: "Wireless",
    rating: 4.3,
    colors: ["#A9A9A9", "#111111"]
  },
  {
    id: 'eb7',
    name: "Zero Buds Boost",
    description: "Bass-heavy wireless earbuds for music lovers...",
    originalPrice: 11900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/Black_04.01.webp?v=1724242994&width=400",
    category: "Wireless",
    badge: "Bass Boost",
    rating: 4.5,
    colors: ["#000000", "#FF0000"]
  },

  // 🔇 ANC (13)
  {
    id: 'eb8',
    name: "Zero Buds Pro",
    description: "Active noise cancellation and immersive audio...",
    originalPrice: 19900,
    salePrice: 17900,
    discountPercentText: "10% OFF",
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/White_05.01.png?v=1722939264&width=400",
    category: "ANC",
    rating: 4.8,
    badge: "Best Seller",
    colors: ["#333333", "#E0E0E0"]
  },
  {
    id: 'eb9',
    name: "Zero Buds Whisper",
    description: "Block out noise with intelligent ANC...",
    originalPrice: 18900,
    salePrice: 15900,
    discountPercentText: "15% OFF",
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/Arcade-900-Black-3.webp?v=1730962664&width=600",
    category: "ANC",
    rating: 4.6,
    badge: "Noise Canceling",
    colors: ["#000000", "#A0A0A0"]
  },
  {
    id: 'eb10',
    name: "Zero Buds Echo",
    description: "Echo-reducing ANC for calls and media...",
    originalPrice: 17900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/white-4.webp?v=1728650079&width=600",
    category: "ANC",
    rating: 4.7,
    colors: ["#1C1C1C", "#008080"]
  },
  {
    id: 'eb11',
    name: "Zero Buds Zen",
    description: "Adaptive ANC and calming audio tones...",
    originalPrice: 20900,
    salePrice: 18900,
    discountPercentText: "9% OFF",
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/Green_02.01.webp?v=1724242994&width=600",
    category: "ANC",
    badge: "Premium",
    rating: 4.6,
    colors: ["#2F4F4F", "#F5F5F5"]
  },
  {
    id: 'eb12',
    name: "Zero Buds Aura",
    description: "Balanced ANC performance for daily use...",
    originalPrice: 15900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/Ecommerce-Image-5_1.webp?v=1729158085&width=600",
    category: "ANC",
    rating: 4.2,
    colors: ["#B0C4DE", "#000000"]
  },
  {
    id: 'eb13',
    name: "Zero Buds Elite",
    description: "Elite ANC experience with transparency mode...",
    originalPrice: 23900,
    salePrice: 21900,
    discountPercentText: "8% OFF",
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/AtomPro_5.webp?v=1736865384&width=600",
    category: "ANC",
    rating: 4.9,
    colors: ["#708090", "#DCDCDC"]
  },
  {
    id: 'eb14',
    name: "Buds Max ANC",
    description: "Max-level noise blocking with deep bass...",
    originalPrice: 21900,
    imageUrl: "https://ronin.pk/cdn/shop/files/B3_2c2330db-b95f-4239-9088-af9c6220e709.webp?v=1750400222&width=600",
    category: "ANC",
    badge: "Max ANC",
    rating: 4.7,
    colors: ["#000000", "#4B0082"]
  },
  {
    id: 'eb15',
    name: "Zero Buds Silence",
    description: "Experience the calm with dual-mic ANC...",
    originalPrice: 18900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/Untitleddesign_86.png?v=1720701403&width=600",
    category: "ANC",
    rating: 4.4,
    colors: ["#F8F8FF", "#2C2C2C"]
  },
  {
    id: 'eb16',
    name: "Zero Buds Clarity ANC",
    description: "Crystal-clear sound with zero distractions...",
    originalPrice: 18900,
    imageUrl: "https://zerolifestyle.co/cdn/shop/files/Untitleddesign_84.png?v=1725113815&width=600",
    category: "ANC",
    rating: 4.5,
    colors: ["#FFFFFF", "#1E1E1E"]
  },
  {
    id: 'eb17',
    name: "Zero Buds Focus",
    description: "Focus-enhancing ANC earbuds for work...",
    originalPrice: 17900,
    salePrice: 16200,
    discountPercentText: "9% OFF",
    imageUrl: "https://images.priceoye.pk/aukey-tws-wireless-earbuds-pakistan-priceoye-xx39a-500x500.webp",
    category: "ANC",
    rating: 4.4,
    colors: ["#000080", "#ADD8E6"]
  },
  {
    id: 'eb18',
    name: "Zero Buds Storm",
    description: "Engineered to block even storm-level noise...",
    originalPrice: 18900,
    imageUrl: "https://images.priceoye.pk/m04-tws-wireless-bluetooth-earbuds-pakistan-priceoye-9o3tc-500x500.webp",
    category: "ANC",
    badge: "Extreme",
    rating: 4.5,
    colors: ["#000000", "#808080"]
  },
  {
    id: 'eb19',
    name: "Zero Buds Halo",
    description: "High-res ANC with 360° soundscape...",
    originalPrice: 22900,
    salePrice: 20900,
    discountPercentText: "9% OFF",
    imageUrl: "https://images.priceoye.pk/yolo-yopod-active-plus-true-wireless-earbuds-pakistan-priceoye-3lkxj-500x500.webp",
    category: "ANC",
    rating: 4.6,
    colors: ["#F0F8FF", "#000000"]
  },
  {
    id: 'eb20',
    name: "Zero Buds AI ANC",
    description: "AI-powered adaptive ANC for every environment...",
    originalPrice: 24900,
    imageUrl: "https://images.priceoye.pk/f40-tws-wireless-transparent-earbuds-pakistan-priceoye-b90ug-500x500.webp",
    category: "ANC",
    rating: 4.9,
    colors: ["#2E2E2E", "#DDDDDD"]
  }
];




const EarbudsPage: React.FC = () => {
  const location = useLocation();

  const filteredEarbuds = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      return earbudsData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    return earbudsData;
  }, [location.search]);

  const params = new URLSearchParams(location.search);
  const currentCategory = params.get('category');
  const displayCategory = currentCategory 
    ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) 
    : '';
  const pageTitle = displayCategory ? `Earbuds: ${displayCategory}` : "Our Earbuds";

  return (
    <PageShell title={pageTitle}>
      {filteredEarbuds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredEarbuds.map(product => ( 
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            No earbuds found {displayCategory ? `for the "${displayCategory}" category` : ""}.
          </p>
        </div>
      )}
    </PageShell>
  );
};

export default EarbudsPage;