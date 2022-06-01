import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://628f8bb5dc47852365428e7e.mockapi.io/' }),
  endpoints: (builder) => ({
    fetchItems: builder.query({
      query: (activeSort, activeFilter, search) =>
        `items?${search === '' ? '' : `search=${search}&`}${
          activeFilter > 0 ? `category=${activeFilter}` : ''
        }&sortBy=${activeSort.type}&order=${activeSort.order}`,
    }),
  }),
});
