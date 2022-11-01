import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../configStore";
import { Signin, Signup } from "../models/authModel";
import {
  ACCESS_TOKEN,
  getStore,
  getStoreJson,
  http,
  setCookie,
  setStore,
  setStoreJson,
  USER_LOGIN,
} from "../../util/setting";
import Swal from "sweetalert2";
import { nguoiDungModel } from "../models/nguoiDungModel";
import { ThueCongViec } from "../models/congViecModel";
import { history } from "../../index";

type InitialState = {
  userLogin: nguoiDungModel;
};

const initialState: InitialState = {
  userLogin: getStoreJson(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getUserProfile: (state, action: PayloadAction<nguoiDungModel>) => {
      state.userLogin = action.payload;
    },
    logOutUserAction: (state, action: PayloadAction<nguoiDungModel>) => {
      console.log(action.payload);
      localStorage.clear();
      state.userLogin = getStoreJson(USER_LOGIN);
    },
  },
});

export const { getUserProfile, logOutUserAction } = userReducer.actions;

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
      history.push("/login");
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
      setCookie(ACCESS_TOKEN, result.data.content.token, 30);
      setStore(ACCESS_TOKEN, result.data.content.token);
      setStoreJson(USER_LOGIN, result.data.content.user);
      dispatch(getUserProfile(result.data.content.user));
      Swal.fire({
        icon: "success",
        title: "Đăng nhâp tài khoản thành công",
      });
      history.push("/home");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Đăng nhập không thành công",
        text: "Tài khoản hoặc mật khẩu không đúng",
      });
    }
  };
};

export const rentJobApi = (rentJob: ThueCongViec) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.post("/thue-cong-viec", rentJob);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
};
