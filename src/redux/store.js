import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import itemsReducer from './slices/itemsSlice';
import { itemsApi } from './services/itemsService';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    items: itemsReducer,
    // [itemsApi.reducerPath]: itemsApi.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsApi.middleware),
});
