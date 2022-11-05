import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../../redux/reducers/userReducer";
import * as Yup from "yup";

type Props = {};

export default function Login({}: Props) {
  const dispatch = useDispatch();

  const frm = useFormik({
    initialValues: {
      //Dữ liệu ban đầu mặc định của form
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      //check validation
      email: Yup.string()
        .required("Email không được bỏ trống")
        .email("Email không đúng định dạng"),
      password: Yup.string().required("Password không được bỏ trống"),
    }),
    onSubmit: (values: any) => {
      console.log(values);
      const action: any = loginApi(values);
      dispatch(action);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="login-content ">
      <form className="form-group " onSubmit={frm.handleSubmit}>
        <h3>Sign In to Fiverr</h3>
        <div className="form-input mb-3">
          <p>Email</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          {frm.errors.email ? (
            <p className="text-danger mb-3">{frm.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-input">
          <p>Password</p>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={frm.handleChange}
            onBlur={frm.handleBlur}
          />
          {frm.errors.password ? (
            <p className="text-danger text-start mb-3">{frm.errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="form-button">
          {/* <button >Register</button> */}
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
}
