import { configureStore } from "@reduxjs/toolkit";

import binhLuanReducer from "./reducers/binhLuanReducer";
import congViecReducer from "./reducers/congViecReducer";
import nguoiDungReducer from "./reducers/nguoiDungReducer";
import userReducer from "./reducers/userReducer";
// import congViecReducer from "./reducers/congViecReducer";

export const store = configureStore({
  reducer: {
    congViecReducer: congViecReducer,
    binhLuanReducer: binhLuanReducer,
    nguoiDungReducer: nguoiDungReducer,
    userReducer: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
