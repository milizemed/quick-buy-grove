
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 mt-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About QuickBuy</h3>
            <p className="text-gray-600 mb-4">
              We offer high-quality products at competitive prices with exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-gray-600 hover:text-primary transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?category=electronics" className="text-gray-600 hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/?category=clothing" className="text-gray-600 hover:text-primary transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/?category=accessories" className="text-gray-600 hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/?category=kitchen" className="text-gray-600 hover:text-primary transition-colors">
                  Kitchen
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Mail size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-600">support@quickbuy.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} QuickBuy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
