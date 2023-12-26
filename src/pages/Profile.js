import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../features/user/userSlice'
import { FiEdit } from "react-icons/fi"
import CustomInput from '../components/CustomInput'
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";



const profileSchema = yup.object({
  firstname: yup
    .string()
    .required("Ô này không được để trống"),
  lastname: yup
    .string()
    .required("Ô này không được để trống"),
  email: yup
    .string()
    .email("Email không được để trống")
    .required("Email không được để trống"),
  Mobile: yup
    .string()
    .required("Số điện thoại không được để trống"),

});

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
export const config2 = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
    Accept: "application/json",
  },
};

const Profile = () => {
 
 
  console.log('ud',getTokenFromLocalStorage);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userState = useSelector(state => state?.auth?.user)
  const [edit, setEdit] = useState(true)
  
  useEffect(()=>{
    if(userState===""){
      navigate("/")
    }
  },[userState]);
        const formik = useFormik({
          initialValues: {
            firstname: getTokenFromLocalStorage?.firstname || "",
            lastname: getTokenFromLocalStorage?.lastname || "",
            email: getTokenFromLocalStorage?.email || "",
            mobile: getTokenFromLocalStorage?.mobile || "",
          },
          validationSchema: profileSchema,
          onSubmit: (values) => {
           
            dispatch(updateProfile({data:values,config:config2}));
            
          },
        });
        const handleSave = ()=>{
          dispatch(updateProfile({data:formik?.values,config:config2}));
          setEdit(true);
        }
        return (
    <>
      <BreadCrumb title='Thông tin cá nhân' />
      <Container class1='cart-wrapper home-wrapper-2 py-5'>
        <div className='row'>
          <div className='col-12'>
            <div className='d-flex justify-content-between align-items-center py-3'>
              <h3 className='my-3'>Chỉnh sửa thông tin</h3>
              <FiEdit className='fs-3' onClick={() => setEdit(false)} />
            </div>
          </div>
          <div className="col-12">
            <form

              className="d-flex flex-column gap-15"
              onSubmit={formik.handleSubmit}
            >
            <label className = "px-1 fw-semibold ">Họ</label>
              <CustomInput
                type="text"
                name="firstname"
                
                placeholder="firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                onBlur={formik.handleBlur("firstname")}
                disabled={edit}

              />
              <div className="error">
                {formik.touched.firstname && formik.errors.firstname}
              </div>
            <label className = "px-1 fw-semibold ">Tên</label>

              <CustomInput
                type="text"
                name="lastname"
                placeholder="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                onBlur={formik.handleBlur("lastname")}
                disabled={edit}

              />
              <div className="error">
                {formik.touched.lastname && formik.errors.lastname}
              </div>
            <label className = "px-1 fw-semibold ">Email</label>

              <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                disabled={edit}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email}
              </div>
              <label className = "px-1 fw-semibold ">Số điện thoại</label>

              <CustomInput
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange("mobile")}
                onBlur={formik.handleBlur("mobile")}
                disabled={edit}

              />
              <div className="error">
                {formik.touched.mobile && formik.errors.mobile}
              </div>



              <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                <button className="button border-0" hidden={edit} onClick={handleSave} type="">Save</button>

              </div>

            </form>
         


          </div>
        </div>
      </Container>
    </>
  )
}

export default Profile;
