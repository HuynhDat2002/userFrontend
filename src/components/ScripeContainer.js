  import React, { useState, useEffect } from "react";
  import { loadStripe } from "@stripe/stripe-js";
  import { Elements } from "@stripe/react-stripe-js";
  import CheckoutForm from "./CheckoutForm";
  import axios from "axios";
  import {config} from '../utils/axiosConfig'
 

  const stripePromise = loadStripe("pk_test_51OGEGLKScb87tq5muXfoTtEFSQVpJ3ol4uNmR7SHhJK34jZXtCTEAx14HobbiSFwwKYaxFZN40faCYUfbrx5BhzL00ap6FP7vI");
  const ScripeContainer =({total}) => {
      const [clientSecret, setClientSecret] = useState("");
  console.log('stripe')
  console.log(total);
    useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      checkoutHandle();
    }, []);
    const checkoutHandle = async ()=>{
      const res = await axios.post("http://localhost:5000/api/user/create-payment-intent",{amountTotal:total}, config)
        console.log('res',res);
      setClientSecret(res.data.clientSecret);
    }
    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
    return (
      <div className="d-flex justify-content-center align-items-center  body-payment form-payment body-payment">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    )
  }

  export default ScripeContainer