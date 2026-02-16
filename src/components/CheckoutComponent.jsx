import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router';
import paypal from '../utils/paypal';


function CheckoutComponent() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  
    const handlePayment = async () => {
      setLoading(true);
      try {
        // Create a PayPal payment order
        const { data } = await paypal.post('/payments/payment', {
          intent: 'sale',
          payer: {
            payment_method: 'paypal',
          },
          transactions: [
            {
              amount: {
                total: '10.00', // Replace with your mock order total amount
                currency: 'USD', // Replace with your currency
              },
            },
          ],
          redirect_urls: {
            return_url: 'http://localhost:3000/success', // Replace with your success URL
            cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL
          },
        });
  
        // Redirect to PayPal for payment
        router.push(data.links.find((link) => link.rel === 'approval_url').href);
      } catch (error) {
        console.error('PayPal Payment Error:', error);
      }
      setLoading(false);
    };
 return(
    <div>
    <h1>Checkout Page</h1>
    <button onClick={handlePayment} disabled={loading}>
      {loading ? 'Loading...' : 'Pay with PayPal'}
    </button>
  </div>
 )
}

export default CheckoutComponent