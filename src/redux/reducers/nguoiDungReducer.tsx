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
import { AppDispatch } from "../configStore";
import { nguoiDungModel } from "../models/nguoiDungModel";

const initialState: any = {
  userLogin: getStoreJson(USER_LOGIN),
  arrUser:[]
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
  
    deleteUserAction:(state,action:PayloadAction<nguoiDungModel[]>)=>{
      // console.log(action);
      let arrUserAction:nguoiDungModel[] = action.payload
      console.log(state.arrUser.indexOf(arrUserAction));
      state.arrUser=state.arrUser
      
      // let arrUserUpdate = state.arrUser.filter(user=>user.id!==arrUserAction.id)
      

      // state.arrUser.filter(user)
      
      
    },
    getAllUserAction:(state,action:PayloadAction<nguoiDungModel[]>)=>{
      state.arrUser = action.payload
    },
    
  },
});

export const { logOutUserAction,getAllUserAction,deleteUserAction } = nguoiDungReducer.actions;

export default nguoiDungReducer.reducer;



//-------action api------------

export const getUserApi = ()=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.get('/users')
      let arrUser:nguoiDungModel[]=result.data.content
      const action = getAllUserAction(arrUser)
      console.log(result);
      
      dispatch(action)
      console.log(action);
      
    }catch(err){
      console.log(err);
      
    }
  }
}

export const deleteUserApi=(id:number,user:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result=await http.delete(`/users?id=${id}`)
      console.log(result);
      // let arrUser:nguoiDungModel[]=result.data.content
      const action = deleteUserAction(user)
      dispatch(action)
      console.log(action);
      
    }catch(err){
      console.log(err);
      
    }
  }
}