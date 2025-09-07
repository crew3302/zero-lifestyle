// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* Wrap App with CartProvider */}
      
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);