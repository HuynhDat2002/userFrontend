import React ,{useEffect}from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";




const Login = () =>{
    axios.defaults.withCredentials=true;
    const dispatch= useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);
    const { isSuccess,user,isError ,isLoading} = authState;
    const loginSchema = yup.object({
      email: yup.string().email("Email should be valid").required("Email Address is Required"),
      password: yup.string().required("Password is Required"),
  });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values));

            
            
            
        },
    });
    useEffect(() => {
        if (authState.user!==""  && authState.message === "loggedin")     navigate('/')

    },[authState])
  
    return (
        <>
        <Meta title ={"Đăng nhập/Đăng ký"} />
        <BreadCrumb title="Đăng nhập-Đăng ký" />
        <Container class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">Đăng nhập</h3>
                        <form 
                            action="" 
                            className="d-flex flex-column gap-15"
                            onSubmit={formik.handleSubmit}
                        >
                            <CustomInput 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={formik.values.email}
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                            />
                            <div className="error">
                                { formik.touched.email && formik.errors.email }
                            </div>
                            <CustomInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formik.values.lastname}
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                            />
                            <div className="error">
                                {formik.touched.password && formik.errors.password}
                            </div>
                            <div>
                                <Link to="/forgot-password">Quên mật khẩu</Link>

                                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" type="submit">Đăng Nhập</button>
                                        <Link to="/Signup" className="button Signup">Đăng ký</Link> 
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
export default Login;





