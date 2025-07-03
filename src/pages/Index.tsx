
import React from 'react';
import ProductList from '../components/ProductList';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to EShop
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing products at unbeatable prices
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
            <p className="text-lg font-medium">🚚 Free shipping on all orders</p>
            <p className="text-sm text-blue-100 mt-2">30-day return policy • Secure checkout</p>
          </div>
        </div>
      </div>

      {/* Product Listings */}
      <ProductList />
    </div>
  );
};

export default Index;
