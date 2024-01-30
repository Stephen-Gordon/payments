'use client';

import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './Features/login/loginSlice';
import addressReducer from './Features/address/addressSlice';
import searchReducer from './Features/search/searchSlice';
export const store = configureStore({
  reducer: {
    login: loginReducer,
    address: addressReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
