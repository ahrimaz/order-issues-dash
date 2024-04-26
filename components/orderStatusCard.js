import React from 'react';

const OrderStatusCard = ({ order }) => {
  const { Account, LabOrderID, CustomerOrderID, Status } = order;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-lg font-semibold">Order Details</h2>
      <p>Account: {Account}</p>
      <p>Lab Order ID: {LabOrderID}</p>
      <p>Customer Order ID: {CustomerOrderID}</p>
      <h3 className="text-lg font-semibold mt-4">Order Status</h3>
      <div className="grid grid-cols-1 gap-4 mt-2">
        {Status.map((status, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-2">
            <p>Status: {status.code}</p>
            <p>Timestamp: {status.timestamp}</p>
            {status.carrier && <p>Carrier: {status.carrier}</p>}
            {status.tracking && <p>Tracking: {status.tracking}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusCard;
