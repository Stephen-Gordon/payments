'use client';

import { createSlice } from '@reduxjs/toolkit';

export const sheetSlice = createSlice({
  name: 'sheet',
  initialState: {
    value: false,
  },
  reducers: {
    setSheet: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setSheet } = sheetSlice.actions;
export default sheetSlice.reducer;
