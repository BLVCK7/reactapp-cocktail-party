import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const fetchItemsThunk = createAsyncThunk('items/fetchItemsStatus', async (params) => {
  const { sortBy, order, category, search } = params;
  const response = await axios.get(
    `https://628f8bb5dc47852365428e7e.mockapi.io/items?${
      search === '' ? '' : `search=${search}&`
    }${category}&sortBy=${sortBy}&order=${order}`,
  );
  return response.data;
});

type itemsType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  color: string;
}

interface itemsSliceState {
  items: itemsType[],
  status: 'loading' | 'success' | 'rejected',
}

const initialState: itemsSliceState = {
  items: [],
  status: 'loading',
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: {
    [fetchItemsThunk.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchItemsThunk.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchItemsThunk.rejected]: (state) => {
      state.status = 'rejected';
      state.items = [];
    },
  },
});

export const selectItems = (state: RootState) => state.items;

export const { setItems, setLoading } = itemsSlice.actions;

export default itemsSlice.reducer;
