import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { createPaymentIntent } from "./../../utils/stripe/stripe";
import "./stripe.scss";
export const StripeCheckout = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const stripe = useStripe();
  useEffect(() => {
    //when comp mounted, make request to backend and get res of client secret key
    createPaymentIntent(user.token).then((res) => {
      console.log("PAYMENT INTENT", res.data);
      setClientSecret(res.data);
    });
  }, []);
  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleSubmit = async (e) => {};
  const handleChange = async (e) => {};
  return (
    <div>
      <form className="stripe-form" id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
    </div>
  );
};
