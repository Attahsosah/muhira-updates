import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { useState } from "react";

const PayPalButton = ({ amount, productName }) => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);

  const currency = process.env.NEXT_PUBLIC_PAYPAL_CURRENCY || "USD";

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: productName,
          amount: {
            currency_code: currency,
            value: String(amount),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(() => setPaid(true));
  };

  const onError = () => {
    setError("Payment failed. Please try again.");
  };

  if (paid) {
    return (
      <div className="text-center py-6">
        <p className="text-green-600 font-bold text-sm">
          Payment successful! Thank you for your purchase.
        </p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency,
        components: "buttons",
      }}
    >
      {error && (
        <p className="text-red-500 text-sm text-center mb-3">{error}</p>
      )}

      <div className="space-y-2">
        {/* PayPal account button */}
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          style={{ layout: "vertical", shape: "rect", label: "pay" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />

        {/* Debit / Credit card button */}
        <PayPalButtons
          fundingSource={FUNDING.CARD}
          style={{ layout: "vertical", shape: "rect" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
