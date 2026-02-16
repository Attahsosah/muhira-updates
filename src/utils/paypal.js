import axios from "axios";

const paypal = axios.create({
  baseURL: "https://api.sandbox.paypal.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    password: process.env.PAYPAL_SECRET,
  },
});

export default paypal;
