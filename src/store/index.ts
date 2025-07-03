
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authSlice from './features/auth/authSlice';
import productsSlice from './features/products/productsSlice';
import cartSlice from './features/cart/cartSlice';
import ordersSlice from './features/orders/ordersSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    cart: cartSlice,
    orders: ordersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
