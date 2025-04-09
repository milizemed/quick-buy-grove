
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, Menu, X, Search, User, ShoppingBag 
} from 'lucide-react';

const Header = () => {
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">QuickBuy</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/?category=electronics" className="text-gray-600 hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link to="/?category=clothing" className="text-gray-600 hover:text-primary transition-colors">
              Clothing
            </Link>
            <Link to="/?category=accessories" className="text-gray-600 hover:text-primary transition-colors">
              Accessories
            </Link>
            <Link to="/?category=kitchen" className="text-gray-600 hover:text-primary transition-colors">
              Kitchen
            </Link>
          </nav>
          
          {/* Search, Cart, Account */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search products..."
                className="py-1 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute right-3 h-5 w-5 text-gray-400" />
            </div>
            
            <Link to="/account" className="hidden md:flex text-gray-600 hover:text-primary transition-colors">
              <User className="h-6 w-6" />
            </Link>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-2 border-t mt-4">
            <Link 
              to="/"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/?category=electronics"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link 
              to="/?category=clothing"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clothing
            </Link>
            <Link 
              to="/?category=accessories"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accessories
            </Link>
            <Link 
              to="/?category=kitchen"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kitchen
            </Link>
            <Link 
              to="/account"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My Account
            </Link>
            <div className="flex items-center relative px-4 py-2">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-1 px-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute right-7 h-5 w-5 text-gray-400" />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
