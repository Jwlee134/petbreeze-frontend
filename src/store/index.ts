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

import user from "./user";
import common from "./common";
import animalInfo from "./animalInfo";
import notification from "./notification";

const rootReducer = combineReducers({ user, common, animalInfo, notification });

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "notification"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
