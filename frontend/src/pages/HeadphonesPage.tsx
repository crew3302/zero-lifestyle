// src/pages/HeadphonesPage.tsx
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PageShell from '../components/common/PageShell';
import ProductCard, { ProductCardData } from '../components/ProductCard';

// 👇 ADD 'export' HERE
export const headphonesData: ProductCardData[] = [
  // === WIRELESS (10) ===
  {
    id: 'hp1',
    name: "Zero Play Wireless",
    description: "Lightweight on‑ear headphones with vibrant sound...",
    originalPrice: 12900,
    imageUrl: "https://images.priceoye.pk/ddk-339-wireless-bluetooth-headphones-pakistan-priceoye-2p64y-500x500.webp",
    category: "Wireless",
    rating: 4.5,
    colors: ["#FF6347", "#1E90FF"]
  },
  {
    id: 'hp2',
    name: "Zero Red Wave",
    description: "Vibrant red wireless with extra bass...",
    originalPrice: 14900,
    salePrice: 13400,
    discountPercentText: "10% OFF",
    imageUrl: "https://images.priceoye.pk/anker-soundcore-life-q45-headphones-pakistan-priceoye-0xbqq-500x500.webp",
    category: "Wireless",
    rating: 4.4,
    colors: ["#FF0000"]
  },
  {
    id: 'hp3',
    name: "Zero Air Light",
    description: "Ultra‑lightweight on‑ear headphones...",
    originalPrice: 9900,
    imageUrl: "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg",
    category: "Wireless",
    rating: 4.2,
    colors: ["#FFFFFF", "#C0C0C0"],
    badge: "Feather Light"
  },
  {
    id: 'hp4',
    name: "Zero Cat Pulse Bass",
    description: "Dynamic bass and wireless freedom...",
    originalPrice: 13900,
    imageUrl: "https://images.priceoye.pk/stn-28-cat-claws-wireless-headphone-pakistan-priceoye-eh2ud-500x500.webp",
    category: "Wireless",
    rating: 4.3,
    colors: ["#000000", "#F5F5F5"]
  },
  {
    id: 'hp5',
    name: "Zero Beat Flow",
    description: "Sleek design with long battery life...",
    originalPrice: 15900,
    imageUrl: "https://images.priceoye.pk/soundpeats-space-headphones-pakistan-priceoye-wzwkc-270x270.webp",
    category: "Wireless",
    rating: 4.6,
    colors: ["#222222", "#A9A9A9"]
  },
  {
    id: 'hp6',
    name: "Zero Fusion X",
    description: "Crystal-clear calls and audio playback...",
    originalPrice: 17900,
    salePrice: 15900,
    discountPercentText: "11% OFF",
    imageUrl: "https://images.priceoye.pk/yolo-mercury-h1-wireless-headphones-pakistan-priceoye-gl86d-270x270.webp",
    category: "Wireless",
    rating: 4.5,
    colors: ["#000000", "#0077BE"]
  },
  {
    id: 'hp7',
    name: "Zero Glide Pro",
    description: "Foldable wireless with quick pair...",
    originalPrice: 14900,
    imageUrl: "https://images.priceoye.pk/p47-wireless-bluetooth-stereo-headphones-pakistan-priceoye-u8vji-500x500.webp",
    category: "Wireless",
    rating: 4.3,
    colors: ["#696969", "#A0522D"]
  },
  {
    id: 'hp8',
    name: "Zero Clarity Wireless",
    description: "Clarity-focused sound tuning...",
    originalPrice: 18900,
    imageUrl: "https://images.priceoye.pk/faster-solo-wireless-stereo-headphones-s4hd-pakistan-priceoye-5b9rc-500x500.webp",
    category: "Wireless",
    rating: 4.4,
    badge: "Crystal Sound"
  },
  {
    id: 'hp9',
    name: "Zero Commute Wireless",
    description: "Perfect for daily commuters...",
    originalPrice: 15900,
    imageUrl: "https://images.priceoye.pk/sony-wh-g500-bz-over-head-bluetooth-headphones-pakistan-priceoye-60a69-270x270.webp",
    category: "Wireless",
    rating: 4.3,
    colors: ["#B0B0B0"]
  },
  {
    id: 'hp10',
    name: "Zero Bass Boost",
    description: "Boosted bass profile for music lovers...",
    originalPrice: 16900,
    imageUrl: "https://images.priceoye.pk/hifuture-futuretour-over-ear-anc-headphones-pakistan-priceoye-ttb61-270x270.webp",
    category: "Wireless",
    rating: 4.7,
    badge: "Extra Bass"
  },

  // === STUDIO (5) ===
  {
    id: 'hp11',
    name: "Zero Studio Max",
    description: "Over-ear headphones with studio-quality sound...",
    originalPrice: 34900,
    salePrice: 31900,
    discountPercentText: "9% OFF",
    imageUrl: "https://images.priceoye.pk/sony-wh-g700-wz-over-head-bluetooth-headphones-pakistan-priceoye-vghw7-500x500.webp",
    category: "Studio",
    rating: 4.9,
    badge: "Pro Pick",
    colors: ["#000000", "#D3D3D3"]
  },
  {
    id: 'hp12',
    name: "Zero Studio Pro",
    description: "Flat-response tuned for accurate monitoring...",
    originalPrice: 31900,
    imageUrl: "https://images.priceoye.pk/qcy-h3-anc-wireless-headphones-pakistan-priceoye-r0t6f-270x270.webp",
    category: "Studio",
    rating: 4.8,
    colors: ["#2F4F4F", "#B0C4DE"]
  },
  {
    id: 'hp13',
    name: "Zero Monitor Studio",
    description: "Closed-back studio reference sound...",
    originalPrice: 29900,
    imageUrl: "https://images.priceoye.pk/bluks-bx-82-wireless-headphone-pakistan-priceoye-rndt4-270x270.webp",
    category: "Studio",
    rating: 4.7,
    colors: ["#202020", "#909090"]
  },
  {
    id: 'hp14',
    name: "Zero Mix Studio",
    description: "Ideal for mixing and mastering audio...",
    originalPrice: 27900,
    imageUrl: "https://images.priceoye.pk/faster-s5-anc-over-ear-wireless-headphones-pakistan-priceoye-vlvia-500x500.webp",
    category: "Studio",
    rating: 4.6,
    colors: ["#696969"]
  },
  {
    id: 'hp15',
    name: "Zero Reference Pro",
    description: "Accurate sound stage and wide frequency range...",
    originalPrice: 32900,
    imageUrl: "https://images.priceoye.pk/apple-airpods-max-pakistan-priceoye-qjl0h-500x500.webp",
    category: "Studio",
    rating: 4.9,
    badge: "Reference Grade",
    colors: ["#000000", "#CCCCCC"]
  }
];


const HeadphonesPage: React.FC = () => {
  const location = useLocation();

  const filteredHeadphones = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      return headphonesData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    return headphonesData;
  }, [location.search]);

  const params = new URLSearchParams(location.search);
  const currentCategory = params.get('category');
  const displayCategory = currentCategory 
    ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) 
    : '';
  const pageTitle = displayCategory ? `Headphones: ${displayCategory}` : "Our Headphones";

  return (
    <PageShell title={pageTitle}>
      {filteredHeadphones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredHeadphones.map(product => ( 
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            No headphones found {displayCategory ? `for the "${displayCategory}" category` : ""}.
          </p>
        </div>
      )}
    </PageShell>
  );
};

export default HeadphonesPage;