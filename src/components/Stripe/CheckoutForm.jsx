import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [billingInfo, setBillingInfo] = useState({
    email: "",
    name: "",
    city: "",
    country: "",
    postal_code: "",
    phone: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("@TokenUser");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: {
          name: billingInfo.name,
          email: billingInfo.email,
          address: {
            city: billingInfo.city,
            country: "FR",
            postal_code: billingInfo.postal_code,
          },
          phone: billingInfo.phone,
        },
      });
      if (!error) {
        console.log("Token Généré:", paymentMethod);

        // Send the payment method to the server for payment validation
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/payment`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              payment_method: paymentMethod.id,
              amount: 1000, // Adjust the amount as needed
              currency: "EUR",
              billing_details: {
                name: billingInfo.name,
                email: billingInfo.email,
                address: {
                  city: billingInfo.city,
                  country: "FR",
                  postal_code: billingInfo.postal_code,
                },
                phone: billingInfo.phone,
              },
            }),
          }
        );

        // Handle the server response (e.g., inform the user about payment status)
        if (response.ok) {
          const data = await response.json();
          console.log("Payment success:", data);
          alert(data.message);
          setConfirmationMessage(
            "Paiement accepté, commande confirmée. Un email de confirmation va vous être envoyé."
          );
        } else {
          console.error("Payment error:", response.statusText);
          setErrorMessage(
            "Une erreur est survenue lors du paiement. Veuillez réessayer."
          );
        }
      } else {
        console.error("Payment error:", error);
        setErrorMessage(
          "Une erreur est survenue lors du paiement. Veuillez réessayer."
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage(
        "Une erreur est survenue lors du paiement. Veuillez réessayer."
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <input
          type="text"
          name="name"
          placeholder="Nom et prénom"
          value={billingInfo.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Pays"
          value={billingInfo.country}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={billingInfo.city}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="postal_code"
          placeholder="Code postal"
          value={billingInfo.postal_code}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={billingInfo.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phone"
          placeholder="Numéro de téléphone"
          value={billingInfo.phone}
          onChange={handleChange}
          required
        />
        <CardElement
          options={{
            hidePostalCode: true,
          }}
        />
        <button>Payer</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      {confirmationMessage && (
        <div className="success-message">{confirmationMessage}</div>
      )}
    </div>
  );
};
export default CheckoutForm;
