import { useState } from 'react';

const OrderCheck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [account, setAccount] = useState('');
  const [orderID, setOrderID] = useState('');

  const handleCheckOrderStatus = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/orderStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, orderID, format: 'json', type: 'standard' }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch order status');
      }
  
      const data = await response.json();
      setOrderStatus(data);
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
      {orderStatus && (
        <div>
          {/* Display order status data */}
          <pre>{JSON.stringify(orderStatus, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OrderCheck;
