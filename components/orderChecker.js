import { useState } from 'react';
import OrderStatusCard from './orderStatusCard';

const OrderCheck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]); // Initialize as empty array
  const [account, setAccount] = useState('');
  const [orderID, setOrderID] = useState('');

  const handleCheckOrderStatus = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append('account', account);
      params.append('orderID', orderID);
      params.append('format', 'json');
      params.append('type', 'standard');

      const response = await fetch('/api/orderStatusQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order status');
      }

      const data = await response.json();
      setOrderStatus(data.Response); // Assuming the array of order status is inside the 'Response' property
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Order Check</h1>
      <div>
        <label>Account:</label>
        <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
      </div>
      <div>
        <label>Order ID:</label>
        <input type="text" value={orderID} onChange={(e) => setOrderID(e.target.value)} />
      </div>
      <button onClick={handleCheckOrderStatus} disabled={loading}>
        {loading ? 'Checking...' : 'Check Order Status'}
      </button>
      {error && <div>Error: {error}</div>}
      {orderStatus.length > 0 && ( // Check if orderStatus is an array and has elements before rendering
        <div>
          {/* Render each order status as a card */}
          {orderStatus.map(order => (
            <OrderStatusCard key={order.LabOrderID} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderCheck;
