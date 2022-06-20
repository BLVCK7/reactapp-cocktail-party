import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CartItemsType = {
    id: number;
    price: number;
    count: number;
}

interface cartSliceState {
  totalPrice: number;
  totalCount: number;
  cartItems: CartItemsType[];
}

const initialState: cartSliceState = {
  cartItems: [],
  totalPrice: 0,
  totalCount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAddItem: (state, action) => {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.cartItems.reduce((sum, item) => sum + item.count, 0);
    },
    setMinusItem: (state, action) => {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.cartItems.reduce((sum, item) => sum + item.count, 0);
    },
    setRemoveItem: (state, action) => {
      state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload);

      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.cartItems.reduce((sum, item) => sum + item.count, 0);
    },
    setClearItem: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { setAddItem, setRemoveItem, setClearItem, setMinusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
