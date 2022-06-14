import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
  cartItems: [],
  itemCount: '0',
  totalCount: '0',
  itemPrice: '0',
  totalPrice: '0',
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addItemToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});

export const { setLoading, setItems, addItemToCart, setTotalPrice } = itemsSlice.actions;

export default itemsSlice.reducer;
