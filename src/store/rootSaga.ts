
import { all, fork } from 'redux-saga/effects';
import authSaga from './features/auth/authSaga';
import productsSaga from './features/products/productsSaga';
import cartSaga from './features/cart/cartSaga';
import ordersSaga from './features/orders/ordersSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(productsSaga),
    fork(cartSaga),
    fork(ordersSaga),
  ]);
}
