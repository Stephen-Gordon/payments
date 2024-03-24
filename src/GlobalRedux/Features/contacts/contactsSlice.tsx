'use client';

import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: [],
  },
  reducers: {
    setContacts: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setContacts } = contactsSlice.actions;
export default contactsSlice.reducer;
