import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { history } from "../../index";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { CongViecChiTiet, congViecModel } from "../models/congViecModel";

type InitialState = {
  menuCongViec: congViecModel[];
  detailJob: CongViecChiTiet;
  arrResult: CongViecChiTiet[];
  arrCategory: CongViecChiTiet[];
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
    getJobTitleDetailAction: (state, action: PayloadAction<congViecModel>) => {
      state.jobTitleDetail = action.payload;
    },
  },
});

export const {
  getMenuCongViecAction,
  getDetailJob,
  getResult,
  getCategory,
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
