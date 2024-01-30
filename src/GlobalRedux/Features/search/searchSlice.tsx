'use client';

import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    value: false,
  },
  reducers: {
    search: (state) => {
      state.value = !state.value;
    },
  },
});
export const { search } = searchSlice.actions;
export default searchSlice.reducer;
