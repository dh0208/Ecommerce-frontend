
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { productsAPI } from '../../../services/api';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdRequest,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} from './productsSlice';

function* handleFetchProducts() {
  try {
    const response = yield call(productsAPI.getAll);
    yield put(fetchProductsSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch products';
    yield put(fetchProductsFailure(errorMessage));
  }
}

function* handleFetchProductById(action: PayloadAction<number>) {
  try {
    const response = yield call(productsAPI.getById, action.payload);
    yield put(fetchProductByIdSuccess(response.data));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch product';
    yield put(fetchProductByIdFailure(errorMessage));
  }
}

export default function* productsSaga() {
  yield takeEvery(fetchProductsRequest.type, handleFetchProducts);
  yield takeEvery(fetchProductByIdRequest.type, handleFetchProductById);
}
