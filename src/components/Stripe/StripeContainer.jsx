import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51OxpBWRoeVLTCSWfwSUZgV6hUROvpIRp3fRE6iVD5cwzx3UUnpF8pp2sx9ygKKJtIudAmgi2lpkFalUGuO217a0o000YLsOogm";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
