import { useState } from 'react';

const OrderCheck = ({ account: initialAccount }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [account, setAccount] = useState(initialAccount || 'defaultAccount');
  const [orderID, setOrderID] = useState('');

  const handleCheckOrderStatus = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const params = new URLSearchParams();
      params.append('orderID', orderID);
      params.append('format', 'json');
      params.append('type', 'standard');
  
      const response = await fetch(`/api/orderStatusQuery?account=${account}`, {
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
      setOrderStatus(data.Response);
    } catch (err) {
      console.log('error:', err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Order Status Checker</h1>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Order ID:</label>
        <input
          type="text"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
      <button
        onClick={handleCheckOrderStatus}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Checking...' : 'Check Order Status'}
      </button>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      <div className="mt-8">
        {orderStatus.map(order => (
          <div key={order.LabOrderID} className="bg-gray-100 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Order ID: {order.LabOrderID}</h2>
            <p className="text-gray-700 mb-2">Customer Order ID: {order.CustomerOrderID}</p>
            <ul>
              {order.Status.map(status => (
                <li key={status.timestamp} className="flex items-center text-gray-600">
                  <span className="mr-2">{status.code}</span>
                  <span className="text-sm">{status.timestamp}</span>
                  {status.carrier && (
                    <span className="text-sm ml-4">Carrier: {status.carrier}</span>
                  )}
                  {status.tracking && (
                    <span className="text-sm ml-4">Tracking: {status.tracking}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCheck;
