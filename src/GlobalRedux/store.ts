'use client';

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from './Features/login/loginSlice'
import addressReducer from './Features/address/addressSlice'
export const store = configureStore({
    reducer: {
        login: loginReducer,
        address: addressReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
