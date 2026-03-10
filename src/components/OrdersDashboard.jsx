import { useState, useEffect } from 'react';
import { db } from '../../firestore';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const STATUS_STYLES = {
  pending:   'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  confirmed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  rejected:  'bg-red-50 text-red-700 ring-1 ring-red-200',
};

const METHOD_BADGE = {
  paypal:       'bg-blue-50 text-blue-700',
  mobile_money: 'bg-purple-50 text-purple-700',
};

// When embedded=true the component renders inside a parent card (no wrapper div/margin)
function OrdersDashboard({ embedded = false }) {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [updating, setUpdating] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(prev => ({ ...prev, [orderId]: true }));
    const prevOrders = orders;
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    try {
      const res = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (!res.ok) throw new Error('Failed');
    } catch {
      setOrders(prevOrders);
    } finally {
      setUpdating(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const filtered = orders.filter(o => {
    if (filterStatus !== 'all' && o.status !== filterStatus) return false;
    if (filterMethod !== 'all' && o.paymentMethod !== filterMethod) return false;
    return true;
  });

  const formatDate = (ts) => {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const inner = (
    <>
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap px-6 py-3 border-b border-gray-50">
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold bg-white focus:outline-none focus:border-[#bd8b31] text-gray-600"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={filterMethod}
          onChange={e => setFilterMethod(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold bg-white focus:outline-none focus:border-[#bd8b31] text-gray-600"
        >
          <option value="all">All Methods</option>
          <option value="paypal">PayPal</option>
          <option value="mobile_money">Mobile Money</option>
        </select>
        <span className="ml-auto text-xs text-gray-400 font-semibold">
          {filtered.length} {filtered.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-50">
              {['Date', 'Customer', 'Product', 'Method', 'Amount', 'Status', 'Actions'].map(h => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50/50"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-16 text-gray-300 text-sm font-semibold">
                  No orders found.
                </td>
              </tr>
            )}
            {filtered.map(order => (
              <tr key={order.id} className="hover:bg-gray-50/70 transition-colors duration-100 group">
                <td className="px-6 py-4 text-gray-400 whitespace-nowrap text-xs font-medium">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900 text-sm">{order.customerName || '—'}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{order.customerEmail}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900 max-w-[160px] truncate text-sm">
                    {order.productName}
                  </p>
                  <p className="text-[11px] text-gray-400 capitalize mt-0.5">{order.productType}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide ${METHOD_BADGE[order.paymentMethod] || 'bg-gray-100 text-gray-600'}`}>
                    {order.paymentMethod === 'mobile_money' ? 'Mobile Money' : 'PayPal'}
                  </span>
                  {order.transactionId && (
                    <p className="text-[10px] text-gray-400 font-mono truncate max-w-[110px] mt-0.5">
                      {order.transactionId}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 font-black text-gray-900 whitespace-nowrap text-sm">
                  BIF {order.amount?.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black capitalize ${STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {order.status !== 'confirmed' && (
                      <button
                        onClick={() => updateStatus(order.id, 'confirmed')}
                        disabled={!!updating[order.id]}
                        className="text-[10px] font-black bg-emerald-500 text-white px-2.5 py-1 rounded-lg hover:bg-emerald-600 disabled:opacity-50 transition-colors uppercase tracking-wide"
                      >
                        Confirm
                      </button>
                    )}
                    {order.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(order.id, 'rejected')}
                        disabled={!!updating[order.id]}
                        className="text-[10px] font-black bg-red-500 text-white px-2.5 py-1 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors uppercase tracking-wide"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  if (embedded) return inner;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Orders</h2>
      </div>
      {inner}
    </div>
  );
}

export default OrdersDashboard;
