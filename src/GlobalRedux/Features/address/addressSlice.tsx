'use client'

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AddressState {
  value: string;
}

const initialState: AddressState = {
  value: "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c",
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;