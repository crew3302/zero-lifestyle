// src/App.tsx
import React from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SmartwatchesPage from './pages/SmartwatchesPage';
import EarbudsPage from './pages/EarbudsPage';
import HeadphonesPage from './pages/HeadphonesPage';
import VisionPage from './pages/VisionPage';
import SupportPage from './pages/SupportPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Import new page

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center">
    <h1 className="text-6xl font-bold text-gray-800">404</h1>
    <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>
    <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
    <RouterLink to="/" className="mt-8 px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800">
      Go Home
    </RouterLink>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="earbuds" element={<EarbudsPage />} />
        <Route path="headphones" element={<HeadphonesPage />} />
        <Route path="smartwatches" element={<SmartwatchesPage />} />
        
        {/* Product Detail Page Route - using a generic path */}
        {/* You could also do /:category/:productId if you prefer */}
        <Route path="product/:productId" element={<ProductDetailPage />} />

        <Route path="vision" element={<VisionPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;