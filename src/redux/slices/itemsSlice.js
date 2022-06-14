import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  isLoading: false,
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
  },
});

export const { setLoading, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
