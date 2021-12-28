import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import ble from "./ble";
import deviceSetting from "./deviceSetting";
import storage from "./storage";
import common from "./common";
import form from "./form";

import api, { rtkQueryErrorLogger, testApi } from "~/api";

const rootReducer = combineReducers({
  ble,
  deviceSetting,
  storage,
  common,
  form,
  [api.reducerPath]: api.reducer,
  [testApi.reducerPath]: testApi.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["storage"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [api.middleware, testApi.middleware, rtkQueryErrorLogger];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middleware.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
