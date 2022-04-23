import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { StripeCheckout } from "./../../components/stripe/stripe.component";
//load stripe outside of comp to avoid recreating stripe obj on every render
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
export const PaymentPage = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={stripePromise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
          <p>Complete your purchase</p>
        </div>
      </Elements>
    </div>
  );
};
