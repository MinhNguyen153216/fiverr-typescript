import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../configStore";
import { Signin, Signup } from "../models/authModel";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  USER_LOGIN,
} from "../../util/setting";
import Swal from "sweetalert2";
import { nguoiDungModel } from "../models/nguoiDungModel";

type InitialState = {
  userLogin: nguoiDungModel;
};

const initialState: InitialState = {
  userLogin: getStoreJson(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {},
});

export const {} = userReducer.actions;

export default userReducer.reducer;

/// -------- APi -----------------
export const registerApi = (userRegister: Signup) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/auth/signup", userRegister);

      Swal.fire({
        icon: "success",
        title: "Đăng kí tài khoản thành công",
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Email đã được sử dụng",
      });
    }
  };
};

export const loginApi = (values: Signin) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/auth/signin", values);
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.content.accessToken, 30);
      setStore(ACCESS_TOKEN, result.data.content.accessToken);
      Swal.fire({
        icon: "success",
        title: "Đăng nhâp tài khoản thành công",
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập không thành công",
        text: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
  };
};
