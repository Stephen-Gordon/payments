'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './Features/login/loginSlice';
import addressReducer from './Features/address/addressSlice';
import searchReducer from './Features/search/searchSlice';
import kernalClientSliceReducer from './Features/kernalClient/kernalClientSlice';
import transactionsSliceReducer from './Features/transactions/transactionsSlice';
import sheetSliceReducer from './Features/sheet/sheetSlice';
import balanceSliceReducer from './Features/balance/balanceSlice';
import pendingTxSliceReducer from './Features/pendingTx/pendingTxSlice';
import contactsSliceReducer from './Features/contacts/contactsSlice';

// Define RootState type
export type RootState = {
  login: {
    value: boolean;
  };
  address: {
    value: string | undefined;
  };
  balance: {
    value: string | undefined;
  };
  search: {
    value: boolean;
  };
  kernalClient: {
    value: {};
  };
  transactions: [
    {
      value: any
    }
  ];
  pendingTx: {
    value: {};
  };
  contacts: {
    value: [];
  };
};

const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers with RootState type
const rootReducer = combineReducers<any>({
  login: loginReducer,
  address: addressReducer,
  search: searchReducer,
  kernalClient: kernalClientSliceReducer,
  transactions: transactionsSliceReducer,
  sheet: sheetSliceReducer,
  balance: balanceSliceReducer,
  pendingTx: pendingTxSliceReducer,
  contacts: contactsSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
