
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductType, CategoryType } from '@/types/product';
import { getAllProducts, getAllCategories, getProductsByCategory } from '@/services/productService';

const HomePage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  
  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    };
    
    loadCategories();
  }, []);
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      let productsData;
      
      if (currentCategory === 'all') {
        productsData = await getAllProducts();
      } else {
        productsData = await getProductsByCategory(currentCategory);
      }
      
      setProducts(productsData);
      setLoading(false);
    };
    
    loadProducts();
  }, [currentCategory]);
  
  const handleCategoryChange = (categoryId: string) => {
    setSearchParams(categoryId === 'all' ? {} : { category: categoryId });
  };
  
  const featuredProducts = products.slice(0, 3);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shop Smart, <span className="text-primary">Shop Easy</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Discover amazing products with free shipping and hassle-free returns.
              </p>
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                Shop Now
              </Button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="grid grid-cols-2 gap-4">
                {featuredProducts.length > 0 ? (
                  <>
                    <div className="col-span-2">
                      <img
                        src={featuredProducts[0]?.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}
                        alt="Featured Product"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                    </div>
                    <img
                      src={featuredProducts[1]?.image || 'https://images.unsplash.com/photo-1581655353564-df123a1eb820'}
                      alt="Featured Product"
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                    <img
                      src={featuredProducts[2]?.image || 'https://images.unsplash.com/photo-1602143407151-7111542de6e8'}
                      alt="Featured Product"
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  </>
                ) : (
                  <>
                    <Skeleton className="col-span-2 h-48 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg" />
                    <Skeleton className="h-32 rounded-lg" />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={category.id === currentCategory ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            {categories.find(c => c.id === currentCategory)?.name || 'All Products'}
          </h2>
          
          {loading ? (
            <div className="product-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-9 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 mb-4">No products found in this category.</p>
              <Button
                onClick={() => handleCategoryChange('all')}
                className="rounded-full"
              >
                View All Products
              </Button>
            </div>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We ensure all our products meet high quality standards.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Get your order delivered quickly and efficiently.</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Your payment information is always safe with us.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
