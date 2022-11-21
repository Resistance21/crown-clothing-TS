import { loadStripe } from "@stripe/stripe-js";
console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const stripePromise = loadStripe(
  "pk_test_51M4dmfDWOcIqxsD4hx73wuxD0sB5A5HkxeBch7YHWY6XxBkgcOEEOmXn5FCKmo69XtuqsQaDEtAtxxxEBJ0NiJ2R00fJLo9d89"
);
/* export const stripePromise = loadStripe(
  "pk_test_51M4dmfDWOcIqxsD4hx73wuxD0sB5A5HkxeBch7YHWY6XxBkgcOEEOmXn5FCKmo69XtuqsQaDEtAtxxxEBJ0NiJ2R00fJLo9d89"
); */
