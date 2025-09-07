// src/components/common/ProductCard.tsx
import React, { useState } from 'react';
import { Star, ShoppingCart, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { ProductType } from '../types/ProductType';
import { Link } from 'react-router-dom';

export interface ProductCardData extends ProductType {
  rating?: number;
  discountPercentText?: string;
  badge?: string;
  colors?: string[];
}

interface ProductCardProps {
  product: ProductCardData;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    id, name, description, imageUrl, rating = 0, originalPrice, salePrice,
    discountPercentText, badge, colors,
  } = product;

  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const productInCart = isInCart(id);

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (productInCart || isAdding) return;
    setIsAdding(true);
    addToCart(product); // product here is DisplayProductData, which extends ProductType
    setTimeout(() => setIsAdding(false), 1000);
  };

  const displayPrice = salePrice !== undefined ? salePrice : originalPrice;
  const hasActualDiscount = salePrice !== undefined && originalPrice > salePrice;

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden border border-gray-200 h-full">
      {badge && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow">
          {badge}
        </div>
      )}
      
      {/* Pass the whole product object in the Link state */}
      <Link to={`/product/${id}`} state={{ productData: product }} className="flex flex-col flex-grow h-full">
        <div className="relative w-full h-56 overflow-hidden">
          <img
            src={imageUrl || 'https://via.placeholder.com/300'}
            alt={name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate group-hover:text-clip group-hover:whitespace-normal" title={name}>
            {name}
          </h3>
          <p className="text-xs text-gray-500 mb-3 h-8 overflow-hidden text-ellipsis group-hover:text-clip group-hover:whitespace-normal line-clamp-2">
            {description}
          </p>
          {rating > 0 && (
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1.5">({rating.toFixed(1)})</span>
            </div>
          )}
          <div className="flex items-baseline mb-3">
            <span className="text-xl font-bold text-gray-900 mr-2">
              Rs{displayPrice.toLocaleString()}
            </span>
            {hasActualDiscount && (
              <span className="text-sm text-gray-400 line-through">
                Rs{originalPrice.toLocaleString()}
              </span>
            )}
            {discountPercentText && hasActualDiscount && (
              <span className="ml-2 text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded">
                {discountPercentText}
              </span>
            )}
          </div>
          {colors && colors.length > 0 && (
            <div className="flex space-x-1.5 mb-4">
              {colors.slice(0, 4).map((color, index) => (
                <span
                  key={index}
                  className="block w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                ></span>
              ))}
              {colors.length > 4 && <span className="text-xs text-gray-400 self-center">+{colors.length - 4}</span>}
            </div>
          )}
        </div>
      </Link>
       <div className="p-5 pt-0 mt-auto">
          <button
            onClick={handleAddToCartClick}
            disabled={productInCart || isAdding}
            className={`w-full font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm min-h-[42px]
              ${productInCart
                ? 'bg-green-100 text-green-700 border border-green-300 cursor-default'
                : isAdding
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
              }`}
          >
            {productInCart ? (
              <><CheckCircle size={18} /> Added</>
            ) : isAdding ? (
              <><Loader2 className="animate-spin" size={18} /> Adding...</>
            ) : (
              <><ShoppingCart size={18} /> Add to Cart</>
            )}
          </button>
        </div>
    </div>
  );
};

export default ProductCard;