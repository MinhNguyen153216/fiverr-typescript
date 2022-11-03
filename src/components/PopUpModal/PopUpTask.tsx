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

type Props = {
  editable: any;
  setEditable: any;
};

export default function PopUpTask({ editable, setEditable }: Props) {
  const { arrUserEdit } = useSelector(
    (state: RootState) => state.nguoiDungReducer
  );
  console.log(arrUserEdit);

  const dispatch: AppDispatch = useDispatch();
  const regexName: any =
    "[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹs]+$";
  const regexPhone: any = "^[0-9][0-9]*$";

  const frm = useFormik({
    enableReinitialize: true,
    initialValues: {
      // email: "",
      // password: "",
      // name: "",
      // phone: "",
      // gender: true,
      // birthday: "",
      role: "ADMIN",
      email: arrUserEdit.email,
      password: arrUserEdit.password,
      name: arrUserEdit.name,
      phone: arrUserEdit.phone,
      gender: true,
      birthday: arrUserEdit.birthday,
      id: arrUserEdit.id,
    },

    //check validation
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
      password: Yup.string().required("Password không được bỏ trống"),
      name: Yup.string()
        .required("Tên không được để trống")
        .matches(regexName, "Tên không đúng định dạng"),
      phone: Yup.string()
        .required("Số điện thoại không được để trống")
        .matches(regexPhone, "Số điện thoại không đúng"),
    }),

    onSubmit: (values: Signup,{resetForm}) => {
      dispatch(registerAdmin(values));
      // console.log(values);
      resetForm({
      // email: "",
      // password: "",
      // name: "",
      // phone: "",
      })
    },
   
  });

  return (
    <div
      className="modal popupmodal fade "
      id=" exampleModalTask "
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    //   data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel"
              style={editable?{color:'#0d6efd'}:{color:'#1dbf72'}}
            >
              {editable ? "CẬP NHẬT NGƯỜI DÙNG": "THÊM QUẢN TRỊ VIÊN"}
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
            <form className="row" onSubmit={frm.handleSubmit} >
              <div className="col-6">
                <div className="form-group">
                  <p>Email</p>
                  <input
                    className="from-control"
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.email}
                  />
                  {frm.errors.email ? (
                    <p className="text-danger mb-3">{frm.errors.email}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group ">
                  <p
                    style={
                      editable ? { display: "none" } : { display: "block" }
                    }
                  >
                    Password
                  </p>
                  <input
                    className="from-control"
                    id="password"
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.password}
                    style={
                      editable ? { display: "none" } : { display: "block" }
                    }
                  />

              
                </div>
                {frm.errors.password ? (
                  <p
                    className="text-danger mb-3"
                    style={
                      editable ? { display: "none" } : { display: "block" }
                    }
                  >
                    {frm.errors.password}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Name</p>
                  <input
                    className="from-control"
                    type="text"
                    placeholder="name"
                    name="name"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.name}
                  />
                  {frm.errors.name ? (
                    <p className="text-danger">{frm.errors.name}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <p
                    style={
                      editable ? { display: "none" } : { display: "block" }
                    }
                  >
                    Phone
                  </p>
                  <input
                    className="from-control"
                    type="text"
                    inputMode="numeric"
                    placeholder="phone"
                    name="phone"
                    onChange={frm.handleChange}
                    onBlur={frm.handleBlur}
                    value={frm.values.phone}
                    style={
                      editable ? { display: "none" } : { display: "block" }
                    }
                  />
                  {frm.errors.phone ? (
                    <p
                      className="text-danger"
                      style={
                        editable ? { display: "none" } : { display: "block" }
                      }
                    >
                      {frm.errors.phone}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <button
                  className="my-5 me-2 update-button "
                  onClick={() => {
                    const actionThunk = updateUserApi(
                      frm.values,
                      arrUserEdit.id
                    );
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
