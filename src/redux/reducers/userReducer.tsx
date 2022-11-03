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
import { ThueCongViec } from "../models/congViecModel";
import { getUserApi } from "./nguoiDungReducer";
import { history } from "../..";

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
    getProfileAction:(state,action:any)=>{
      state.userLogin = action.payload
    },
  },
});

export const {getProfileAction} = userReducer.actions;

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
      const action = getProfileAction(userLogin)
      dispatch(action)
      setCookie(ACCESS_TOKEN, result.data.content.token, 30);
      setStore(ACCESS_TOKEN, result.data.content.token);
      Swal.fire({
        icon: "success",
        title: "Đăng nhâp tài khoản thành công",
      });
      if(userLogin.user.role.toLowerCase()==='admin'){
      history.push('/admin')
      }else if(userLogin.user.role.toLowerCase()==='user'){
        history.push('/jobdetail')
      }
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

