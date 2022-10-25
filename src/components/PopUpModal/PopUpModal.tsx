import React from 'react'
import * as Yup from "yup";
import { useFormik } from "formik";
import { AppDispatch } from '../../redux/configStore';
import { useDispatch } from 'react-redux';
import { boolean } from "yup/lib/locale";




type Props = {}

export default function PopUpModal({}: Props) {

  const dispatch:AppDispatch = useDispatch();
  const regexName:any='[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂ ưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$'
  const regexPhone:any="^[0-9][0-9]*$"

    const frm = useFormik({
        initialValues: {
          email: "",
          password: "",
          passwordConfirm: "",
          name: "",
          phone: "",
          radio:boolean
        },
        //check validation
        validationSchema: Yup.object().shape({
          email: Yup.string().required("Email không được để trống").email('Email không đúng định dạng'),
          password: Yup.string().required("Password không được bỏ trống"),
          name:Yup.string().required('Tên không được để trống').matches(regexName,'Tên không đúng định dạng'),
          phone:Yup.string().required('Số điện thoại không được để trống').matches(regexPhone,"Số điện thoại không đúng")
        }),
        onSubmit: (values,{resetForm}) => {
        //   dispatch(signupApi(values));
        },
    
      });


  return (
 <div className="modal fade popupmodal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">THÊM QUẢN TRỊ VIÊN</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
      <form className="row" onSubmit={frm.handleSubmit}  >
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
              />
              {frm.errors.email ? (
                <p className="text-danger mb-3">{frm.errors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="form-group ">
              <p>Password</p>
              <input
                className="from-control"
                id="password"
                type="password"
                placeholder="password"
                name="password"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
                // value={values.password}
              />
             
              {/* <i
                class="fa fa-eye"
                id="togglePassword"
                onClick={() => {
                  const type =
                    document.querySelector("#password").getAttribute("type") ===
                    "password"
                      ? "text"
                      : "password";
                  document
                    .querySelector("#password")
                    .setAttribute("type", type);
                  // toggle the eye / eye slash icon
                  document
                    .querySelector("#togglePassword")
                    .classList.toggle("fa fa-eye-slash");
                }}
              ></i> */}
            </div>
            {frm.errors.password ? (
                <p className="text-danger mb-3">{frm.errors.password}</p>
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
              />
               {frm.errors.name?<p className="text-danger">{frm.errors.name}</p>:''}
            </div>
            <div className="form-group">
              <p>Phone</p>
              <input
                className="from-control"
                type="text"
                inputMode="numeric"
                placeholder="phone"
                name="phone"
                onChange={frm.handleChange}
                onBlur={frm.handleBlur}
              />
               {frm.errors.phone?<p className="text-danger">{frm.errors.phone}</p>:''}

            </div>
            
            <button className="my-5">Submit</button>
          </div>
        </form>

      </div>
      {/* <div className="modal-footer">
        <button type="button" className="btn btn-primary">Thêm</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
      </div> */}
    </div>
  </div>
</div>

  )
}