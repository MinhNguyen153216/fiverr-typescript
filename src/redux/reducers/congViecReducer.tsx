import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { values } from "lodash";
import Swal from "sweetalert2";
import { history } from "../../index";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { CongViec, CongViecChiTiet, congViecModel, LoaiCongViec, ThueCongViec } from "../models/congViecModel";

type InitialState = {
  menuCongViec: congViecModel[];
  detailJob: CongViecChiTiet;
  arrResult: CongViecChiTiet[];
  arrCategory: CongViecChiTiet[];
  arrTask:CongViec[]
  arrRow:any,
  arrRowType:any,
  arrRowService:any,
  arrTaskEdit:any
  arrTaksType:LoaiCongViec[],
  arrTaskTypeEdit:any,
  arrService:ThueCongViec[],
  arrServiceEdit:any,
  jobTitleDetail: congViecModel;
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
  arrRow:[],
  arrRowType:[],
  arrRowService:[],
  arrTaskEdit:[
    {
      id:1,
      hinhAnh:'',
      giaTien:0,
      tenCongViec:'',
      moTaNgan:''
    }
  ],
  arrTaksType:[],
  arrTaskTypeEdit:[{
    id:1,
    tenLoaiCongViec:''
  }],
  arrService:[],
  arrServiceEdit:[{
    id:1,
    maCongViec:1,
    maNguoiThue:1,
    ngayThue:'1/1/1997',
    hoanThanh:true
  }],
  jobTitleDetail: {
    id: 0,
    tenLoaiCongViec: "",
    dsNhomChiTietLoai: [
      {
        id: 0,
        tenNhom: "",
        hinhAnh: "",
        maLoaiCongViec: 0,
        dsChiTietLoai: [
          {
            id: 0,
            tenChiTiet: "",
          },
        ],
      },
    ],
  },
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
    updateTaskAction:(state,action:PayloadAction<CongViec[]>)=>{
      state.arrTaskEdit = action.payload
    },
    getTaskTypeAction: (state, action: PayloadAction<LoaiCongViec[]>) => {
      state.arrTaksType = action.payload;
    },
    getTotalRowTypeAction: (state, action: PayloadAction<any>) => {
      state.arrRowType = action.payload;
    },
    updateTaskTypeAction:(state,action:PayloadAction<LoaiCongViec[]>)=>{
      state.arrTaskTypeEdit = action.payload
    },
    getServiceAction: (state, action: PayloadAction<ThueCongViec[]>) => {
      state.arrService = action.payload;
    },
    getTotalRowServiceAction: (state, action: PayloadAction<any>) => {
      state.arrRowService = action.payload;
    },
    updateServiceAction:(state,action:PayloadAction<ThueCongViec[]>)=>{
      state.arrServiceEdit = action.payload
    },
    getJobTitleDetailAction: (state, action: PayloadAction<congViecModel>) => {
      state.jobTitleDetail = action.payload;
    },
  },
});

export const {updateServiceAction,getTotalRowServiceAction,getServiceAction,updateTaskTypeAction,getTotalRowTypeAction, getTaskTypeAction,updateTaskAction,getTotalRowAction,getMenuCongViecAction, getDetailJob, getResult, getCategory,getTaskAction } =
  congViecReducer.actions;
export const {
  // getMenuCongViecAction,
  // getDetailJob,
  // getResult,
  // getCategory,
  getJobTitleDetailAction,
} = congViecReducer.actions;

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

export const getTaskApi=(keyword:any,id:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
        console.log(keyword,id);
        const result = await http.get(`/cong-viec/phan-trang-tim-kiem?pageIndex=${id}&pageSize=3&keyword=${keyword}`)
        // console.log(result);        
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
      dispatch(getTaskApi('',8))
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Không có quyền xóa",
      });
    }
  }
}

export const addTaskAdminApi=(values:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.post('/cong-viec',values)
      Swal.fire({
        icon: "success",
        title: "Thêm công việc thành công",
      });
      dispatch(getTaskApi('',8))
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Thêm công việc thất bại",
      });
      
    }
  }
}



