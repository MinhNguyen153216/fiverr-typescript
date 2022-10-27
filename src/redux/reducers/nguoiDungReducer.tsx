import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
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
    getUserPaginatedAction:(state,action:PayloadAction<nguoiDungModel[]>)=>{
      state.arrUserPaginated = action.payload
    },


    
  },
});

export const { logOutUserAction,getAllUserAction,getUserPaginatedAction } = nguoiDungReducer.actions;

export default nguoiDungReducer.reducer;



//-------action api------------

export const getUserApi = ()=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.get('/users')
      let arrUser:nguoiDungModel[]=result.data.content
      const action = getAllUserAction(arrUser)
      // console.log(result);
      dispatch(action)
      // console.log(action);
      
    }catch(err){
      console.log(err);
      
    }
  }
}

export const deleteUserApi=(id:number,user:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result=await http.delete(`/users?id=${id}`)
      alert(result.data.message)
      dispatch(paginationApi(id))
      dispatch(getUserApi())
    }catch(err){
      console.log(err);
      
    }
  }
}




export const paginationApi = (number:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.get(`/users/phan-trang-tim-kiem?pageIndex=${number}&pageSize=10`)
      let arrUserPaginated:nguoiDungModel[]=result.data.content.data
      const action = getUserPaginatedAction(arrUserPaginated)
      dispatch(action)
      console.log(arrUserPaginated);
      
    }catch(err){
      console.log(err);
    }
  }
}