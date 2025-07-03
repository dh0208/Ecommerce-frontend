
import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../../services/api';
import { LoginRequest } from '../../../types/api';
import { loginRequest, loginSuccess, loginFailure, logout } from './authSlice';

function* handleLogin(action: PayloadAction<LoginRequest>) {
  try {
    const response = yield call(authAPI.login, action.payload);
    const { token, user } = response.data;
    
    localStorage.setItem('authToken', token);
    yield put(loginSuccess({ user, token }));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed';
    yield put(loginFailure(errorMessage));
  }
}

function* handleLogout() {
  localStorage.removeItem('authToken');
}

export default function* authSaga() {
  yield takeEvery(loginRequest.type, handleLogin);
  yield takeEvery(logout.type, handleLogout);
}
