import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  userLogin1: getStoreJson(USER_LOGIN),
};

const nguoiDungReducer = createSlice({
  name: "nguoiDungReducer",
  initialState,
  reducers: {
    testingAction:(state, action: PayloadAction<nguoiDungModel>) => {
      state.userLogin1 = action.payload;
    },
  },
});

export const {testingAction} = nguoiDungReducer.actions;

export default nguoiDungReducer.reducer;
