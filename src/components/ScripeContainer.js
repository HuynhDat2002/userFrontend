import React, { useState, useEffect, Fragment } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
// import styles from '../Stripe.css'
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";


const getTokenFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer"))
: null;

export const config2 = {
headers: {
  Authorization: `Bearer ${
    getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
  }`,
  Accept: "application/json",
},
};

  const stripePromise = loadStripe("pk_test_51OGEGLKScb87tq5muXfoTtEFSQVpJ3ol4uNmR7SHhJK34jZXtCTEAx14HobbiSFwwKYaxFZN40faCYUfbrx5BhzL00ap6FP7vI");
  const ScripeContainer = ({total,shipInfo}) => {
    
    styled.body`
       font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100vh;
    width: 100vw;
  `;
  
  styled.form`
    width: 30vw;
    min-width: 500px;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  `;
  
  styled.button`
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
    &:hover{
    filter: contrast(115%);
    };
    &:disabled{
      opacity: 0.5;
    cursor: default;
    }

  
 
  `
const authState = useSelector(state => state.auth)
console.log('auth',authState);
console.log('shipinfo',shipInfo)
 
  // const total = localStorage.getItem("total")
  const [clientSecret, setClientSecret] = useState("");
  console.log('stripe')
  console.log("total",total);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    checkoutHandle();
  }, []);
  const checkoutHandle = async () => {
    console.log(config2);
    const res = await axios.post("http://localhost:5000/api/user/create-payment-intent", { amountTotal: total,shipInfo:{
      firstname:shipInfo.firstname,
      lastname:shipInfo.lastname,
      mobile:shipInfo.mobile,
      address:shipInfo.address,
      city:shipInfo.city,
      country:shipInfo.country,
    } }, config2)
    console.log('res', res);
    setClientSecret(res.data.clientSecret);
  }
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  localStorage.setItem("optionspayment", options)
  console.log('options',localStorage.getItem("optionspayment"))

  return (
    <div className="">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />

        </Elements>
      )}
    </div>
  )
}

export default ScripeContainer