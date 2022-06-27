import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filterSlice';
import itemsReducer from './slices/itemsSlice';
import cartReducer from './slices/cartSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    items: itemsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
