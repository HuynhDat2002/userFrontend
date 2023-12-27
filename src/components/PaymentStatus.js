import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { useStripe } from '@stripe/react-stripe-js';
import { CiCircleCheck } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { BsHourglassSplit } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { createOrder } from '../features/user/userSlice';
import {config2} from '../utils/axiosConfig'
import { getUserCart,emptyCart } from '../features/user/userSlice';
const PaymentStatus = () => {
  const stripe = useStripe();
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null);
  const [statusIcon, setStatusIcon] = useState(null);

  const [totalAmount, setTotalAmount] = useState(0)
  const auth = useSelector((state)=>state?.auth?.user)

  const cartState = useSelector(state => state.auth.cartProducts)
  useEffect(() => {
    dispatch(getUserCart(config2(auth.token)))
  }, [])
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index <cartState?.length; index++) {
          sum = sum + Number(cartState[index].quantity) 
          setTotalAmount(sum)
        }
        if(cartState?.length===0){
          setTotalAmount(0);
        }
      }, [cartState]);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Thanh toán thành công!");
          setStatusIcon(<CiCircleCheck style={{ color: 'green', height: '100px', width: 'auto', fontWeight: 900 }} />)
          console.log('paymentintent',paymentIntent)  
           const {amount,shipping,id,currency,payment_method_types} = paymentIntent
           dispatch(createOrder({shippingInfo:shipping, orderItems:cartState, totalPrice:amount, totalPriceAfterDiscount:amount, paymentInfo:{
                id:id,
                currency:currency,
                paymentTypes:payment_method_types,
           },config:config2(auth.token)}))
           setTimeout(()=>{
              dispatch(emptyCart(config2(auth.token)));
           },200)


          break;
        case "processing":
          setMessage("Đang xử lý.");
          setStatusIcon(<BsHourglassSplit style={{ color: 'orange', height: '100px', width: 'auto', fontWeight: 900 }} />)

          break;
        case "requires_payment_method":
          setMessage("Thanh toán không thành công. Vui lòng thử lại.");
          setStatusIcon(<MdErrorOutline style={{ color: 'red', height: '100px', width: 'auto', fontWeight: 900 }} />)

          break;
        default:
          setMessage("Xảy ra lỗi.");
          setStatusIcon(<MdErrorOutline style={{ color: 'red', height: '100px', width: 'auto', fontWeight: 900 }} />)

          break;
      }
    });

  }, [stripe]);

  
  return (
    <>
      <div id='root' className='z-1.bg-transparent' style={{margin:"350px",backgroundColor:"white"}}>

        <div className="position-absolute top-50 start-50 translate-middle">
          <div className='d-flex flex-column gap-3'>


            <div className='d-flex justify-content-center align-items-center'>{statusIcon}</div>
            <div className='d-flex justify-content-center align-items-center'>{message}</div>
            <div className='d-flex justify-content-center align-items-center'>
              <Link to="/">Quay về trang chủ</Link>
            </div>


          </div>
        </div>
      </div>
    </>
  );

}

export default PaymentStatus