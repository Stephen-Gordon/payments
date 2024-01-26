'use client'

import { createSlice } from "@reduxjs/toolkit"

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    value: "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c",
  },
  reducers: {
    address: (state) => {
      state.value = "0xc8C26Ab40fe4723519fE66B8dBb625FC070A982c"
    },

  },
});
export const { address } = addressSlice.actions;
export default addressSlice.reducer;