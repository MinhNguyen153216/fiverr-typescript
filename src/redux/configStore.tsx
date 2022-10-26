import { configureStore } from "@reduxjs/toolkit";
import congViecReducer from "./reducers/congViecReducer";
import nguoiDungReducer from "./reducers/nguoiDungReducer";

import binhLuanReducer from "./reducers/binhLuanReducer";
import congViecReducer from "./reducers/congViecReducer";
import nguoiDungReducer from "./reducers/nguoiDungReducer";
import userReducer from "./reducers/userReducer";
// import congViecReducer from "./reducers/congViecReducer";

export const store = configureStore({
  reducer: {
    congViecReducer: congViecReducer,
<<<<<<< HEAD
    binhLuanReducer: binhLuanReducer,
    nguoiDungReducer: nguoiDungReducer,
    userReducer: userReducer,
=======
    nguoiDungReducer: nguoiDungReducer,
>>>>>>> 28c9845fc11f082efd7760aa8a44e42e496a2b15
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
