import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  CardElementDiv,
} from "./payment-form.styles";

import { useState, FormEvent } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selectors";
import { selectCurrentUser } from "../../store/user/user.selector";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (cardElement === null) {
      return;
    }
    setIsProcessing(true);
    try {
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      ).then((res) => {
        return res.json();
      });
      const clientSecret = response.paymentIntent.client_secret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("payment successful");
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsProcessing(false);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElementDiv>
          <CardElement />
        </CardElementDiv>

        <Button
          isLoading={isProcessing}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
