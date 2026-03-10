import { useState, useEffect } from 'react';
import { db } from '../../firestore';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

function OrdersDashboard() {
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

  return (
    <div className="mt-10 mx-[40px]">
      <h2 className="text-xl font-bold mb-4 text-gray-900">Orders</h2>

      {/* Filters */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#bd8b31]"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
        </select>
        <select
          value={filterMethod}
          onChange={e => setFilterMethod(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-[#bd8b31]"
        >
          <option value="all">All Methods</option>
          <option value="paypal">PayPal</option>
          <option value="mobile_money">Mobile Money</option>
        </select>
        <span className="ml-auto text-sm text-gray-400 self-center">{filtered.length} orders</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['Date', 'Customer', 'Product', 'Method', 'Amount', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-wide text-gray-400">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">No orders found.</td>
              </tr>
            )}
            {filtered.map(order => (
              <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{order.customerName || '—'}</p>
                  <p className="text-xs text-gray-400">{order.customerEmail}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900 max-w-[160px] truncate">{order.productName}</p>
                  <p className="text-xs text-gray-400 capitalize">{order.productType}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="capitalize">
                    {order.paymentMethod === 'mobile_money' ? 'Mobile Money' : 'PayPal'}
                  </span>
                  {order.transactionId && (
                    <p className="text-xs text-gray-400 font-mono truncate max-w-[120px]">{order.transactionId}</p>
                  )}
                </td>
                <td className="px-4 py-3 font-bold whitespace-nowrap">
                  BIF {order.amount?.toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${STATUS_STYLES[order.status] || 'bg-gray-100 text-gray-600'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {order.status !== 'confirmed' && (
                    <button
                      onClick={() => updateStatus(order.id, 'confirmed')}
                      disabled={!!updating[order.id]}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded mr-1 hover:bg-green-600 disabled:opacity-50 transition-colors"
                    >
                      Confirm
                    </button>
                  )}
                  {order.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(order.id, 'rejected')}
                      disabled={!!updating[order.id]}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 disabled:opacity-50 transition-colors"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersDashboard;
