
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ordersAPI } from '../../../services/api';
import { OrderRequest } from '../../../types/api';
import {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
} from './ordersSlice';
import { clearCart } from '../cart/cartSlice';

function* handlePlaceOrder(action: PayloadAction<OrderRequest>) {
  try {
    const response = yield call(ordersAPI.placeOrder, action.payload);
    yield put(placeOrderSuccess(response.data.orderId));
    yield put(clearCart());
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to place order';
    yield put(placeOrderFailure(errorMessage));
  }
}

export default function* ordersSaga() {
  yield takeEvery(placeOrderRequest.type, handlePlaceOrder);
}
