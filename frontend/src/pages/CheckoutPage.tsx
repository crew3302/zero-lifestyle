// src/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useCart, CartItem } from '../contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import PageShell from '../components/common/PageShell';
import { Lock, CheckCircle, AlertTriangle } from 'lucide-react';

interface FormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart, getItemCount } = useCart();
  const navigate = useNavigate();
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState<{ orderId: string; orderDate: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    city: '',
    postalCode: '',
    country: 'Pakistan',
  });

  useEffect(() => {
    // Redirect if cart is empty and no order has just been successfully placed,
    // and we are not currently in the process of placing an order.
    if (cartItems.length === 0 && !orderSuccess && !isPlacingOrder) {
      alert("Your cart is empty. Redirecting to shopping page.");
      navigate('/');
    }
  }, [cartItems, navigate, orderSuccess, isPlacingOrder]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Cannot place an order with an empty cart.");
      return;
    }
    setIsPlacingOrder(true);
    setOrderError(null);
    setOrderSuccess(null);

    const fullShippingAddress = `${formData.shippingAddress}, ${formData.city}, ${formData.postalCode}, ${formData.country}`;

    const orderPayload = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      shippingAddress: fullShippingAddress,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        quantity: item.quantity,
        priceAtPurchase: item.salePrice !== undefined ? item.salePrice : item.originalPrice,
      })),
      totalAmount: getTotalPrice(),
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const responseBodyText = await response.text(); // Read body as text first

      if (response.ok) {
        try {
          const result = JSON.parse(responseBodyText); // Parse text as JSON
          setOrderSuccess({ orderId: String(result.order.order_id), orderDate: result.order.order_date });
          clearCart();
        } catch (jsonParseError) {
          console.error("Failed to parse successful JSON response:", jsonParseError, "Body:", responseBodyText);
          throw new Error("Received an invalid success response from the server.");
        }
      } else {
        let errorMessage = `Failed to place order. Status: ${response.status} ${response.statusText}`;
        try {
          const errorResult = JSON.parse(responseBodyText); // Attempt to parse as JSON
          errorMessage = errorResult.msg || errorResult.error || errorMessage;
        } catch (e) {
          // If not JSON, use the raw text body if it's not empty
          if (responseBodyText) {
            errorMessage = responseBodyText;
          }
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError(error instanceof Error ? error.message : 'An unknown error occurred while placing the order.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (orderSuccess) {
    return (
      <PageShell title="Order Confirmed!" className="bg-green-50">
        <div className="max-w-2xl mx-auto text-center py-10">
          <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-semibold text-green-700 mb-4">Thank You For Your Order!</h2>
          <p className="text-gray-600 mb-2">
            Your order has been placed successfully.
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Order ID:</strong> <span className="font-mono bg-green-100 px-2 py-1 rounded">{orderSuccess.orderId}</span>
          </p>
           <p className="text-gray-600 mb-6">
            <strong>Order Date:</strong> {new Date(orderSuccess.orderDate).toLocaleString()}
          </p>
          <p className="text-gray-500 mb-8">
            You will receive an email confirmation shortly with your order details.
            (Note: Email functionality is not implemented in this demo).
          </p>
          <Link
            to="/"
            className="bg-slate-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors text-lg shadow-md"
          >
            Continue Shopping
          </Link>
        </div>
      </PageShell>
    );
  }

  const totalItems = getItemCount();

  return (
    <PageShell title="Checkout" className="bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Shipping & Contact Details Form */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">Shipping & Contact Information</h2>
            
            {orderError && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-300 rounded-lg flex items-start">
                <AlertTriangle size={20} className="mr-3 mt-1 flex-shrink-0" />
                <div>
                    <p className="font-semibold">Order Placement Failed</p>
                    <p className="text-sm">{orderError}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" name="customerName" id="customerName" value={formData.customerName} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" name="customerEmail" id="customerEmail" value={formData.customerEmail} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 transition-colors" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
              <input type="tel" name="customerPhone" id="customerPhone" value={formData.customerPhone} onChange={handleInputChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 transition-colors" />
            </div>
            <div className="mb-6">
              <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <textarea name="shippingAddress" id="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} rows={3} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 transition-colors"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 transition-colors" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input type="text" name="country" id="country" value={formData.country} onChange={handleInputChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-slate-500 focus:border-slate-500 transition-colors" />
              </div>
            </div>
             <p className="text-xs text-gray-500 flex items-center mt-2">
                <Lock size={12} className="mr-1.5" /> Your information is secure. We do not store payment details.
            </p>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-6 sm:p-8 rounded-2xl shadow-xl sticky top-28">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-4">Order Summary</h2>
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex justify-between items-center text-sm mb-3 pb-3 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                <div className="flex items-center">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-contain rounded-md mr-3 border p-0.5"/>
                    <div>
                        <span className="font-medium text-gray-700 block">{item.name}</span>
                        <span className="text-gray-500 text-xs">Qty: {item.quantity}</span>
                    </div>
                </div>
                <span className="font-medium text-gray-800">
                  Rs{((item.salePrice !== undefined ? item.salePrice : item.originalPrice) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span>Rs{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 mt-3 pt-3 border-t border-gray-200">
                <span>Order Total</span>
                <span>Rs{getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={isPlacingOrder || cartItems.length === 0}
              className="w-full mt-8 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-lg transition-colors text-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isPlacingOrder ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Placing Order...
                </>
              ) : (
                'Place Order Securely'
              )}
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  );
};

export default CheckoutPage;