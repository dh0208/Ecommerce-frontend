
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderRequest } from '../../../types/api';

interface OrdersState {
  isLoading: boolean;
  error: string | null;
  lastOrderId: string | null;
}

const initialState: OrdersState = {
  isLoading: false,
  error: null,
  lastOrderId: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrderRequest: (state, action: PayloadAction<OrderRequest>) => {
      state.isLoading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.lastOrderId = action.payload;
    },
    placeOrderFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
});

export const {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  clearOrderError,
} = ordersSlice.actions;

export default ordersSlice.reducer;
