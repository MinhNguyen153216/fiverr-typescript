import { createSlice, PayloadAction } from "@reduxjs/toolkit";
<<<<<<< HEAD

=======
import { history } from "../../index";
>>>>>>> 28c9845fc11f082efd7760aa8a44e42e496a2b15
import {
  ACCESS_TOKEN,
  USER_LOGIN,
  getStore,
  setStore,
  getStoreJson,
  setStoreJson,
  http,
  setCookie,
} from "../../util/setting";
import { nguoiDungModel } from "../models/nguoiDungModel";

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN),
};

const nguoiDungReducer = createSlice({
  name: "nguoiDungReducer",
  initialState,
  reducers: {
    logOutUserAction: (state, action: PayloadAction<nguoiDungModel>) => {
      console.log(action.payload);
      localStorage.clear();
      state.userLogin = null;
    },
  },
});

export const { logOutUserAction } = nguoiDungReducer.actions;

export default nguoiDungReducer.reducer;
