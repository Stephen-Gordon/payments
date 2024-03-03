'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BalanceState {
  value: string | undefined;
}

const initialState: BalanceState = {
  value: '',
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
