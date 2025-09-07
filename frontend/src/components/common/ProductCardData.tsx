// src/components/common/ProductCard.tsx
import React from 'react';

// Define an interface for the product data
export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string; // Optional: if you want to display or filter by category
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col">
      <div className="w-full h-56 sm:h-64 overflow-hidden"> {/* Responsive height for image container */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow"> {/* flex-grow allows text content to push footer down */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 leading-relaxed text-sm mb-4 flex-grow">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-auto"> {/* mt-auto pushes this to bottom */}
          <span className="text-2xl font-bold text-gray-900">{product.price}</span>
          <button
            className="bg-black text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 text-sm"
            // onClick={() => alert(`Viewing details for ${product.name}`)} // Placeholder action
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;