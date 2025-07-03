import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { cartAPI } from '@/services/api';
import { fetchCartSuccess, fetchCartFailure } from '@/store/features/cart/cartSlice';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state) => state.cart);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch cart from API on mount
    const fetchCart = async () => {

      await cartAPI.get()
        .then(res => {
          dispatch(fetchCartSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchCartFailure('Failed to fetch cart'));
        });
    }

    fetchCart();
  }, []);
  

  const handleQuantityChange =  useCallback(

    async(id: number, newQuantity: number) => {
     try {
     if (newQuantity < 1) {
       await handleRemoveItem(id);
       return;
     }
       await cartAPI.updateItem(id, newQuantity);
       const res = await cartAPI.get();
       dispatch(fetchCartSuccess(res.data));
       toast({
         title: 'Cart updated',
         description: 'Quantity updated.',
         duration: 2000,
       });
     } catch (err) {
       toast({
         title: 'Error',
         description: 'Failed to update quantity.',
         variant: 'destructive',
       });
     }
   },[]
  )

  const handleRemoveItem = async (id: number) => {
    try {
      await cartAPI.removeItem(id);
      // Fetch the updated cart after successful deletion
      const res = await cartAPI.get();
      dispatch(fetchCartSuccess(res.data));
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your cart.',
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to remove item.',
        variant: 'destructive',
      });
    }
  };

  if (items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items?.map((item) => {
              return <Card key={item.id} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <img
                      src={item.product.product_image}
                      alt={item.product.name}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                    />

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.product.category}</p>

                      <div className="flex items-center gap-2">
                        {item.product.discountedPrice ? (
                          <>
                            <span className="font-bold text-green-600">
                              ${item.product.discountedPrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${item.product.originalPrice}
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-gray-800">
                            ${item.product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between sm:flex-col sm:justify-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 0)}
                          className="w-16 text-center h-8"
                          min="0"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items && items.length && items?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        ${((item.product.discountedPrice || item.product.originalPrice) * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-green-600">${total?.toFixed(2)}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
