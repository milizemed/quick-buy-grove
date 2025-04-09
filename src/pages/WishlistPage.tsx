
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-6 mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">
            You haven't added any items to your wishlist yet.
          </p>
          <Link to="/">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 backdrop-blur-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              
              <div className="p-4">
                <Link to={`/product/${product.id}`} className="block">
                  <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <p className="mt-1 text-lg font-bold">${product.price.toFixed(2)}</p>
                
                <Button 
                  className="mt-3 w-full gap-1"
                  size="sm"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <Link to="/">
            <Button variant="outline" className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
