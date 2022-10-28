import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
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
import { AppDispatch } from "../configStore";
import { Signup } from "../models/authModel";
import { nguoiDungModel } from "../models/nguoiDungModel";

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN),
  arrUser:[],
  arrUserPaginated:[]
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
  
    // deleteUserAction:(state,action:PayloadAction<nguoiDungModel[]>)=>{     
    // },
    getAllUserAction:(state,action:PayloadAction<nguoiDungModel[]>)=>{
      state.arrUser = action.payload
    },
    // getUserPaginatedAction:(state,action:PayloadAction<nguoiDungModel[]>)=>{
    //   state.arrUserPaginated = action.payload
    // },


    
  },
});

export const { logOutUserAction,getAllUserAction } = nguoiDungReducer.actions;

export default nguoiDungReducer.reducer;



//-------action api------------

export const getUserApi = (keyword:string)=>{
  return  async(dispatch:AppDispatch)=>{
    try{
      if(keyword!=='' && keyword !== null){
        const result = await http.get("/users/search/" + keyword);
        let arrUser:nguoiDungModel[]=result.data.content
        const action = getAllUserAction(arrUser)
        console.log(result);
        dispatch(action)
        // console.log(action);
      }else{
        const result = await http.get('/users')
        let arrUser:nguoiDungModel[]=result.data.content
        const action = getAllUserAction(arrUser)
        // console.log(result);
        dispatch(action)
        // console.log(action);      
      } 
    }catch(err){
      console.log(err);
      
    }
  }
}

export const deleteUserApi=(id:number,user:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result=await http.delete(`/users?id=${id}`)
      Swal.fire({
        icon: "success",
        title: "Xóa tài khoản thành công",
      });
      dispatch(getUserApi(''))
    }catch(err){
      console.log(err);
      
    }
  }
}


export const registerAdmin = (adminvalue: Signup) => {
  return async (dispatch: AppDispatch) => {
    try {
      console.log(adminvalue);
      const result = await http.post("/users", adminvalue);
      console.log(result);
      Swal.fire({
        icon: "success",
        title: "Đăng kí tài khoản thành công",
      });
      dispatch(getUserApi(''))

    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Email đã được sử dụng",
      });
    }
  };
};


