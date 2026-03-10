import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { db } from '../../../../firestore';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { orderId, status } = req.body;

  if (!orderId || !['pending', 'confirmed', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid orderId or status' });
  }

  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);

    if (!orderSnap.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await updateDoc(orderRef, { status, updatedAt: serverTimestamp() });

    if (status === 'confirmed') {
      await sendConfirmationEmail(orderSnap.data());
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: 'Failed to update order' });
  }
}

async function sendConfirmationEmail(order: Record<string, any>) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@muhiraupdates.com';
  const senderName = process.env.BREVO_SENDER_NAME || 'Muhira Updates';

  if (!apiKey) {
    console.warn('BREVO_API_KEY not configured — skipping confirmation email');
    return;
  }

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #bd8b31;">Order Confirmed!</h2>
      <p>Hi ${order.customerName || order.customerEmail},</p>
      <p>Great news — your order has been confirmed. Here are the details:</p>
      <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
        <tr style="background:#f9fafb;">
          <td style="padding: 10px 12px; font-weight: bold; color: #374151;">Product</td>
          <td style="padding: 10px 12px; color: #111827;">${order.productName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-weight: bold; color: #374151;">Amount</td>
          <td style="padding: 10px 12px; color: #111827;">BIF ${Number(order.amount).toLocaleString()}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding: 10px 12px; font-weight: bold; color: #374151;">Payment Method</td>
          <td style="padding: 10px 12px; color: #111827;">${order.paymentMethod === 'mobile_money' ? 'Mobile Money' : 'PayPal'}</td>
        </tr>
      </table>
      <p>Thank you for your purchase! We'll be in touch shortly.</p>
      <p style="color: #6b7280; font-size: 12px;">— ${senderName}</p>
    </div>
  `;

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: order.customerEmail, name: order.customerName || order.customerEmail }],
        subject: `Order Confirmed — ${order.productName}`,
        htmlContent: html,
      }),
    });
    if (!brevoRes.ok) {
      const errBody = await brevoRes.text();
      console.error('Brevo send failed:', errBody);
    }
  } catch (err) {
    console.error('Brevo email error:', err);
  }
}
