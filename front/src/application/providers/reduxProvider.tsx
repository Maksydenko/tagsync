"use client";

import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "../store";

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
