import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppDispatch } from '@/hooks';
import { addToCartRequest } from '@/store/features/cart/cartSlice'; // Make sure this is a thunk, not a saga action
import { productsAPI } from '@/services/api';
import { Product } from '../types/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    productsAPI.getById(Number(id))
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Product not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/')}>Go Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await dispatch(addToCartRequest({ productId: product.id, quantity: 1 }));
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        duration: 2000,
      });
      navigate('/cart');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    }
  };

  const discountPercentage = product.discountedPrice
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col md:flex-row gap-8 p-8">
            <img
              src={product.product_image}
              alt={product.name}
              className="w-full md:w-80 h-80 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">{product.name}</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500 text-white">{product.category}</Badge>
              </div>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex items-center gap-4">
                {product.price ? (
                  <>
                    <span className="text-2xl font-bold text-green-600">
                      ${product.price}
                    </span>

                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-800">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium"
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={async () => {
                    await dispatch(addToCartRequest({ productId: product.id, quantity: 1 }));
                    navigate('/checkout');
                  }}
                  className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium"
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
