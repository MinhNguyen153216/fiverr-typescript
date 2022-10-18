import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../../index";
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
