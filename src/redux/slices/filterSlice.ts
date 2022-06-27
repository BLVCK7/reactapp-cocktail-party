import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  NAME_DESC = 'name',
  NAME_ASC = '-name'
}

export type ActiveSortType = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export interface filterSliceState {
  categoryId: number;
  activeSort: ActiveSortType;
  search: string;
}

const initialState: filterSliceState = {
  categoryId: 0,
  activeSort: {
    name: 'популярности (по возр.)',
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  search: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveSort: (state, action: PayloadAction<ActiveSortType>) => {
      state.activeSort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setFilters: (state, action: PayloadAction<filterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId)
        state.activeSort = action.payload.activeSort;
      } else {
        state.categoryId = 0
        state.activeSort = {
          name: 'популярности (по возр.)',
          sortProperty: SortPropertyEnum.RATING_ASC,
        }
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;

export const { setActiveSort, setSearch, setFilters, setCategoryId } =
  filterSlice.actions;

export default filterSlice.reducer;
