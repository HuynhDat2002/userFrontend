import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { getUserCart } from "../features/user/userSlice";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import ScripeContainer from "../components/ScripeContainer";
import { Transition, Dialog } from '@headlessui/react';

const shippingSchema = yup.object({
  firstname: yup.string().required("Không được để trống"),
  lastname: yup.string().required("Không được để trống "),
  address: yup.string().required("Địa chỉ là bắt buộc"),
  city: yup.string().required("Không được để trông"),
  country: yup.string().required("Không được để trống"),
  mobile: yup.string().required("Không được để trống"),
});
const Checkout = () => {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem("customer"))
  console.log('userData', userData)
  const cartState = useSelector(state => state.auth.cartProducts)
  const [isOpenStripe, setIsOpenStripe] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [shippingInfo, setShippingInfo] = useState(null)
  const [paymentInfo, setPaymentInfo] = useState({ razorpayPaymentId: "", razorpayOrderId: "" })
  console.log(paymentInfo, shippingInfo);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price)
      setTotalAmount(sum)
    }
  }, [cartState])
  let shipCost = 0
  if (totalAmount < 500000) shipCost = 25000
  localStorage.setItem("total", parseInt(totalAmount + shipCost));
  console.log('total', localStorage.getItem('total'))
  const formik = useFormik({
    initialValues: {
      firstname: userData.firstname || "",
      lastname: userData.lastname || "",
      address: userData.address || "",
      mobile: userData.mobile || "",
      city: "",
      country: "",
      other: ""
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setIsOpenStripe(true)
      setShippingInfo(values)
      // checkOutHandler()
    },
  });

  const loadScript = (src) => {
    console.log('c')
    return new Promise((resolve) => {
      const script = document.createElement("root");
      script.src = src;
      script.onload = () => { resolve(true) }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }
  const checkOutHandler = async () => {

    // const res = await loadScript("https://checkout.razorpay.com/vi/Checkout.js")
    // if (!res) {
    //   alert("Razorpay SDK failed to Load")
    //   return;
    // }
    // console.log("res",res);
    // const result = await axios.post("http://localhost:5000/api/user/order/checkout", config)
    // if (!result) {
    //   alert("Something went wrong!")
    //   return;
    // }
    // console.log("result",result);
    // const { amount, id: order_id, currency } = result.data
    // console.log('amount',amount);
    // const options = {
    //   key: "rzp_test_mlXfKqzPMnMDua", // Enter the Key ID generated from the Dashboard
    //   amount: amount,
    //   currency: currency,
    //   name: "TrongDat",
    //   description: "Test Transaction",

    //   order_id: order_id,
    //   handler: async function (response) {
    //     const data = {
    //       orderCreationId: order_id,
    //       razorpayPaymentId: response.razorpay_payment_id,
    //       razorpayOrderId: response.razorpay_order_id,
    //       razorpaySignature:response.razorpay_signature,

    //     };

    //     const result = await axios.post("http://localhost:5000/api/user/order/paymentVertification", data, config);
    //     alert(result.data.msg)
    //     setPaymentInfo({
    //       razorpayPaymentId: result.razorpay_payment_id,
    //       razorpayOrderId: result.razorpay_order_id,

    //     })
    //   },
    //   prefill: {
    //     name: "Trongdat",
    //     email: "hltdat2002@gmail.com",
    //     contact: "0123456789",
    //   },
    //   notes: {
    //     address: "Man Thien",
    //   },
    //   theme: {
    //     color: "#61dafb",
    //   },
    // };

    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();
  }


  useEffect(() => {
    dispatch(getUserCart(config))
  }, [])
  // useEffect(() => {
  //   if(authState?.orderedProduct?.order !== null && authState?.orderedProduct?.success === true) {
  //     navigate("/my-orders")
  //   }
  // })

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2 z-0">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">DT SHOP</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Giỏ hàng
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Thông tin
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Vận chuyển
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Thanh toán
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Thông tin liên lạc</h4>
              <p className="user-details total">
                Trọng Đạt (hltdat2002@gmail.com)
              </p>
              <h4 className="mb-3">Địa chỉ giao hàng</h4>
              <form 
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Tên"
                    className="form-control"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.firstname && formik.errors.firstname
                    }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Họ"
                    className="form-control"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.lastname && formik.errors.lastname
                    }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Số điện thoại người nhận"
                    className="form-control"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.mobile && formik.errors.mobile
                    }
                  </div>
                </div>
                <div className="w-100">
                  <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Chọn quốc gia
                    </option>
                    <option value="vietnam" >
                      Việt Nam
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.country && formik.errors.country
                    }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Thành Phố/Tỉnh"
                    className="form-control"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.city && formik.errors.city
                    }
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Quận/Huyện"
                    className="form-control"
                    name="other"
                    value={formik.values.other}
                    onChange={formik.handleChange("other")}
                    onBlur={formik.handleBlur("other")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.other && formik.errors.other
                    }
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Địa chỉ"
                    className="form-control"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.address && formik.errors.address
                    }
                  </div>
                </div>



                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Trở về giỏ hàng
                    </Link>
                    <Link to="/cart" className="button">
                      Tiếp tục giao hàng
                    </Link>
                    <button className="button" type="submit" >Đặt hàng</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                cartState && cartState?.map((item, index) => {
                  return (<div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: "-10px", right: "2px" }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item?.quantity}
                        </span>
                        <img width={100} height={100} src={item?.productId?.images[0]?.url} alt="product" />
                      </div>
                      <div>
                        <h5 className="total-price">{item?.productId?.title}</h5>
                        <p className="total-price">{item?.color?.title}</p>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">{item?.price * item?.quantity}</h5>
                    </div>
                  </div>)
                })
              }

            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Tổng đơn hàng</p>
                <p className="total-price"> {totalAmount ? totalAmount : "0"} VND</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Phí giao hàng</p>
                <p className="mb-0 total-price">
                  {shipCost} VND
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Tổng chi phí</h4>
              <h5 className="total-price"> {totalAmount + shipCost} VND</h5>
            </div>
          </div>
        </div>
      </Container>
      <Transition appear show={isOpenStripe} as={Fragment}>
        <Dialog as='div' className='position-relative z-1' onClose={() => setIsOpenStripe(false)}>

          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom='opacity-0'
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="position-fixed top-0 start-0 bg-black w-100 h-100  z-2"></div>
          </Transition.Child>


          <div className='position-relative'>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-out duration-300"
              enterFrom='opacity-0'
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="position-fixed top-50 start-50 translate-middle overflow-auto mh-[95vh]  w-25 bg-white rounded-3 mx-auto p-4 ">
                <div className="d-flex justify-content-center align-items-center">
                  <ScripeContainer total={totalAmount+shipCost} shipInfo={shippingInfo} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Checkout;
