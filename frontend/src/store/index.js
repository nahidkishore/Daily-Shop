import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import cartReducer from './reducers/cartReducer';
import globalReducer from './reducers/globalReducer';
import authService from './services/authService';
import categoryService from './services/categoryService';
import homeProducts from './services/homeProducts';
import paymentService from './services/paymentService';
import productService from './services/productService';
const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    [paymentService.reducerPath]: paymentService.reducer,
   
    authReducer: authReducer,
    globalReducer: globalReducer,
    cartReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat([
      categoryService.middleware,
      productService.middleware,
      homeProducts.middleware,
      paymentService.middleware,
    ]),
});

export default Store;
