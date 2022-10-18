import { configureStore } from "@reduxjs/toolkit";
import congViecReducer from "./reducers/congViecReducer";
import nguoiDungReducer from "./reducers/nguoiDungReducer";

export const store = configureStore({
  reducer: {
    congViecReducer: congViecReducer,
    nguoiDungReducer: nguoiDungReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
