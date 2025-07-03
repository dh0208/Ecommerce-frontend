import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../../../types/api';

interface CartState {
  items: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCartRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      // Transform backend cart items to match CartItem type in Redux
      state.items = (action.payload || []).map((item: any) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          id: item.product.id,
          name: item.product.name,
          category: '', // You may want to fetch category name if needed
          originalPrice: item.product.price,
          discountedPrice: undefined, // Add logic if you have discounts
          product_image: item.product.product_image,
          description: item.product.description,
        },
      }));
      state.total = state.items.reduce((acc, item) => acc + (item.product.discountedPrice || item.product.originalPrice) * item.quantity, 0);
    },
    fetchCartFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addToCartRequest: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      state.isLoading = true;
      state.error = null;
    },
    updateCartItemRequest: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      state.isLoading = true;
      state.error = null;
    },
    removeFromCartRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.error = null;
    },
    cartOperationSuccess: (state, action: PayloadAction<Cart>) => {
      state.isLoading = false;
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    cartOperationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartRequest,
  updateCartItemRequest,
  removeFromCartRequest,
  cartOperationSuccess,
  cartOperationFailure,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
