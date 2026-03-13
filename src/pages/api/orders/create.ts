import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firestore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    productId,
    productName,
    productType,
    amount,
    paymentMethod,
    transactionId,
    customerEmail,
    customerName,
    paypalOrderId,
    proofImageUrl,
  } = req.body;

  if (!productId || !productName || amount === undefined || !paymentMethod || !customerEmail) {
    return res.status(400).json({ error: 'Missing required fields: productId, productName, amount, paymentMethod, customerEmail' });
  }

  if (!['paypal', 'mobile_money'].includes(paymentMethod)) {
    return res.status(400).json({ error: 'Invalid paymentMethod' });
  }

  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      productId,
      productName,
      productType: productType || 'electronics',
      amount: Number(amount),
      paymentMethod,
      status: 'pending',
      transactionId: transactionId || '',
      customerEmail,
      customerName: customerName || '',
      paypalOrderId: paypalOrderId || '',
      proofImageUrl: proofImageUrl || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return res.status(200).json({ orderId: docRef.id });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ error: 'Failed to create order' });
  }
}
