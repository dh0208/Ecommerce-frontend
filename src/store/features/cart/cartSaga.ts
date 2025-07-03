import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { cartAPI } from '../../../services/api';
import {
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  addToCartRequest,
  updateCartItemRequest,
  removeFromCartRequest,
  cartOperationSuccess,
  cartOperationFailure,
} from './cartSlice';

function* handleFetchCart() {
  try {
    const response = yield call(cartAPI.get);
    yield put(fetchCartSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch cart';
    yield put(fetchCartFailure(errorMessage));
  }
}

function* handleAddToCart(action: PayloadAction<{ productId: number; quantity: number }>) {
  try {
    const { productId, quantity } = action.payload;
    // Call the correct add-to-cart API endpoint
    const response = yield call(cartAPI.addItem, productId, quantity);
    yield put(cartOperationSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to add to cart';
    yield put(cartOperationFailure(errorMessage));
  }
}

function* handleUpdateCartItem(action: PayloadAction<{ productId: number; quantity: number }>) {
  try {
    const { productId, quantity } = action.payload;
    const response = yield call(cartAPI.updateItem, productId, quantity);
    yield put(cartOperationSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to update cart item';
    yield put(cartOperationFailure(errorMessage));
  }
}

function* handleRemoveFromCart(action: PayloadAction<number>) {
  try {
    const response = yield call(cartAPI.removeItem, action.payload);
    yield put(cartOperationSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to remove from cart';
    yield put(cartOperationFailure(errorMessage));
  }
}

export default function* cartSaga(p0: { productId: number; quantity: number; }) {
  yield takeEvery(fetchCartRequest.type, handleFetchCart);
  yield takeEvery(addToCartRequest.type, handleAddToCart);
  yield takeEvery(updateCartItemRequest.type, handleUpdateCartItem);
  yield takeEvery(removeFromCartRequest.type, handleRemoveFromCart);
}
