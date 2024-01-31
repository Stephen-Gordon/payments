'use client';

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './Features/login/loginSlice';
import addressReducer from './Features/address/addressSlice';
import searchReducer from './Features/search/searchSlice';
import kernalClientSliceReducer from './Features/kernalClient/kernalClientSlice';

// Define RootState type
type RootState = {
  login: {
    value: boolean;
  };
  address: {
    value: string;
  };
  search: {
    value: boolean;
  };
  kernalClient: {
    value: {};
  };
};

const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers with RootState type
const rootReducer = combineReducers<RootState>({
  login: loginReducer,
  address: addressReducer,
  search: searchReducer,
  kernalClient: kernalClientSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
