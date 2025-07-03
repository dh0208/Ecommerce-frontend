
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            You will receive an email confirmation with your order details.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
