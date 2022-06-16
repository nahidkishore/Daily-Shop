import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import globalReducer from './reducers/globalReducer';
import authService from './services/authService';
import categoryService from './services/categoryService';
const Store = configureStore({
  reducer: {
    [authService.reducerPath]: authService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
    authReducer: authReducer,
    globalReducer: globalReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat([categoryService.middleware]),
});

export default Store;
