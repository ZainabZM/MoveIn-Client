// PaymentForm.js
import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

class PaymentForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe } = this.props;

    // Tokenize the card information
    const { token } = await stripe.createToken();

    // Handle the token (e.g., send it to your server for processing)
    if (token) {
      // Send the token to your server-side endpoint for payment processing
      fetch("/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.id,
          amount: 1000, // Amount in cents (e.g., $10.00)
          currency: "EUR",
        }),
      })
        .then((response) => {
          // Handle the response from your server
          if (response.ok) {
            console.log("Payment successful!");
          } else {
            console.error("Payment failed:", response.statusText);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement />
        </label>
        <button type="submit">Pay</button>
      </form>
    );
  }
}

export default injectStripe(PaymentForm);
