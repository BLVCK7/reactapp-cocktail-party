import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import itemsReducer from './slices/itemsSlice';
import cartReducer from './slices/cartSlice';
import { itemsApi } from './services/itemsService';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    items: itemsReducer,
    cart: cartReducer,
    // [itemsApi.reducerPath]: itemsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware),
});
