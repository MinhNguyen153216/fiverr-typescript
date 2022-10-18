import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { http } from "../../util/setting";
import { AppDispatch } from "../configStore";
import { congViecModel } from "../models/congViecModel";
import { history } from "../../index";

const initialState: any = {
  menuCongViec: [],
};

const congViecReducer = createSlice({
  name: "congViecReducer",
  initialState,
  reducers: {
    getMenuCongViecAction: (state, action: PayloadAction<congViecModel[]>) => {
      state.menuCongViec = action.payload;
    },
  },
});

export const { getMenuCongViecAction } = congViecReducer.actions;

export default congViecReducer.reducer;

// ---------------------thunk API---------------------
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
