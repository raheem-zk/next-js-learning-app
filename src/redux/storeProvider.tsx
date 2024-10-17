"use client";

import { persistor, store } from "./store";
import { Provider } from "react-redux";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";

// Corrected StoreProvider component
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={"loading..."} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
