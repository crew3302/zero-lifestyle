// src/types/ProductType.ts
export interface ProductType {
    id: string; // Ensure ID is a string for consistency with CartContext
    name: string;
    description: string;
    originalPrice: number; // Price as number
    salePrice?: number;    // Optional sale price as number
    imageUrl: string;
    category: string;
    // Add any other common product fields here
    // e.g., stock?: number;
  }