'use client';

import { createSlice } from '@reduxjs/toolkit';

export const pendingTxSlice = createSlice({
  name: 'pendingTx',
  initialState: {
    value: {},
  },
  reducers: {
    setPendingTxSlice: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setPendingTxSlice } = pendingTxSlice.actions;
export default pendingTxSlice.reducer;
