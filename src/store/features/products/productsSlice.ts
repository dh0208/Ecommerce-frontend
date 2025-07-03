
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/api';

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  selectedCategory: 'All',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchProductByIdRequest: (state, action: PayloadAction<number>) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action: PayloadAction<Product>) => {
      state.isLoading = false;
      state.selectedProduct = action.payload;
    },
    fetchProductByIdFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  setSelectedCategory,
  clearSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
