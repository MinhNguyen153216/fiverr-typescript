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
import { CongViec, ThueCongViec } from "../../redux/models/congViecModel";
import {
    addServiceAdminApi,
  addTaskAdminApi,
  updateServiceAdminApi,
  updateTaskAdminApi,
} from "../../redux/reducers/congViecReducer";

type Props = {
  editable: any;
  setEditable: any;
};

export default function PopUpService({ editable, setEditable }: Props) {
  const { arrServiceEdit } = useSelector(
    (state: RootState) => state.congViecReducer
  );
  // console.log(arrTask);

  const dispatch: AppDispatch = useDispatch();
  const regexName: any =
    "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$";
  const regexNumber: any = "^[0-9][0-9]*$";
//   const regexDate:any = "/^\d{4}-\d{2}-\d{2}$/"

  const frm = useFormik({
    enableReinitialize: true,
    initialValues: {
      id:arrServiceEdit.id,
      maCongViec: arrServiceEdit.maCongViec,
      maNguoiThue: arrServiceEdit.maNguoiThue,
      ngayThue: arrServiceEdit.ngayThue,
      hoanThanh: arrServiceEdit.hoanThanh,
      // hinhAnh:'',
      // giaTien:1,
      // tenCongViec:'',
      // moTaNgan:''
    },

    //check validation
    validationSchema: Yup.object().shape({
        maCongViec: Yup.string().required("Mã công việc không được để trống").matches(regexNumber, "Mã công việc không hợp lệ"),
        maNguoiThue: Yup.string()
        .required("Mã người thuê không được bỏ trống")
        .matches(regexNumber, "Mã người thuê không hợp lệ"),
        ngayThue: Yup.string().required("Ngày thuê không được để trống"),
        // .matches(regexDate,'Ngày thuê không hợp lệ'),
        id: Yup.string().required("ID không được để trống"),
    }),

    onSubmit: (values: ThueCongViec, { resetForm }) => {
      dispatch(addServiceAdminApi(values));
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
      id="exampleModalService"
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
              {editable ? "CẬP NHẬT THUÊ CÔNG VIỆC" : "THÊM THUÊ CÔNG VIỆC"}
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
                  <p>Mã công việc</p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="Mã công việc"
                    name="maCongViec"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.maCongViec}
                  />
                  {frm.errors.maCongViec ? (
                    <p className="text-danger mb-3">{frm.errors.maCongViec}</p>
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
                    Mã người thuê
                  </p>
                  <input
                    className="from-control"
                    id="maNguoiThue"
                    type="text"
                    placeholder="Mã người thuê"
                    // inputMode="numeric"
                    name="maNguoiThue"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.maNguoiThue}
                    // style={
                    //   editable ? { display: "none" } : { display: "block" }
                    // }
                  />
                </div>
                {frm.errors.maNguoiThue ? (
                  <p
                    className="text-danger mb-3"
                    // style={
                    //   editable ? { display: "none" } : { display: "block" }
                    // }
                  >
                    {frm.errors.maNguoiThue}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Ngày thuê</p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="Ngày thuê"
                    name="ngayThue"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.ngayThue}
                  />
                  {frm.errors.ngayThue ? (
                    <p className="text-danger">{frm.errors.ngayThue}</p>
                  ) : (
                    ""
                  )}
                </div>
                {/* <div className="form-group">
                  <p
                  style={
                    editable ? { display: "none" } : { display: "block" }
                  }
                  >
                    ID
                  </p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="ID"
                    name="id"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.id}
                    style={
                      editable ? { display: "none" } : { display: "block" }
                    }
                  />
                  {frm.errors.id ? (
                    <p
                      className="text-danger"
                      style={
                        editable ? { display: "none" } : { display: "block" }
                      }
                    >
                      {frm.errors.id}
                    </p>
                  ) : (
                    ""
                  )}
                </div> */}
                <button
                  className="my-5 me-2 update-button "
                  type="button"
                  onClick={() => {
                    const actionThunk = updateServiceAdminApi(
                      frm.values,
                      arrServiceEdit.id
                    );
                    console.log(frm.values);
                    
                    console.log(arrServiceEdit.id);

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
