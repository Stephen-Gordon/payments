'use client'

import { createSlice } from "@reduxjs/toolkit"

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        value: false,
    },
    reducers: {
        login: (state) => {
            state.value = true
        },
        logout: (state) => {
            state.value = false
        },
    },
});
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;