import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { CongViec, CongViecChiTiet, congViecModel } from "../models/congViecModel";

type InitialState = {
  menuCongViec: congViecModel[];
  detailJob: CongViecChiTiet;
  arrResult: CongViecChiTiet[];
  arrCategory: CongViecChiTiet[];
  arrTask:CongViec[]
  arrRow:any
};

const initialState: InitialState = {
  menuCongViec: [],
  detailJob: {
    id: 0,
    congViec: {
      id: 0,
      tenCongViec: "",
      giaTien: 0,
      nguoiTao: 0,
      hinhAnh: "",
      moTa: "",
      maChiTietLoaiCongViec: 0,
      moTaNgan: "",
      saoCongViec: 0,
      danhGia: 0,
    },
    tenChiTietLoai: "",
    tenNhomChiTietLoai: "",
    tenNguoiTao: "",
    tenLoaiCongViec: "",
    avatar: "",
  },
  arrResult: [],
  arrCategory: [],
  arrTask:[],
  arrRow:[]
};

const congViecReducer = createSlice({
  name: "congViecReducer",
  initialState,
  reducers: {
    getMenuCongViecAction: (state, action: PayloadAction<congViecModel[]>) => {
      state.menuCongViec = action.payload;
    },
    getDetailJob: (state, action: PayloadAction<CongViecChiTiet>) => {
      state.detailJob = action.payload;
    },
    getResult: (state, action: PayloadAction<CongViecChiTiet[]>) => {
      state.arrResult = action.payload;
    },
    getCategory: (state, action: PayloadAction<CongViecChiTiet[]>) => {
      state.arrCategory = action.payload;
    },
    getTaskAction: (state, action: PayloadAction<CongViec[]>) => {
      state.arrTask = action.payload;
    },
    getTotalRowAction: (state, action: PayloadAction<any>) => {
      state.arrRow = action.payload;
    },
  
  },
});

export const { getTotalRowAction,getMenuCongViecAction, getDetailJob, getResult, getCategory,getTaskAction } =
  congViecReducer.actions;

export default congViecReducer.reducer;
//---------------------API--------------------------
export const getMenuCongViecApi = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get("/cong-viec/lay-menu-loai-cong-viec");
      let menuCongViec: congViecModel[] = result.data.content;
      dispatch(getMenuCongViecAction(menuCongViec));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetailJobApi = (id: string | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(`/cong-viec/lay-cong-viec-chi-tiet/${id}`);
      const jobArray: CongViecChiTiet[] = result.data.content;
      const job: CongViecChiTiet = jobArray[0];
      dispatch(getDetailJob(job));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getResultApi = (name: String) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/cong-viec/lay-danh-sach-cong-viec-theo-ten/${name}`
      );
      const arrResult: CongViecChiTiet[] = result.data.content;
      dispatch(getResult(arrResult));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getCategoryApi = (id: String | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `https://fiverrnew.cybersoft.edu.vn/api/cong-viec/lay-cong-viec-theo-chi-tiet-loai/${id}`
      );
      const arrCategory: CongViecChiTiet[] = result.data.content;
      dispatch(getCategory(arrCategory));
    } catch (err) {
      console.log(err);
    }
  };
};

// export const getTaskApi=(keyword:any)=>{
//   return async (dispatch:AppDispatch)=>{
//     try{
//       if(keyword!=='' && keyword !== null){
//         const result = await http.get("/cong-viec/lay-danh-sach-cong-viec-theo-ten/" + keyword);
//         let arrTask:CongViec[]=result.data.content
//         const action = getTaskAction(arrTask)
//         console.log(result);
//         dispatch(action)
//         // console.log(action);
//       }else{
//         const result = await http.get('/cong-viec')
//         let arrTask:CongViec[]=result.data.content
//         const action = getTaskAction(arrTask)
//         dispatch(action)
//       } 
//     }catch(err){
//       console.log(err);
      
//     }
//   }

// }

export const getTaskApi=(keyword:any,id:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      // if(!keyword||keyword===''){
      //   const result = await http.get('/cong-viec')
        
      //           let arrTask:CongViec[]=result.data.content
      //           const action = getTaskAction(arrTask)
      //           dispatch(action)
      // }else if(keyword!==''){
        console.log(keyword,id);
        const result = await http.get(`/cong-viec/phan-trang-tim-kiem?pageIndex=${id}&pageSize=5&keyword=${keyword}`)
        console.log(result);
        
        let arrTask:CongViec[]=result.data.content.data
        let totalRow:any = result.data.content.totalRow
        const action = getTaskAction(arrTask)
        const actionRow = getTotalRowAction(totalRow)
        
        
        dispatch(action)
        dispatch(actionRow)
      // }   
    }catch(err){
      console.log(err);
      
    }
  }
}


export const deleteTaskApi=(id:number,task:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result=await http.delete(`/cong-viec/${id}`)
      Swal.fire({
        icon: "success",
        title: "Xóa tài khoản thành công",
      });
      // dispatch(getTaskApi(''))
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Không có quyền xóa",
      });
    }
  }
}
