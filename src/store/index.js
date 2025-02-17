import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import modalReducer from "./modalSlice";
import sidebarReducer from "./sidebarSlice";
import toastReducer from "./toastSlice";
import titlePageReducer from "./titlePageSlice";

const persistAuthConfig = { key: "auth", storage };
const persistedAuth = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuth,
    modal: modalReducer,
    sidebar: sidebarReducer,
    toast: toastReducer,
    titlePage: titlePageReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
