
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { ProductType } from '@/types/product';

type WishlistContextType = {
  wishlist: ProductType[];
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  
  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error parsing wishlist data from localStorage', e);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  const addToWishlist = (product: ProductType) => {
    if (isInWishlist(product.id)) {
      return;
    }
    
    setWishlist(prevItems => [...prevItems, product]);
    toast.success(`Added ${product.name} to wishlist`);
  };
  
  const removeFromWishlist = (productId: number) => {
    setWishlist(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.name} from wishlist`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };
  
  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };
  
  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
