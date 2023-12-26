 import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetPassword } from '../features/user/userSlice'
const Resetpassword = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const authState = useSelector((state) => state);
  const { isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    
    if (message==="reset password success") {
      navigate("/login",{relative:"path"});
    }
  }, [isSuccess]);

  console.log('token: ', token);
  let schema = yup.object().shape({

    password: yup.string().required("Mật khẩu không được bỏ trống"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Xác nhận mật khẩu'),

  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      token: token
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(resetPassword(values));
    },
  });
  return (
    <>
      <Meta title={"Đổi mật khẩu"} />
      <BreadCrumb title="Đổi mật khẩu" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đổi mật khẩu</h3>
          
              <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>

                <CustomInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error mt-2">
                  {formik.touched.password && formik.errors.password}
                </div>
                <CustomInput
                  type="password"
                  placeholder="Confirm Password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                  value={formik.values.confirmPassword}
                />
                <div className="error mt-2">
                  {formik.touched.confirmPassword && formik.errors.confirmPassword}
                  {formik.touched.confirmPassword && formik.values.confirmPassword === formik.values.password && (
                    <div className="text-success">Password matched</div>
                  )}

                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Gửi</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Resetpassword;
