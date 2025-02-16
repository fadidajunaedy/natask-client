import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import authReducer from "./authSlice"
import modalReducer from "./modalSlice"
import sidebarReducer from "./sidebarSlice"
import toastReducer from "./toastSlice"

const persistAuthConfig = { key: "auth", storage }
const persistedAuth = persistReducer(persistAuthConfig, authReducer)

export const store = configureStore({
    reducer: {
        auth: persistedAuth,
        modal: modalReducer,
        sidebar: sidebarReducer,
        toast: toastReducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Abaikan tindakan redux-persist
            },
        })
})

export const persistor = persistStore(store)