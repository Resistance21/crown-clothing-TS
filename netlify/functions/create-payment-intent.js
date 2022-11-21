require("dotenv").config();
//const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
const stripe = require("stripe")(
  "sk_test_51M4dmfDWOcIqxsD4inONwgGsx3chkuEbhWiwzDK0SjytQ14IYc6hLaKzcgpqco768c3wwjFVLiHpYYy5NNVMZ5yB00gPz60j8z"
);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
