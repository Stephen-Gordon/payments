'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  value: string | undefined;
}

const initialState: AddressState = {
  value: '',
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;
