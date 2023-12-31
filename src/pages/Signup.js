import React,{useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch , useSelector} from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate} from "react-router-dom";
import { resetAuthState } from "../features/user/userSlice";


const signUpSchema = yup.object({
    firstname: yup.string().required("Không được bỏ trống"),
    lastname: yup.string().required("Không được bỏ trống"),
    email: yup.string().email("Email là bắt buộc").required("Email là bắt buộc"),
    mobile: yup.string().required("Số điện thoại không được bỏ trống"),
    password: yup.string().required("Password không được bỏ trống"),
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const authState = useSelector((state) => state.auth);
  const { isError, isSuccess, isLoading, message,createdUser } = authState;
  console.log(authState)

//   useEffect(() => {
//     if (message==="register success") {
//       navigate("/login",{relative:"path"});
//     }
//   }, [isSuccess]);
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values))
           
        },
    });
    useEffect(()=>{
        if(createdUser && !authState?.user?.token){
            navigate('/login')

        }
    },[authState])
  
    return (
        <>
        <Meta title ={"Đăng ký"} />
        <BreadCrumb title="Đăng ký" />
        <Container class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className="text-center mb-3">Đăng ký</h3>
                        <form
                            action=""
                            onSubmit={formik.handleSubmit}
                            className="d-flex flex-column gap-15"
                        >
                            <CustomInput
                                type="text"
                                name="firstname"
                                placeholder="First Name"
                                value={formik.values.firstname}
                                onChange={formik.handleChange("firstname")}
                                onBlur={formik.handleBlur("firstname")}
                            />
                            <div className="error">
                                {
                                    formik.touched.firstname && formik.errors.firstname
                                }
                            </div>
                            <CustomInput
                                type="text"
                                name="lastname"
                                placeholder="Last Name"
                                value={formik.values.lastname}
                                onChange={formik.handleChange("lastname")}
                                onBlur={formik.handleBlur("lastname")}
                            />
                            <div className="error">
                                {
                                    formik.touched.lastname && formik.errors.lastname
                                }
                            </div>
                            <CustomInput 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={formik.values.email}
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                            />
                            <div className="error">
                                {
                                    formik.touched.email && formik.errors.email
                                }
                            </div>
                            <CustomInput
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formik.values.mobile}
                                onChange={formik.handleChange("mobile")}
                                onBlur={formik.handleBlur("moblie")}
                            />
                            <div className="error">
                                {
                                    formik.touched.mobile && formik.errors.mobile
                                }
                            </div>
                            <CustomInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formik.values.password}
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                            />
                            <div className="error">
                                {
                                    formik.touched.password && formik.errors.password
                                }
                            </div>
                            <div>
                                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button border-0" type="submit">Đăng ký</button>
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
export default Signup;