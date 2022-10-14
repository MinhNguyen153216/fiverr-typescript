import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN, getStoreJson, http, setCookie, setStore, USER_LOGIN } from '../../util/setting';
import { AppDispatch } from '../configStore';

export interface UserModel{
    id:            number;
    name:          string;
    email:         string;
    password:      string;
    phone:         string;
    birthday:      string;
    gender:        boolean;
    role:          string;
    skill:         string[];
    certification: string[];
}

const initialState:any = {
    userLogin:getStoreJson(USER_LOGIN)
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {}
});

export const {} = userReducer.actions

export default userReducer.reducer

//action Api


export const loginApi = ()=>{
    return async (dispatch:AppDispatch)=>{
        try{
            const result = await http.post('/auth/signin')
            console.log(result);
            setCookie(ACCESS_TOKEN,result.data.content.accessToken,30)
            setStore(ACCESS_TOKEN,result.data.content.accessToken)
            
        }
        catch(err){
        alert('Đăng nhập thất bại')
        }
    }
}