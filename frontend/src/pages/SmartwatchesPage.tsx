// src/pages/SmartwatchesPage.tsx
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PageShell from '../components/common/PageShell';
import ProductCard, { ProductCardData } from '../components/ProductCard';

export const smartwatchesData: ProductCardData[] = [
  // === LIFESTYLE CATEGORY ===
  { id: 'sw1', name: "Zero Series X", description: "The ultimate smartwatch for a connected life...", originalPrice: 29900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/01_a1bd6670-1c70-448c-99ec-0409703d183f.webp?v=1734678626&width=700", category: "Lifestyle", rating: 4.7, badge: "Flagship", colors: ["#000000", "#8B0000"] },
  { id: 'sw8', name: "Zero Vision+", description: "Clear AMOLED display with gesture controls...", originalPrice: 28900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/Silver-vogue.webp?v=1742632877&width=600", category: "Lifestyle", colors: ["#505050", "#C0C0C0"], rating: 4.4 },
  { id: 'sw15', name: "Zero Urban Life", description: "Smart and stylish for the modern city dweller...", originalPrice: 18900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/Infinity_gld.webp?v=1729678902&width=600", category: "Lifestyle", rating: 4.2, colors: ["#444444", "#999999"] },
  { id: 'sw21', name: "Zero Night Lite", description: "Elegant watch with ambient lighting...", originalPrice: 20900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/Jaguar_1_5.webp?v=1736171250&width=600", category: "Lifestyle", rating: 4.3, colors: ["#333333", "#FFDD00"] },
  { id: 'sw22', name: "Zero Crystal View", description: "Sharp visuals with edge-to-edge display...", originalPrice: 26900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/OCEANGRAYORANGE_4.webp?v=1723561343&width=600", category: "Lifestyle", rating: 4.5, colors: ["#000000", "#FFFFFF"] },
  { id: 'sw23', name: "Zero Glow Band", description: "Glow effect for night fashion...", originalPrice: 14900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/blackgold_3_b4feec76-b7e0-42d2-b65d-61e4358cefa8.png?v=1733741145&width=600", category: "Lifestyle", rating: 4.0, colors: ["#FF69B4", "#FFFF00"] },
  { id: 'sw24', name: "Zero Neo Gen", description: "Redefining urban lifestyle with AI assist...", originalPrice: 31900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/blackgold_1.png?v=1723061872&width=500", category: "Lifestyle", rating: 4.6, colors: ["#2F4F4F", "#708090"] },
  { id: 'sw25', name: "Zero Flex Mode", description: "Smart assistant for daily routines...", originalPrice: 19900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/b2.webp?v=1743267025&width=600", category: "Lifestyle", rating: 4.3, colors: ["#FF4500", "#1E90FF"] },
  { id: 'sw26', name: "Zero Nova Smart", description: "Next-gen style and features...", originalPrice: 28900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/ICON-Silver-2.webp?v=1743247886&width=600", category: "Lifestyle", rating: 4.7, colors: ["#4B0082", "#00CED1"] },
  { id: 'sw27', name: "Zero Edge", description: "Bezel-less futuristic design...", originalPrice: 30900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/RevoltGolden01.webp?v=1736870078&width=600", category: "Lifestyle", rating: 4.8, colors: ["#000000", "#7CFC00"] },

  // === FITNESS CATEGORY ===
  { id: 'sw2', name: "Zero Fit Pro", description: "Your perfect fitness companion...", originalPrice: 19900, salePrice: 17900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/2_4_2adebc78-1547-4a64-bd35-6eda4c743fc9.png?v=1717406207&width=500", category: "Fitness", rating: 4.6, discountPercentText: "10% OFF", colors: ["#000000", "#1E90FF"] },
  { id: 'sw4', name: "Zero Active Lite", description: "Lightweight and durable, designed for sports...", originalPrice: 15900, imageUrl: "https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop", category: "Fitness", rating: 4.5, badge: "Sporty", colors: ["#228B22", "#000000"] },
  { id: 'sw28', name: "Zero Fit Max", description: "For fitness freaks and athletes...", originalPrice: 25900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/Royale_Blue_Strap_0000_61b7154b-2e62-43c3-a64b-f0c849e4d9e3.webp?v=1725970285&width=600", category: "Fitness", rating: 4.4, colors: ["#006400", "#00FA9A"] },
  { id: 'sw29', name: "Zero Swift Run", description: "Track every step with precision...", originalPrice: 18900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/Royale_Gold_0000_c9e7e71d-89d2-4c63-8c85-a52ccea1f59d.webp?v=1725970482&width=600", category: "Fitness", rating: 4.2, colors: ["#FF6347", "#2E8B57"] },
  { id: 'sw30', name: "Zero Cardio X", description: "Built for your cardio workouts...", originalPrice: 17900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/Jewel_1_57b8f293-03c2-46be-9f76-79cf4af38c09.webp?v=1744982542&width=600", category: "Fitness", rating: 4.3, colors: ["#B22222", "#000000"] },
  { id: 'sw31', name: "Zero Trainer+", description: "Stay on top of your gym routine...", originalPrice: 22900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/Jewel_1_52087a86-eb4c-4a1e-bb22-0f36c1ab00b1.webp?v=1745067598&width=600", category: "Fitness", rating: 4.5, colors: ["#A0522D", "#A9A9A9"] },
  { id: 'sw32', name: "Zero Fit Flex", description: "Flexible band for high activity sports...", originalPrice: 15900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/RoseGold_2_deee930e-6d3d-414b-bdb5-3eca8aa8918d.webp?v=1741431232&width=600", category: "Fitness", rating: 4.0, colors: ["#00BFFF", "#8A2BE2"] },
  { id: 'sw33', name: "Zero Sport Wave", description: "Designed for runners and hikers...", originalPrice: 19900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/01_202a37db-cf55-4a8d-b7e2-851b2e550263.webp?v=1732197227&width=600", category: "Fitness", rating: 4.4, colors: ["#20B2AA", "#191970"] },
  { id: 'sw34', name: "Zero Move Smart", description: "Tracks motion & activity seamlessly...", originalPrice: 21900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/matrix-green_567f0841-27bd-483a-ba1d-30bf0ef56ddf.webp?v=1718558867&width=600", category: "Fitness", rating: 4.3, colors: ["#F4A460", "#00008B"] },
  { id: 'sw35', name: "Zero Peak Pulse", description: "Peak performance for workouts...", originalPrice: 24900, imageUrl: "https://zerolifestyle.co/cdn/shop/files/RoseGold_1.webp?v=1725950101&width=600", category: "Fitness", rating: 4.6, colors: ["#DC143C", "#2F4F4F"] }
];



const SmartwatchesPage: React.FC = () => {
  const location = useLocation();

  const filteredSmartwatches = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      return smartwatchesData.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    return smartwatchesData;
  }, [location.search]);

  const params = new URLSearchParams(location.search);
  const currentCategory = params.get('category');
  const displayCategory = currentCategory 
    ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1) 
    : '';
  const pageTitle = displayCategory ? `Smartwatches: ${displayCategory}` : "Our Smartwatches";

  return (
    <PageShell title={pageTitle}>
      {filteredSmartwatches.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredSmartwatches.map(product => ( 
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            No smartwatches found {displayCategory ? `for the "${displayCategory}" category` : ""}.
          </p>
        </div>
      )}
    </PageShell>
  );
};

export default SmartwatchesPage;
