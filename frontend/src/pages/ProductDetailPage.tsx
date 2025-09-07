// src/pages/ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'; // Added useLocation
import PageShell from '../components/common/PageShell';
import { useCart } from '../contexts/CartContext';
import { ProductCardData } from '../components/ProductCard'; // Use the specific type from ProductCard
import { Star, ShoppingCart, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation(); // Get location object
  const { addToCart, isInCart } = useCart();

  // The product state will now hold ProductCardData type
  const [product, setProduct] = useState<ProductCardData | null>(null);
  const [loading, setLoading] = useState(true); // Keep loading state for initial setup
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Attempt to get productData from route state
    const routeState = location.state as { productData?: ProductCardData };
    
    if (routeState?.productData && String(routeState.productData.id) === productId) {
      setProduct(routeState.productData);
      setLoading(false);
    } else {
      // Fallback: If state is not available (e.g., direct navigation, refresh)
      // This is where it gets tricky without a central data store or backend fetch.
      // For now, we'll show a "product not found" or "data unavailable" message.
      // A more robust solution would involve a ProductContext or fetching from a consolidated frontend data source.
      console.warn("Product data not found in route state for ID:", productId, "State:", routeState);
      setError("Product details are currently unavailable. This might happen if you refreshed the page or navigated directly. Please try navigating from a product listing.");
      setProduct(null); // Ensure product is null if not found
      setLoading(false);
    }
  }, [productId, location.state]);


  const handleAddToCart = () => {
    if (!product || isAddingToCart || isBuyingNow) return;
    setIsAddingToCart(true);
    // 'product' is already DisplayProductData which extends ProductType
    addToCart(product);
    setTimeout(() => {
        setIsAddingToCart(false);
        navigate('/cart');
    }, 1000);
  };

  const handleBuyNow = () => {
    if (!product || isAddingToCart || isBuyingNow) return;
    setIsBuyingNow(true);
    addToCart(product);
    setTimeout(() => {
        setIsBuyingNow(false);
        navigate('/checkout');
    }, 500);
  };

  if (loading) {
    return (
      <PageShell title="Loading Product...">
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loader2 className="w-16 h-16 animate-spin text-slate-700" />
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell title="Error">
        <div className="text-center py-10">
          <p className="text-xl text-red-600">{error}</p>
          <Link to="/" className="mt-4 inline-block bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-600">
            Go to Homepage
          </Link>
        </div>
      </PageShell>
    );
  }

  if (!product) {
    return (
      <PageShell title="Product Not Found">
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">The product you are looking for could not be loaded. Please try navigating from a product list.</p>
           <Link to="/" className="mt-4 inline-block bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-600">
            Go to Homepage
          </Link>
        </div>
      </PageShell>
    );
  }

  // Now using fields directly from 'product' which is ProductCardData
  const productIsInCart = isInCart(product.id);
  const displayPrice = product.salePrice !== undefined ? product.salePrice : product.originalPrice;
  const hasDiscount = product.salePrice !== undefined && product.originalPrice > product.salePrice;

  return (
    <PageShell title={product.name}>
      <div className="max-w-5xl mx-auto">
        <button
            onClick={() => navigate(-1)}
            className="mb-8 inline-flex items-center text-sm text-slate-600 hover:text-slate-800 hover:underline"
        >
            <ArrowLeft size={16} className="mr-1.5" />
            Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
            
            {typeof product.rating === 'number' && product.rating > 0 && (
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">({product.rating.toFixed(1)} rating)</span>
              </div>
            )}

            <p className="text-gray-600 leading-relaxed text-md">{product.description}</p>

            <div className="flex items-baseline space-x-3 my-4">
              <span className="text-3xl font-bold text-slate-800">
                Rs{displayPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  Rs{product.originalPrice.toLocaleString()}
                </span>
              )}
              {/* Use product.discountPercentText if available from ProductCardData */}
              {product.discountPercentText && hasDiscount && (
                 <span className="text-sm font-semibold text-green-600 bg-green-100 px-2.5 py-1 rounded-md">
                    {product.discountPercentText}
                </span>
              )}
            </div>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Available Colors:</p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <span
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></span>
                  ))}
                </div>
              </div>
            )}
            
             <p className="text-sm text-gray-500">
                Category: <Link to={`/${product.category.toLowerCase()}`} className="text-slate-600 hover:underline">{product.category}</Link>
            </p>

            <div className="mt-8 pt-6 border-t space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={productIsInCart || isAddingToCart || isBuyingNow}
                className={`w-full font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg
                  ${productIsInCart
                    ? 'bg-green-100 text-green-700 border border-green-300 cursor-default'
                    : isAddingToCart || isBuyingNow
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700 text-white shadow-md hover:shadow-lg'
                  }`}
              >
                {productIsInCart ? (
                  <><CheckCircle size={20} /> Added to Cart</>
                ) : isAddingToCart ? (
                  <><Loader2 className="animate-spin" size={20} /> Adding...</>
                ) : (
                  <><ShoppingCart size={20} /> Add to Cart</>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isAddingToCart || isBuyingNow}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3.5 px-6 rounded-lg transition-colors text-lg shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                 {isBuyingNow ? (
                  <><Loader2 className="animate-spin" size={20} /> Processing...</>
                ) : (
                 "Buy Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ProductDetailPage;