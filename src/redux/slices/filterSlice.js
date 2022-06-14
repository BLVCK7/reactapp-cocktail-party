import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: 0,
  categoryId: 0,
  activeSort: {
    name: 'популярности (по возр.)',
    sortProperty: '-rating',
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setFilters: (state, action) => {
      state.activeSort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setActiveFilter, setActiveSort, setSearch, setFilters, setCategoryId } =
  filterSlice.actions;

export default filterSlice.reducer;
