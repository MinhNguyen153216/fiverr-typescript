import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { AppDispatch } from "../../redux/configStore";
import { Signup } from "../../redux/models/authModel";
import { registerApi } from "../../redux/reducers/userReducer";

type Props = {};

export default function Register({}: Props) {
  const dispatch: AppDispatch = useDispatch();
  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      gender: true,
      birthday: "",
    },

    validationSchema: Yup.object().shape({
      // Check validation
      email: Yup.string()
        .required("Email is required!")
        .email("Email is not in the correct format!"),
      password: Yup.string().required("Password is required!"),
      name: Yup.string().required("Name is requied!"),
      phone: Yup.string().matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "Please input Vietnamese phone pattern!"
      ),
    }),

    onSubmit: (values: Signup) => {
     
      dispatch(registerApi(values));
    },
  });

  return (
    <section className="register">
      <div className="container">
        <div className="register-title">
          <h1>Sign up for a Fiverr account - join Fiverr today!</h1>
        </div>
        <div className="register-form">
          <form action="" onSubmit={form.handleSubmit}>
            <div className="form-title text-center">Join Fiverr</div>
            <div>
              <div className="form-gr">
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder=" "
                  type="text"
                  name="name"
                  required
                />
                <label htmlFor="name">
                  Name<span>*</span>
                </label>
              </div>
              {form.errors.name ? (
                <span className="text-danger">{form.errors.name}</span>
              ) : (
                ""
              )}
              <div className="form-gr">
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder=" "
                  type="text"
                  name="email"
                  required
                />
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
              </div>
              {form.errors.email ? (
                <span className="text-danger">{form.errors.email}</span>
              ) : (
                ""
              )}
              <div className="form-gr">
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder=" "
                  type="password"
                  name="password"
                  required
                />
                <label htmlFor="password">
                  Password<span>*</span>
                </label>
              </div>
              {form.errors.password ? (
                <span className="text-danger">{form.errors.password}</span>
              ) : (
                ""
              )}
              <div className="form-gr">
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder=" "
                  type="text"
                  name="phone"
                  
                />
                <label htmlFor="phone">Phone</label>
              </div>
              {form.errors.phone ? (
                <span className="text-danger">{form.errors.phone}</span>
              ) : (
                ""
              )}
              <div className="form-gr">
                <input
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  placeholder=" "
                  type="date"
                  name="birthday"
                  pattern="(((20[012]\d|19\d\d)|(1\d|2[0123]))-((0[0-9])|(1[012]))-((0[1-9])|([12][0-9])|(3[01])))|(((0[1-9])|([12][0-9])|(3[01]))-((0[0-9])|(1[012]))-((20[012]\d|19\d\d)|(1\d|2[0123])))|(((20[012]\d|19\d\d)|(1\d|2[0123]))\/((0[0-9])|(1[012]))\/((0[1-9])|([12][0-9])|(3[01])))|(((0[0-9])|(1[012]))\/((0[1-9])|([12][0-9])|(3[01]))\/((20[012]\d|19\d\d)|(1\d|2[0123])))|(((0[1-9])|([12][0-9])|(3[01]))\/((0[0-9])|(1[012]))\/((20[012]\d|19\d\d)|(1\d|2[0123])))|(((0[1-9])|([12][0-9])|(3[01]))\.((0[0-9])|(1[012]))\.((20[012]\d|19\d\d)|(1\d|2[0123])))|(((20[012]\d|19\d\d)|(1\d|2[0123]))\.((0[0-9])|(1[012]))\.((0[1-9])|([12][0-9])|(3[01])))/"
                />
                <label htmlFor="birthday">Birthday</label>
                {form.errors.birthday ? (
                  <span className="text-danger">{form.errors.birthday}</span>
                ) : (
                  ""
                )}
              </div>
              <div className="form-gr d-flex align-items-center justify-content-between">
                <p className="mb-0 me-3">Gender</p>
                <div
                  className="d-flex align-items-center"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                >
                  <input
                    placeholder=" "
                    type="radio"
                    value="true"
                    name="gender"
                  />
                  <span className="me-3">Male</span>

                  <input
                    placeholder=" "
                    type="radio"
                    value="fasle"
                    name="gender"
                  />
                  <span>Female</span>
                </div>
              </div>
              <div className="btn-wrapper form-gr">
                <button type="submit" className="btn submit">
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
