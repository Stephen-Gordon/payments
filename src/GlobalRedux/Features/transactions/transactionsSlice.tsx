'use client';

import { createSlice } from '@reduxjs/toolkit';

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    value: {},
  },
  reducers: {
    setTransactions: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
