'use client';

import { createSlice } from '@reduxjs/toolkit';

export const kernalClientSlice = createSlice({
  name: 'kernalClient',
  initialState: {
    value: {},
  },
  reducers: {
    setKernalClient: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setKernalClient } = kernalClientSlice.actions;
export default kernalClientSlice.reducer;
