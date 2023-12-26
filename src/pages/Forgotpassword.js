import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
 import { forgotPassword } from '../features/user/userSlice'

const Forgotpassword = () => {
  axios.defaults.withCredentials = true;
  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email should be valid")
      .required("Email là bắt buộc"),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("email: ", values)
       dispatch(forgotPassword(values));
    },
  });


  const authState = useSelector((state) => state);
  const { message } = authState.auth;
  const tokenPassword = localStorage.getItem("tokenPassword")
  return (
    <>
      <Meta title={"Quên mật khẩu"} />
      <BreadCrumb title="Quên mật khẩu" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đổi mật khẩu</h3>
              <p className="text-center mt-2 mb-3">
                Chúng tôi sẽ gửi cho bạn email để đổi mật khẩu
              </p>
              <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                <CustomInput
                  type="text"
                  label="Email Address"
                  id="email"
                  name="email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Gửi
                    </button>
                    <Link to="/login">Hủy</Link>
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

export default Forgotpassword;

