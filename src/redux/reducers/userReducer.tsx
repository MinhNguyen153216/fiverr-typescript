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
import { getUserApi } from "./nguoiDungReducer";
// import { history } from "../..";
import { history } from "../../index";

type InitialState = {
  userLogin: nguoiDungModel;
  bookingJobs: string[];
};

const initialState: InitialState = {
  userLogin: getStoreJson(USER_LOGIN),
  bookingJobs: [],
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction:(state,action:any)=>{
      state.userLogin = action.payload
    },
    getUserProfile: (state, action: PayloadAction<nguoiDungModel>) => {
      state.userLogin = action.payload;
    },
    logOutUserAction: (state, action: PayloadAction<nguoiDungModel>) => {
      console.log(action.payload);
      localStorage.clear();
      state.userLogin = getStoreJson(USER_LOGIN);
      Swal.fire({ icon: "success", title: "Đăng xuất thành công" });
    },
    getBookingJobAction:(state, action: PayloadAction<string[]>) => {
      state.bookingJobs = action.payload;
    },
  },
});

export const {getProfileAction} = userReducer.actions;
export const { getUserProfile, logOutUserAction, getBookingJobAction } = userReducer.actions;

export default userReducer.reducer;

/// -------- APi -----------------
export const registerApi = (userRegister: Signup) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log(userRegister);
      
      const result = await http.post("/auth/signup", userRegister);
      console.log(result);
      

      Swal.fire({
        icon: "success",
        title: "Đăng kí tài khoản thành công",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
      // dispatch(getUserApi(''))

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
      let userLogin=result.data.content
      console.log(result);
      setCookie(ACCESS_TOKEN, result.data.content.token, 30);
      setStore(ACCESS_TOKEN, result.data.content.token);
      setStoreJson(USER_LOGIN, result.data.content.user);
      dispatch(getUserProfile(result.data.content.user));
      Swal.fire({
        icon: "success",
        title: "Đăng nhâp tài khoản thành công",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed && userLogin.user.role.toLowerCase()==='user') {
          history.push("/home");
        }else if(userLogin.user.role.toLowerCase()==='admin'){
          history.push('/admin')
        }
      });
      // if(userLogin.user.role.toLowerCase()==='admin'){
      // history.push('/admin')
      // }
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
      Swal.fire({
        icon: "success",
        title: "Thuê công việc thành công",
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getBookingJobApi = (
  accessToken: string | null = getStore(ACCESS_TOKEN)
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/thue-cong-viec/lay-danh-sach-da-thue");
      dispatch(getBookingJobAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

