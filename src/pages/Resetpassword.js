import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {useFormik} from "formik";
import resetPassword from "../features/user/userSlice";

const passwordSchema = yup.object({
  password: yup.string().required("Password is Required"),
});

const Resetpassword = () => {
  const location = useLocation ()
  const getToken = location.pathname.split("/")[2]
  console.log(getToken);
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const formik = useFormik({
      initialValues: {
          
          password: "",
      },
      validationSchema: passwordSchema,
      onSubmit: (values) => {
          dispatch(resetPassword({token:getToken,password:values.password}));
            
              navigator('/login')

      },
  });

  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
               <div className="error">
                  { formik.touched.password && formik.errors.password}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0">Ok</button>
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
