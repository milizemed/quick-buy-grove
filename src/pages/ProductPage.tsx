
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from '@/types/product';
import { getProductById } from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import { 
  ShoppingCart, 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      if (id) {
        const productData = await getProductById(Number(id));
        setProduct(productData || null);
      }
      setLoading(false);
    };
    
    loadProduct();
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-1/2 aspect-square rounded-lg" />
            <div className="w-full md:w-1/2 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, the product you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link to={`/?category=${product.category}`} className="text-gray-500 hover:text-primary capitalize">
            {product.category}
          </Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating} ({Math.floor(product.rating * 10)} reviews)</span>
            </div>
            
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <span className="text-gray-600 mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="px-3 py-1 border-r focus:outline-none disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  className="px-3 py-1 border-l focus:outline-none disabled:opacity-50"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="ml-4 text-gray-500">
                {product.stock} items available
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                className="flex-1 gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Link to="/checkout" className="flex-1">
                <Button 
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Buy Now
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Free shipping</h3>
                  <p className="text-sm text-gray-500">Free shipping on orders over $50</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Secure payment</h3>
                  <p className="text-sm text-gray-500">Your data is protected</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Easy returns</h3>
                  <p className="text-sm text-gray-500">30 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-6">
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-600 mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam vel tincidunt ullamcorper, nisl nunc ultricies nisi, vel tincidunt nisl nunc vel nisl. Sed euismod, diam vel tincidunt ullamcorper, nisl nunc ultricies nisi, vel tincidunt nisl nunc vel nisl.
              </p>
            </TabsContent>
            <TabsContent value="specifications" className="py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b pb-2">
                  <span className="font-medium">Category:</span> <span className="capitalize">{product.category}</span>
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Stock:</span> {product.stock} items
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">Rating:</span> {product.rating} out of 5
                </div>
                <div className="border-b pb-2">
                  <span className="font-medium">SKU:</span> PRD-{product.id.toString().padStart(5, '0')}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="py-6">
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">Amazing product!</span>
                </div>
                <p className="text-gray-600 text-sm">
                  This is exactly what I was looking for. Great quality and fast shipping!
                </p>
                <p className="text-gray-500 text-xs mt-1">John D. - 2 weeks ago</p>
              </div>
              
              <div className="border-b pb-4 mb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">Good value</span>
                </div>
                <p className="text-gray-600 text-sm">
                  The product is good for the price. Would recommend to others.
                </p>
                <p className="text-gray-500 text-xs mt-1">Sarah M. - 1 month ago</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
