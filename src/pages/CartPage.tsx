
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  RefreshCw
} from 'lucide-react';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplyingPromo(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false);
      alert('Promo code applied!'); // In a real app, use proper notifications
    }, 1000);
  };
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };
  
  // For demo purposes, shipping is free over $50
  const shippingCost = cartTotal >= 50 ? 0 : 5.99;
  const taxRate = 0.08; // 8% tax
  const taxAmount = cartTotal * taxRate;
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-6 mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="hidden md:flex border-b pb-4 mb-4 text-gray-500">
                <div className="w-2/5">Product</div>
                <div className="w-1/5 text-center">Price</div>
                <div className="w-1/5 text-center">Quantity</div>
                <div className="w-1/5 text-right">Total</div>
              </div>
              
              {items.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex flex-col md:flex-row items-center py-4 border-b last:border-0"
                >
                  <div className="w-full md:w-2/5 flex items-center mb-4 md:mb-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden mr-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 capitalize">
                        {item.product.category}
                      </p>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="flex items-center text-sm text-red-500 mt-1 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/5 flex justify-between md:justify-center items-center mb-4 md:mb-0">
                    <span className="md:hidden text-gray-500">Price:</span>
                    <span className="font-medium">${item.product.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="w-full md:w-1/5 flex justify-between md:justify-center items-center mb-4 md:mb-0">
                    <span className="md:hidden text-gray-500">Quantity:</span>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="px-2 py-1 border-r focus:outline-none"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="px-2 py-1 border-l focus:outline-none"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/5 flex justify-between md:justify-end items-center">
                    <span className="md:hidden text-gray-500">Total:</span>
                    <span className="font-bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cart
                </Button>
                <Link to="/">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Promo Code */}
              <form onSubmit={handleApplyPromo} className="mb-6">
                <p className="text-sm font-medium mb-2">Promo Code</p>
                <div className="flex space-x-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    disabled={!promoCode || isApplyingPromo}
                    className="whitespace-nowrap"
                  >
                    {isApplyingPromo ? "Applying..." : "Apply"}
                  </Button>
                </div>
              </form>
              
              <Link to="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
