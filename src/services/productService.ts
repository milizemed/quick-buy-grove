
import { ProductType, CategoryType } from '@/types/product';

export const products: ProductType[] = [
  {
    id: 1,
    name: "Ultra HD Smart TV",
    description: "Experience stunning 4K resolution and smart features. This Ultra HD Smart TV brings your favorite shows and movies to life with vibrant colors and crisp details. Enjoy streaming apps, voice control, and seamless connectivity.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop",
    category: "electronics",
    rating: 4.5,
    stock: 15,
  },
  {
    id: 2,
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life. These wireless headphones deliver exceptional sound quality while blocking out ambient noise. The comfortable over-ear design and long battery life make them perfect for travel or daily use.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop",
    category: "electronics",
    rating: 4.7,
    stock: 42,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    description: "Soft, sustainable, and stylish everyday tee. This t-shirt is made from 100% organic cotton, providing both comfort and environmental responsibility. The classic fit and durability make it a wardrobe essential.",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop",
    category: "clothing",
    rating: 4.3,
    stock: 80,
  },
  {
    id: 4,
    name: "Stainless Steel Water Bottle",
    description: "Keep drinks hot or cold for up to 24 hours. This durable water bottle is designed with double-wall vacuum insulation to maintain your beverage's temperature. It's leak-proof, BPA-free, and perfect for hydration on the go.",
    price: 34.95,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop",
    category: "accessories",
    rating: 4.8,
    stock: 65,
  },
  {
    id: 5,
    name: "Professional Chef Knife",
    description: "High-carbon stainless steel blade for precision cutting. This professional-grade chef knife features an ergonomic handle for comfortable use and a razor-sharp edge for effortless food preparation. The perfect tool for cooking enthusiasts.",
    price: 89.50,
    image: "https://images.unsplash.com/photo-1567647753830-de3fe7ce9f28?w=800&auto=format&fit=crop",
    category: "kitchen",
    rating: 4.9,
    stock: 20,
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    description: "Fast 15W charging for all Qi-enabled devices. This sleek charging pad eliminates cable clutter while delivering efficient power to your smartphones and earbuds. The non-slip surface keeps devices secure during charging.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&auto=format&fit=crop",
    category: "electronics",
    rating: 4.2,
    stock: 38,
  },
  {
    id: 7,
    name: "Handcrafted Ceramic Mug",
    description: "Artisan-made mug with unique glazed finish. Each mug is individually handcrafted, making it a one-of-a-kind piece. The generous size and comfortable handle make it perfect for your morning coffee or evening tea.",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop",
    category: "kitchen",
    rating: 4.6,
    stock: 25,
  },
  {
    id: 8,
    name: "Leather Laptop Sleeve",
    description: "Premium leather protection for laptops up to 15 inches. This elegant sleeve combines style with functionality, featuring soft interior lining and a secure magnetic closure to keep your device safe. Available in multiple colors.",
    price: 59.95,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop",
    category: "accessories",
    rating: 4.4,
    stock: 18,
  }
];

export const categories: CategoryType[] = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
  { id: "kitchen", name: "Kitchen" }
];

// Get all products
export const getAllProducts = () => {
  return Promise.resolve(products);
};

// Get product by ID
export const getProductById = (id: number) => {
  const product = products.find(p => p.id === id);
  return Promise.resolve(product);
};

// Get products by category
export const getProductsByCategory = (category: string) => {
  if (category === 'all') {
    return Promise.resolve(products);
  }
  const filteredProducts = products.filter(p => p.category === category);
  return Promise.resolve(filteredProducts);
};

// Get all categories
export const getAllCategories = () => {
  return Promise.resolve(categories);
};
