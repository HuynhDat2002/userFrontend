import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const  CheckoutForm = () =>{

  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    // const card = elements.getElement(PaymentElement);
    // const result = await stripe.createToken(card);
    // if (result.error) {
    //   // Show error to your customer.
    //   console.log(result.error.message);
    // } else {
    //   // Send the token to your server.
    //   // This function does not exist yet; we will define it in the next step.
    //   stripeTokenHandler(result.token);
    // }
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/paymentstatus",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="">

      <form id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit" className="button-payment mt-3">
          <span id="button-text">
            {isLoading ? <div className="spinner-border text-light" id=""></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}

export default CheckoutForm;