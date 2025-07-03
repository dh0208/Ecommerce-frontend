
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  discountedPrice?: number;
  price:number;
  product_image: string;
  description: string;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface OrderRequest {
  items: Array<{
    productId: number;
    quantity: number;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    notes?: string;
  };
}

export interface ApiError {
  message: string;
  status: number;
}
