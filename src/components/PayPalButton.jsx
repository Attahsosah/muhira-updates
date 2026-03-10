import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import { useState } from "react";

const PayPalButton = ({ amount, productName, productId, productType, customerEmail, customerName }) => {
  const [paid, setPaid] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const onApprove = async (data, actions) => {
    const details = await actions.order.capture();
    const paypalOrderId = details.id;

    setSaving(true);
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: productId || '',
          productName,
          productType: productType || 'electronics',
          amount,
          paymentMethod: 'paypal',
          paypalOrderId,
          customerEmail: customerEmail || details.payer?.email_address || '',
          customerName: customerName || (details.payer?.name
            ? `${details.payer.name.given_name} ${details.payer.name.surname}`
            : ''),
        }),
      });
      if (!res.ok) throw new Error('Order save failed');
      setPaid(true);
    } catch (err) {
      setError("Payment captured but order could not be saved. Please contact support.");
    } finally {
      setSaving(false);
    }
  };

  const onError = () => {
    setError("Payment failed. Please try again.");
  };

  if (paid) {
    return (
      <div className="text-center py-6">
        <div className="text-green-500 text-4xl mb-2">✓</div>
        <p className="text-green-600 font-bold text-sm">
          Payment successful! Your order is pending confirmation.
        </p>
      </div>
    );
  }

  if (saving) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 text-sm">Saving your order...</p>
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
        <PayPalButtons
          fundingSource={FUNDING.PAYPAL}
          style={{ layout: "vertical", shape: "rect", label: "pay" }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />

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
