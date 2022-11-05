import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AppDispatch, RootState } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { boolean } from "yup/lib/locale";
import { registerApi } from "../../redux/reducers/userReducer";
import { Signin, Signup } from "../../redux/models/authModel";
import {
  registerAdmin,
  updateUserApi,
} from "../../redux/reducers/nguoiDungReducer";
import { values } from "lodash";
import { CongViec, LoaiCongViec } from "../../redux/models/congViecModel";
import {
  addTaskAdminApi,
  addTaskTypeAdminApi,
  updateTaskAdminApi,
  updateTaskTypeAdminApi,
} from "../../redux/reducers/congViecReducer";

type Props = {
  editable: any;
  setEditable: any;
};

export default function PopUpTaskType({ editable, setEditable }: Props) {
  const { arrTaskTypeEdit } = useSelector(
    (state: RootState) => state.congViecReducer
  );
  console.log(arrTaskTypeEdit);

  const dispatch: AppDispatch = useDispatch();
  const regexName: any =
    "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$";
//   const regexNumber: any = "^[0-9][0-9]*$";

  const frm = useFormik({
    enableReinitialize: true,
    initialValues: {
    //   hinhAnh: arrTaskEdit.hinhAnh,
    //   giaTien: arrTaskEdit.giaTien,
    //   tenCongViec: arrTaskEdit.tenCongViec,
    //   moTaNgan: arrTaskEdit.moTaNgan,
    //   id:arrTaskEdit.id
      id:arrTaskTypeEdit.id,
      tenLoaiCongViec:arrTaskTypeEdit.tenLoaiCongViec,
      // tenCongViec:'',
      // moTaNgan:''
    },

    //check validation
    validationSchema: Yup.object().shape({
    //   hinhAnh: Yup.string().required("Hình ảnh không được để trống"),
    //   giaTien: Yup.string()
    //     .required("Giá tiền không được bỏ trống")
    //     .matches(regexNumber, "Giá tiền không hợp lệ"),
      tenLoaiCongViec: Yup.string().required("Tên loại công việc không được để trống"),
    //   moTaNgan: Yup.string().required("Mô tả không được để trống"),
    }),

    onSubmit: (values: LoaiCongViec, { resetForm }) => {
      dispatch(addTaskTypeAdminApi(values));
      console.log(values);
      resetForm({
        // email: "",
        // password: "",
        // name: "",
        // phone: "",
      });
    },
  });

  return (
    <div
      className="modal fade "
      id="exampleModalTaskType"
      // tabIndex={-1}
      // aria-labelledby="exampleModalLabel"
      // aria-hidden="true"
      //   data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-5"
              id="exampleModalLabel"
              style={editable ? { color: "#0d6efd" } : { color: "#1dbf72" }}
            >
              {editable ? "CẬP NHẬT LOẠI CÔNG VIỆC" : "THÊM LOẠI CÔNG VIỆC"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              // onClick={() => frm.({

              // })}

              //  type="reset"
              // onClick={()=>{
              //   setEditable(!editable)
              // }}
            />
          </div>
          <div className="modal-body">
            <form className="row" onSubmit={frm.handleSubmit}>
              <div className="col-6">
                <div className="form-group">
                  <p>Tên loại công việc</p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="Tên loại công việc"
                    name="tenLoaiCongViec"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.tenLoaiCongViec}
                  />
                  {frm.errors.tenLoaiCongViec ? (
                    <p className="text-danger mb-3">{frm.errors.tenLoaiCongViec}</p>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="form-group ">
                  <p
                  // style={
                  //   editable ? { display: "none" } : { display: "block" }
                  // }
                  >
                    Giá tiền
                  </p>
                  <input
                    className="from-control"
                    id="giaTien"
                    type="number"
                    placeholder="Giá tiền"
                    inputMode="numeric"
                    name="giaTien"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.giaTien}
                    // style={
                    //   editable ? { display: "none" } : { display: "block" }
                    // }
                  />
                </div>
                {frm.errors.giaTien ? (
                  <p
                    className="text-danger mb-3"
                    // style={
                    //   editable ? { display: "none" } : { display: "block" }
                    // }
                  >
                    {frm.errors.giaTien}
                  </p>
                ) : (
                  ""
                )} */}
              </div>
              <div className="col-6">
                {/* <div className="form-group">
                  <p>Tên công việc</p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="Tên công việc"
                    name="tenCongViec"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.tenCongViec}
                  />
                  {frm.errors.tenCongViec ? (
                    <p className="text-danger">{frm.errors.tenCongViec}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p
                  // style={
                  //   editable ? { display: "none" } : { display: "block" }
                  // }
                  >
                    Mô tả ngắn
                  </p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="Mô tả ngắn"
                    name="moTaNgan"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.moTaNgan}
                    // style={
                    //   editable ? { display: "none" } : { display: "block" }
                    // }
                  />
                  {frm.errors.moTaNgan ? (
                    <p
                      className="text-danger"
                      // style={
                      //   editable ? { display: "none" } : { display: "block" }
                      // }
                    >
                      {frm.errors.moTaNgan}
                    </p>
                  ) : (
                    ""
                  )}
                </div> */}
                <button
                  className="my-5 me-2 update-button "
                  type="button"
                  onClick={() => {
                    const actionThunk = updateTaskTypeAdminApi(
                      frm.values,
                      
                      arrTaskTypeEdit.id
                    );
                    console.log(frm.values);
                    
                    console.log(arrTaskTypeEdit.id);

                    dispatch(actionThunk);
                  }}
                  style={!editable ? { display: "none" } : { display: "block" }}
                >
                  Update
                </button>

                <button
                  className="my-5 add-button"
                  style={editable ? { display: "none" } : { display: "block" }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
