
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '../types/api';
import { useAppDispatch } from '../hooks';
import { addToCartRequest } from '../store/features/cart/cartSlice';
import { useToast } from '@/hooks/use-toast';
// import handleAddToCart  from '../store/features/cart/cartSaga';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const AddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {

      await dispatch(addToCartRequest({ productId: product.id, quantity: 1 }));
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        duration: 2000,
      });
      navigate('/cart'); // Redirect to cart page after adding
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const discountPercentage = product.discountedPrice
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <Card
      className="group flex flex-col cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 bg-white border-0 shadow-md overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.product_image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {product.discountedPrice && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mb-3">
          {product.price ? (
            <>
              <span className="text-xl font-bold text-green-600">
                ${product.price}
              </span>
              {/* <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span> */}
            </>
          ) : (
            <span className="text-xl font-bold text-gray-800">
              ${product.discountedPrice}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          onClick={AddToCart}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
