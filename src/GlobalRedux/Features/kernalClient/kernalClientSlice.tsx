'use client';

import { createSlice } from '@reduxjs/toolkit';

export const kernalClientSlice = createSlice({
  name: 'kernalClient',
  initialState: {
    value: {},
  },
  reducers: {
    kernalClient: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { kernalClient } = kernalClientSlice.actions;
export default kernalClientSlice.reducer;
