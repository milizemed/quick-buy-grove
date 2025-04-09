
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Menu, ShoppingCart, X, Search, Heart, User } from 'lucide-react';
import SearchBar from './SearchBar';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-primary">
            ShopEasy
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              to="/cart" 
              className={`text-sm font-medium ${isActive('/cart') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Shop
            </Link>
            <Link 
              to="/account" 
              className={`text-sm font-medium ${isActive('/account') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Account
            </Link>
          </nav>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative" 
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/account">
              <Button variant="ghost" size="sm" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSearch}
              className="relative"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        {searchOpen && (
          <div className="py-3 border-t">
            <SearchBar className="max-w-md mx-auto" />
          </div>
        )}
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/"
                className={`px-4 py-2 text-sm font-medium ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/cart"
                className={`px-4 py-2 text-sm font-medium ${isActive('/cart') ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/account"
                className={`px-4 py-2 text-sm font-medium ${isActive('/account') ? 'bg-primary/10 text-primary' : 'text-gray-600'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Account
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
