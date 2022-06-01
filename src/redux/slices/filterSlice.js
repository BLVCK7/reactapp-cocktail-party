import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: 0,
  activeSort: {
    name: 'популярности (ASC)',
    type: 'rating',
    order: 'asc',
  },
  search: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    setActiveSort: (state, action) => {
      state.activeSort = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setActiveFilter, setActiveSort, setSearch } = filterSlice.actions;

export default filterSlice.reducer;
