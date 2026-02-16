import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";


const PayPalButton = () => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSuccess = (details, data) => {
    // Handle a successful payment here
    setPaid(true);
  };

  const handleError = (error) => {
    // Handle any payment errors here
    setError(error);
  };

  const options = {
    currency: "USD",
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  };
  

  return (
    <PayPalScriptProvider options={options}>
      <div>
        {error && <div>{error.message}</div>}
        {paid ? (
          <div>Payment successful!</div>
        ) : (
          <PayPalButtons
          className="z-20"
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "10.00",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                handlePaymentSuccess(details, data);
              });
            }}
            onError={(err) => {
              handleError(err);
            }}
          />
        )}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
