import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
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

import common from "./common";
import form from "./form";
import safetyZone from "./safetyZone";
import storage from "./storage";
import map from "./map";
import device from "./device";

import api from "~/api";

const rootReducer = combineReducers({
  common,
  form,
  safetyZone,
  storage,
  map,
  device,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["storage"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [api.middleware];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middleware.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(...middleware),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
