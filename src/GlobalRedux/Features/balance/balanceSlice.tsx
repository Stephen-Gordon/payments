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


/* 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useGetBalance from '@/app/hooks/useGetBalance';
interface BalanceState {
  value: string | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BalanceState = {
  value: '',
  status: 'idle',
  error: null,
};

export const fetchBalance = createAsyncThunk(
  'balance/fetchBalance',
  async (address: string) => {
    try {
      const balance = await useGetBalance(address);
      return balance;
    } catch (error) {
      throw new Error('Failed to fetch balance');
    }
  }
);

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch balance';
      });
  },
});

export default balanceSlice.reducer;
 */