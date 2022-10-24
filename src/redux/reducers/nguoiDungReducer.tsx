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
    getAllUserAction:(state,action:PayloadAction<nguoiDungModel[]>)=>{
      state.arrUser = action.payload
    }
    
  },
});

export const { logOutUserAction,getAllUserAction } = nguoiDungReducer.actions;

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