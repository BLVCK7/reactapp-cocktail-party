import { calcTotalCount } from './../../utils/calcTotalCount';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItemsType = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    count: number;
    color: string
}

interface cartSliceState {
  totalPrice: number;
  totalCount: number;
  cartItems: CartItemsType[];
}

const {cartItems, totalPrice, totalCount} = getCartFromLS()

const initialState: cartSliceState = {
  cartItems,
  totalPrice,
  totalCount,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAddItem: (state, action: PayloadAction<CartItemsType>) => {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.cartItems)
      state.totalCount = calcTotalCount(state.cartItems)
    },
    setMinusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.cartItems)
      state.totalCount = calcTotalCount(state.cartItems)
    },
    setRemoveItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.cartItems)
      state.totalCount = calcTotalCount(state.cartItems)
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
