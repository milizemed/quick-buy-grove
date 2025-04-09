
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { ProductType } from '@/types/product';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden group relative">
      <button
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1.5 backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity"
        aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
      </button>
      
      <Link to={`/product/${product.id}`} className="overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 capitalize">{product.category}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mt-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-2 text-gray-600 line-clamp-2 text-sm">{product.description}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
        <Button 
          size="sm" 
          onClick={() => addToCart(product)}
          className="gap-1"
        >
          <ShoppingCart className="h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
