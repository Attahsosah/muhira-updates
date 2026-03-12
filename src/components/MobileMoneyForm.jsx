import { useState } from 'react';
import { useI18n } from '@/i18n/I18nContext';

function MobileMoneyForm({ productId, productName, productType, amount }) {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const mobileNumber = process.env.NEXT_PUBLIC_MOBILE_MONEY_NUMBER || '+257xxxxxxxx';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !transactionId) {
      setError(t('mobileMoney.validationError', 'Email and transaction reference are required.'));
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productName,
          productType,
          amount,
          paymentMethod: 'mobile_money',
          transactionId,
          customerEmail: email,
          customerName: name,
        }),
      });
      if (!res.ok) throw new Error('Failed to submit order');
      setSuccess(true);
    } catch {
      setError(t('mobileMoney.genericError', 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8 px-4">
        <div className="text-green-500 text-5xl mb-3">✓</div>
        <p className="text-green-700 font-bold text-sm">{t('mobileMoney.orderPending', 'Your order is pending.')}</p>
        <p className="text-gray-500 text-xs mt-1">{t('mobileMoney.confirmEmail', "You'll receive an email when it's confirmed.")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
        <p className="font-bold mb-1">{t('mobileMoney.howToPay', 'How to pay via Mobile Money:')}</p>
        <p>
          Send <strong>BIF {Number(amount).toLocaleString()}</strong> to{' '}
          <strong>{mobileNumber}</strong>, then paste your transaction reference below.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
          {t('mobileMoney.name', 'Name (optional)')}
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={t('mobileMoney.namePlaceholder', 'Your name')}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#bd8b31]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
          {t('mobileMoney.email', 'Email')} *
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t('mobileMoney.emailPlaceholder', 'your@email.com')}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#bd8b31]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">
          {t('mobileMoney.reference', 'Mobile Money Reference')} *
        </label>
        <input
          type="text"
          value={transactionId}
          onChange={e => setTransactionId(e.target.value)}
          placeholder={t('mobileMoney.referencePlaceholder', 'e.g. TX123456789')}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#bd8b31] font-mono"
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#bd8b31] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#a1772a] transition-all disabled:opacity-60"
      >
        {loading ? t('mobileMoney.submitting', 'Submitting...') : t('mobileMoney.submit', 'Submit Payment Reference')}
      </button>
    </form>
  );
}

export default MobileMoneyForm;
