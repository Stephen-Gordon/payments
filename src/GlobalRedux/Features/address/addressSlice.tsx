'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  value: string;
}

const initialState: AddressState = {
  value: '0x6b3C5DeBB67505dfD66F3b3b80D1d24DF8DA886D',
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
