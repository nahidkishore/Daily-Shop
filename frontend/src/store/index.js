import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import globalReducer from './reducers/globalReducer';
import authService from './services/authService';
import categoryService from './services/categoryService';
import homeProducts from './services/homeProducts';
import productService from './services/productService';
const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    [productService.reducerPath]: productService.reducer,
    [homeProducts.reducerPath]: homeProducts.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat([categoryService.middleware, productService.middleware]),
});

export default Store;
