// src/pages/CartPage.tsx
import React from 'react';
import { useCart, CartItem } from '../contexts/CartContext'; // CartItem is already imported
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, PlusCircle, MinusCircle, ShoppingCart } from 'lucide-react';
import PageShell from '../components/common/PageShell'; // Assuming you have this

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotalPrice
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
        // Navigate to your checkout page.
        // You might want to pass cart state or redirect to a page that can access the cart context.
        navigate('/checkout');
    } else {
        // This case should ideally not be reached if the button is disabled or page shows "empty cart" message
        alert("Your cart is empty. Please add items before proceeding to checkout.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <PageShell title="Your Shopping Cart">
        <div className="text-center py-20 flex flex-col items-center">
          <ShoppingCart size={64} className="text-gray-400 mb-6" />
          <p className="text-2xl text-gray-600 mb-6">Your cart is currently empty.</p>
          <p className="text-gray-500 mb-8">Add some amazing products to get started!</p>
          <Link
            to="/" // Link to homepage or main product listing
            className="bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors text-lg shadow-md hover:shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Your Shopping Cart">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 md:p-8">
          {cartItems.map((item: CartItem) => {
            // Construct a link to the product.
            // This is a common pattern, adjust if your product detail routes are different.
            // If no specific detail page, link to the category page with a filter.
            let productLink = `/${item.category.toLowerCase()}?category=${encodeURIComponent(item.category)}&id=${item.id}`;
            // If you have a generic /products/:id page:
            // productLink = `/products/${item.id}`;

            return (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-200 py-6 last:border-b-0"
              >
                <div className="flex items-start sm:items-center mb-4 sm:mb-0 w-full sm:w-auto">
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-lg mr-4 border border-gray-200 p-1"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-slate-600">
                      <Link to={productLink}>{item.name}</Link>
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Unit Price: Rs{(item.salePrice !== undefined ? item.salePrice : item.originalPrice).toLocaleString()}
                    </p>
                    {item.category && <p className="text-xs text-gray-400 mt-0.5">Category: {item.category}</p>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4 ml-auto sm:ml-0 mt-2 sm:mt-0">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-gray-600 hover:text-red-500 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                      aria-label="Decrease quantity"
                    >
                      <MinusCircle size={20} />
                    </button>
                    <span className="px-2 sm:px-3 text-gray-700 font-medium w-8 sm:w-10 text-center select-none">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-gray-600 hover:text-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
                      aria-label="Increase quantity"
                    >
                      <PlusCircle size={20} />
                    </button>
                  </div>
                  <p className="text-md font-semibold text-gray-800 w-20 sm:w-24 text-right">
                    Rs{((item.salePrice !== undefined ? item.salePrice : item.originalPrice) * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
                    aria-label="Remove item from cart"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg text-gray-600">Subtotal ({getItemCount()} {getItemCount() === 1 ? "item" : "items"}):</h3>
              <p className="text-lg text-gray-800">Rs{getTotalPrice().toLocaleString()}</p>
            </div>
            {/* Potential place for shipping/tax details */}
            {/* <div className="flex justify-between items-center text-sm text-gray-500">
              <p>Estimated Shipping:</p>
              <p>₹50.00</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <p>Tax (GST 18%):</p>
              <p>₹{(getTotalPrice() * 0.18).toLocaleString()}</p>
            </div> */}
            <div className="flex justify-between items-center mt-4 mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Order Total:</h3>
              <p className="text-2xl font-bold text-slate-800">Rs{getTotalPrice().toLocaleString()}</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your cart?")) {
                    clearCart();
                  }
                }}
                className="text-sm text-red-600 hover:text-red-800 font-medium py-3 px-5 rounded-lg border border-red-500 hover:bg-red-50 transition-colors w-full sm:w-auto order-2 sm:order-1 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-10 rounded-lg transition-colors text-lg shadow-md hover:shadow-lg w-full sm:w-auto order-1 sm:order-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
              >
                Proceed to Checkout
              </button>
            </div>
             <div className="mt-8 text-center">
                <Link to="/" className="text-sm text-slate-600 hover:text-slate-800 font-medium hover:underline">
                    ← Or continue shopping
                </Link>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default CartPage;