import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from './ProductCard';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setSelectedCategory } from '../store/features/products/productsSlice';
import { categoriesAPI } from '../services/api';

interface Category {
  id: number;
  name: string;
  Products: any[];
}

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state) => state.products);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    categoriesAPI.getAll()
      .then(res => {
        setCategories(res.data);
        // Flatten all products from all categories
        const all = res.data.flatMap((cat: Category) => cat.Products);
        setAllProducts(all);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load categories');
        setIsLoading(false);
      });
  }, []);

  let filteredProducts = allProducts;
  if (selectedCategory !== 'All') {
    const cat = categories.find(c => c.name === selectedCategory);
    filteredProducts = cat ? cat.Products : [];
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'outline'}
            onClick={() => dispatch(setSelectedCategory('All'))}
            className={`${
              selectedCategory === 'All' 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All Products
            <Badge variant="secondary" className="ml-2">
              {allProducts.length}
            </Badge>
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? 'default' : 'outline'}
              onClick={() => dispatch(setSelectedCategory(category.name))}
              className={`${
                selectedCategory === category.name 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.Products.length}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
