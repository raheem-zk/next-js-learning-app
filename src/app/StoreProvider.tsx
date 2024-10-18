"use client";

import { store } from "../redux/store";
import { Provider } from "react-redux";
import React from "react";
import persistStore from "redux-persist/es/persistStore";

persistStore(store);
export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};