export const updateTaskAdminApi=(values:any,id:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.put(`/cong-viec/${id}`,values)
      console.log(result);
      let arrTask:CongViec[]=result.data.content
      dispatch(updateTaskAction(arrTask))
      Swal.fire({
        icon: "success",
        title: "Cập nhật công việc thành công",
      });
      dispatch(getTaskApi('',8))
      
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Không có quyền cập nhật",
      });
      
    }
  }
}


export const getTaskTypeApi=(keyword:any,id:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
        console.log(keyword,id);
        const result = await http.get(`/loai-cong-viec/phan-trang-tim-kiem?pageIndex=${id}&pageSize=5&keyword=${keyword}`)
        // console.log(result);        
        let arrTaskType:LoaiCongViec[]=result.data.content.data
        let totalRowType:any = result.data.content.totalRow
        const action = getTaskTypeAction(arrTaskType)
        const actionRowType = getTotalRowTypeAction(totalRowType)
        dispatch(action)
        dispatch(actionRowType)
      // }   
    }catch(err){
      console.log(err);
      
    }
  }
}


export const addTaskTypeAdminApi=(values:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.post('/loai-cong-viec',values)
      Swal.fire({
        icon: "success",
        title: "Thêm loại công việc thành công",
      });
      dispatch(getTaskTypeApi('',2))
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Thêm loại công việc thất bại",
      });
      
    }
  }
}



export const updateTaskTypeAdminApi=(values:any,id:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.put(`/loai-cong-viec/${id}`,values)
      console.log(result);
      let arrTask:LoaiCongViec[]=result.data.content
      dispatch(updateTaskTypeAction(arrTask))
      Swal.fire({
        icon: "success",
        title: "Cập nhật loại công việc thành công",
      });
      dispatch(getTaskTypeApi('',2))
      
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Không có quyền cập nhật",
      });
      
    }
  }
}



export const deleteTaskTypeApi=(id:number,task:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result=await http.delete(`/loai-cong-viec/${id}`)
      Swal.fire({
        icon: "success",
        title: "Xóa loại công việc thành công",
      });
      dispatch(getTaskTypeApi('',2))
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Không có quyền xóa",
      });
    }
  }
}


export const getServiceApi=(keyword:any,id:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
        console.log(keyword,id);
        const result = await http.get(`/thue-cong-viec/phan-trang-tim-kiem?pageIndex=${id}&pageSize=5&keyword=`)
        // console.log(result);        
        let arrService:ThueCongViec[]=result.data.content.data
        let totalRowService:any = result.data.content.totalRow
        const action = getServiceAction(arrService)
        const actionRowService = getTotalRowServiceAction(totalRowService)
        dispatch(action)
        dispatch(actionRowService)
      // }   
    }catch(err){
      console.log(err);
      
    }
  }
}


export const addServiceAdminApi=(values:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.post('/thue-cong-viec',values)
      Swal.fire({
        icon: "success",
        title: "Thêm thuê công việc thành công",
      });
      dispatch(getServiceApi('',1))
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Thêm thuê công việc thất bại",
      });
      
    }
  }
}


export const updateServiceAdminApi=(values:any,id:number)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result = await http.put(`/thue-cong-viec/${id}`,values)
      console.log(result);
      let arrService:ThueCongViec[]=result.data.content
      dispatch(updateServiceAction(arrService))
      Swal.fire({
        icon: "success",
        title: "Cập nhật loại công việc thành công",
      });
      dispatch(getServiceApi('',1))
      
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Cập nhật không thành công",
      });
      
    }
  }
}

export const deleteServiceApi=(id:number,task:any)=>{
  return async (dispatch:AppDispatch)=>{
    try{
      const result=await http.delete(`/thue-cong-viec/${id}`)
      Swal.fire({
        icon: "success",
        title: "Xóa thuê công việc thành công",
      });
      dispatch(getServiceApi('',1))
    }catch(err){
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Không có quyền xóa",
      });
    }
  }
}
export const getJobTitleDetailApi = (id: String | number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const result = await http.get(
        `/cong-viec/lay-chi-tiet-loai-cong-viec/${id}`
      );
      // const jobTitleDetail: congViecModel = result.data.content;
      dispatch(getJobTitleDetailAction(result.data.content[0]));
    } catch (err) {
      console.log(err);
      history.push("/");

    }
  };
};
