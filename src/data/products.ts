
import { Product } from '../contexts/CartContext';

export const products: Product[] = [
  // Electronics Category
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    category: "Electronics",
    originalPrice: 2499,
    discountedPrice: 2199,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500",
    description: "Powerful laptop with M2 chip, perfect for professional work and creative tasks. Features stunning Retina display and all-day battery life."
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    category: "Electronics",
    originalPrice: 999,
    discountedPrice: 899,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
    description: "Latest iPhone with advanced camera system, titanium design, and powerful A17 Pro chip for exceptional performance."
  },
  {
    id: 3,
    name: "Dell XPS 13",
    category: "Electronics",
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
    description: "Ultra-portable laptop with stunning InfinityEdge display and premium build quality. Perfect for professionals on the go."
  },
  {
    id: 4,
    name: "iPad Pro 12.9",
    category: "Electronics",
    originalPrice: 1099,
    discountedPrice: 999,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500",
    description: "Revolutionary tablet with M2 chip and Liquid Retina XDR display. Ideal for creative professionals and productivity."
  },
  
  // Fashion Category
  {
    id: 5,
    name: "Designer Leather Jacket",
    category: "Fashion",
    originalPrice: 299,
    discountedPrice: 199,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
    description: "Premium genuine leather jacket with modern cut and timeless style. Perfect for any season and occasion."
  },
  {
    id: 6,
    name: "Casual Summer Dress",
    category: "Fashion",
    originalPrice: 89,
    discountedPrice: 59,
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500",
    description: "Lightweight, breathable summer dress with elegant floral pattern. Comfortable and stylish for warm weather."
  },
  {
    id: 7,
    name: "Classic Denim Jeans",
    category: "Fashion",
    originalPrice: 79,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500",
    description: "High-quality denim jeans with perfect fit and durability. A wardrobe essential for everyday wear."
  },
  {
    id: 8,
    name: "Luxury Watch",
    category: "Fashion",
    originalPrice: 599,
    discountedPrice: 449,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    description: "Elegant timepiece with Swiss movement and premium materials. A statement accessory for any outfit."
  },

  // Home Category
  {
    id: 9,
    name: "Smart Home Hub",
    category: "Home",
    originalPrice: 199,
    discountedPrice: 149,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=500",
    description: "Central control hub for all your smart home devices. Easy setup and intuitive voice control."
  },
  {
    id: 10,
    name: "Ergonomic Office Chair",
    category: "Home",
    originalPrice: 349,
    discountedPrice: 279,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
    description: "Premium office chair with lumbar support and adjustable features. Designed for all-day comfort and productivity."
  }
];

export const categories = [...new Set(products.map(product => product.category))];
