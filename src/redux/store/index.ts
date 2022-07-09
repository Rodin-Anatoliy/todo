import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { inProgressSlice } from "../slice/inProgress";
import { doneSlice } from "../slice/done";
import { todoSlice } from "../slice/todo";

const rootReducer = combineReducers({
  done: doneSlice.reducer,
  inProgress: inProgressSlice.reducer,
  todo: todoSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;