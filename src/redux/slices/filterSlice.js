import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeFilter: 0,
  categoryId: 0,
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
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setFilters: (state, action) => {
      console.log(action);
      state.activeFilter = Number(action.payload.activeFilter);
      state.activeSort.type = action.payload.sortType.type;
      state.activeSort.order = action.payload.sortOrder.order;
    },
  },
});

export const { setActiveFilter, setActiveSort, setSearch, setFilters, setCategoryId } =
  filterSlice.actions;

export default filterSlice.reducer;
