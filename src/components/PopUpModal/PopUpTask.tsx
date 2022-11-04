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
import { CongViec } from "../../redux/models/congViecModel";
import {
  addTaskAdminApi,
  updateTaskAdminApi,
} from "../../redux/reducers/congViecReducer";

type Props = {
  editable: any;
  setEditable: any;
};

export default function PopUpTask({ editable, setEditable }: Props) {
  const { arrTaskEdit } = useSelector(
    (state: RootState) => state.congViecReducer
  );
  // console.log(arrTask);

  const dispatch: AppDispatch = useDispatch();
  const regexName: any =
    "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$";
  const regexNumber: any = "^[0-9][0-9]*$";

  const frm = useFormik({
    enableReinitialize: true,
    initialValues: {
      hinhAnh: arrTaskEdit.hinhAnh,
      giaTien: arrTaskEdit.giaTien,
      tenCongViec: arrTaskEdit.tenCongViec,
      moTaNgan: arrTaskEdit.moTaNgan,
      // hinhAnh:'',
      // giaTien:1,
      // tenCongViec:'',
      // moTaNgan:''
    },

    //check validation
    validationSchema: Yup.object().shape({
      hinhAnh: Yup.string().required("Hình ảnh không được để trống"),
      giaTien: Yup.string()
        .required("Giá tiền không được bỏ trống")
        .matches(regexNumber, "Giá tiền không hợp lệ"),
      tenCongViec: Yup.string().required("Tên công việc không được để trống"),
      moTaNgan: Yup.string().required("Mô tả không được để trống"),
    }),

    onSubmit: (values: CongViec, { resetForm }) => {
      dispatch(addTaskAdminApi(values));
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
      id="exampleModalTask"
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
              {editable ? "CẬP NHẬT CÔNG VIỆC" : "THÊM CÔNG VIỆC"}
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
                  <p>Img</p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="Hình Ảnh"
                    name="hinhAnh"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.hinhAnh}
                  />
                  {frm.errors.hinhAnh ? (
                    <p className="text-danger mb-3">{frm.errors.hinhAnh}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group ">
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
                )}
              </div>
              <div className="col-6">
                <div className="form-group">
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
                </div>
                <button
                  className="my-5 me-2 update-button "
                  onClick={() => {
                    const actionThunk = updateTaskAdminApi(
                      frm.values,
                      arrTaskEdit.id
                    );
                    console.log(arrTaskEdit.id);

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
