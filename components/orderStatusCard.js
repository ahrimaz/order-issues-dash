import React from 'react';

const OrderStatusCard = ({ order }) => {
  const { Account, LabOrderID, CustomerOrderID, Status } = order;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}); // use toLocaleString to format the date and time - no need for a utility
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-xl">
      <h2 className="text-xl font-semibold mb-2">Order Details</h2>
      <p className="text-base">Account: {Account}</p>
      <p className="text-base">Lab Order ID: {LabOrderID}</p>
      <p className="text-base">Customer Order ID: {CustomerOrderID}</p>
      <h3 className="text-lg font-semibold mt-4 mb-2">Order Status</h3>
      <div className="grid grid-cols-1 gap-4 mt-2">
        {Status.map((status, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-2">
            <p className="text-base">Status: {status.code}</p>
            <p className="text-base">Timestamp: {formatTimestamp(status.timestamp)}</p>
            {status.carrier && <p className="text-base">Carrier: {status.carrier}</p>}
            {status.tracking && <p className="text-base">Tracking: {status.tracking}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusCard;
