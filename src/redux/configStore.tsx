import { configureStore } from "@reduxjs/toolkit";
import congViecReducer from "./reducers/congViecReducer";

export const store = configureStore({
  reducer: {
    congViecReducer: congViecReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
