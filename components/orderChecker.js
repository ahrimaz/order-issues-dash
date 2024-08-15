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
      console.log('error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    return timestamp.split(' ')[0]; // Extract just the date part (YYYY-MM-DD)
  };

  // Function to select the physical order excluding the ones with carrier "route"
  const selectPhysicalOrder = (orders) => {
    return orders.find(order => !order.Status.some(status => status.carrier && status.carrier.toLowerCase() === 'route'));
  };

  const selectedOrder = selectPhysicalOrder(orderStatus);

  const getTrackingUrl = (carrier, tracking) => {
    if (carrier.toLowerCase().includes('usps')) {
      return `https://tools.usps.com/go/TrackConfirmAction_input?qtc_tLabels1=${tracking}`;
    } else if (carrier.toLowerCase().includes('ups')) {
      return `https://www.ups.com/track?tracknum=${tracking}`;
    }
    // Add more carriers and URLs as needed
    return null;
  };
  

  return (
    <div className="max-w-sm mx-auto p-2 bg-white shadow-lg rounded-lg text-center">
      <div className="mb-2">
        <label className="block text-gray-700 font-bold mb-2 "></label>
        <input
          type="text"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
          className="border rounded px-4 py-2 w-full focus:outline-double focus:shadow-outline"
          placeholder="Enter your order number..."
        />
      </div>
      <button
        onClick={handleCheckOrderStatus}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        {loading ? 'Checking...' : 'Check Order Status'}
      </button>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      <div className="mt-8">
        {selectedOrder && (
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <ul className="space-y-2">
              {selectedOrder.Status.length > 0 && (
                <li key={selectedOrder.Status[0].timestamp} className="text-gray-700">
                  <div className="flex justify-center">
                    <span className="font-semibold">{selectedOrder.Status[0].code} on {formatDate(selectedOrder.Status[0].timestamp)}</span>
                  </div>
                  {selectedOrder.Status[0].carrier && (
                    <div className="ml-4 text-sm text-gray-600">
                      <span className="font-semibold">Carrier:</span> {selectedOrder.Status[0].carrier}
                    </div>
                  )}
                  {selectedOrder.Status[0].tracking && (
                    <div className="ml-4 text-sm text-gray-600">
                      <span className="font-semibold">Tracking: </span>
                      <a
                        href={getTrackingUrl(selectedOrder.Status[0].carrier, selectedOrder.Status[0].tracking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {selectedOrder.Status[0].tracking}
                      </a>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCheck;
