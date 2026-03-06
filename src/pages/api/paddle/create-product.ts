import type { NextApiRequest, NextApiResponse } from 'next';

// Currencies with 0 minor units (no cents/subdivisions)
const ZERO_DECIMAL_CURRENCIES = new Set(['BIF', 'CLP', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF']);

function toPaddleAmount(price: number, currency: string): string {
  if (ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase())) {
    return String(Math.round(price));
  }
  // For 2-decimal currencies (USD, EUR, etc.), convert to cents
  return String(Math.round(price * 100));
}

const PADDLE_API_BASE =
  process.env.PADDLE_ENVIRONMENT === 'production'
    ? 'https://api.paddle.com'
    : 'https://sandbox-api.paddle.com';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, description, price } = req.body;
  const currency = (process.env.PADDLE_CURRENCY || 'USD').toUpperCase();
  const apiKey = process.env.PADDLE_API_KEY;

  if (!name || price === undefined || price === null) {
    return res.status(400).json({ error: 'name and price are required' });
  }

  if (!apiKey || apiKey === 'your_paddle_api_key_here') {
    return res.status(500).json({ error: 'PADDLE_API_KEY is not configured in .env.local' });
  }

  try {
    // Step 1: Create the product in Paddle
    const productRes = await fetch(`${PADDLE_API_BASE}/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description: description || name,
        tax_category: 'standard',
      }),
    });

    const productData = await productRes.json();

    if (!productRes.ok) {
      console.error('Paddle product creation failed:', productData);
      return res.status(productRes.status).json({
        error: 'Failed to create Paddle product',
        details: productData,
      });
    }

    const paddleProductId: string = productData.data.id;

    // Step 2: Create a one-time price for the product
    const priceRes = await fetch(`${PADDLE_API_BASE}/prices`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: paddleProductId,
        description: `${name} — ${currency}`,
        unit_price: {
          amount: toPaddleAmount(Number(price), currency),
          currency_code: currency,
        },
        billing_cycle: null, // One-time purchase (not a subscription)
      }),
    });

    const priceData = await priceRes.json();

    if (!priceRes.ok) {
      console.error('Paddle price creation failed:', priceData);
      return res.status(priceRes.status).json({
        error: 'Failed to create Paddle price',
        details: priceData,
      });
    }

    const paddlePriceId: string = priceData.data.id;

    return res.status(200).json({ paddleProductId, paddlePriceId });
  } catch (error) {
    console.error('Paddle API error:', error);
    return res.status(500).json({ error: 'Internal server error contacting Paddle' });
  }
}
