import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAppSelector, useAppDispatch } from '../hooks';
import { clearCart } from '../store/features/cart/cartSlice';
import { useToast } from '@/hooks/use-toast';
import { ordersAPI } from '../services/api';

interface OrderForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  notes: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const cart = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<OrderForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<OrderForm>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderForm]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderForm> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please correct the errors",
        description: "Check the form for any missing or invalid information.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Submitting order with data:', cart, user, formData);
      // Build order items for backend
      const orderItems = cart.items.map(item => ({
        productId: item.product.id,
        categoryId: typeof item.product.category === 'number' ? item.product.category : 0,
        userId: user?.id, // userId must be here
        price: item.product.price,
        quantity: item.quantity
      }));
      const orderData = {
        items: orderItems,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          notes: formData.notes,
        },
      };

      console.log('Order submitted:', orderData);

      // Simulate API call
      await ordersAPI.placeOrder(orderData);

      dispatch(clearCart());
      toast({
        title: "Order placed successfully!",
        description: `Your order of $${cart?.total} has been confirmed.`,
        duration: 5000,
      });

      navigate('/order-success');
    } catch (error) {
      toast({
        title: "Order failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.items?.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Items to Checkout</h2>
          <p className="text-gray-600 mb-6">Add some products to your cart first!</p>
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customer Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? 'border-red-500' : ''}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className={errors.zipCode ? 'border-red-500' : ''}
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for your order..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cart?.items?.map((item) => (
                      <div key={item.id} className="flex justify-between items-start text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium">
                          ${((item.product.discountedPrice || item.product.originalPrice) * item.quantity)?.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${cart?.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-green-600">${cart.total}</span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/cart')}
                      className="w-full"
                    >
                      Back to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
