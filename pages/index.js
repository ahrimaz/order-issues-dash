import { useState } from 'react';
import { MongoClient } from 'mongodb';
import { parse } from 'json2csv';

const dbUri = process.env.DB_URI;

const OrderCard = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [image, setImage] = useState(null);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // use toLocaleString to format the date and time - no need for a utility
  };

  return (
    <div className="border border-gray-300 rounded-lg mb-4 overflow-hidden">
      <div className="p-4 cursor-pointer" onClick={toggleDetails}>
        <div className="flex justify-between">
          <div className="font-bold text-lg">{order.orderNumber}</div>
          <div className="text-gray-600">{order.userId}</div>
        </div>
        <div className="text-gray-700">{order.circumstance}</div>
      </div>
      {showDetails && (
        <div className="p-4 bg-gray-100">
          <div>Studio: {order.studio}</div>
          <div>DP Numbers: {order.dpNumber}</div>
          <div>Items, Quantity, Surface: {order.itemsQtyItemSurface}</div>
          <div>Retouch Adjustment: {order.retouchAdjustment}</div>
          <div>DP2 Adjustment: {order.dp2Adjustment}</div>
          <div>Preprint Adjustment: {order.preprintAdjustment}</div>
          <div>Date: {formatTimestamp(order.timeStamp)}</div>
          <div>DP2 Approved: {order.buttonClicked} by {order.userName}</div>
          <input type="file" onChange={handleImageChange} />
          {image && <img src={URL.createObjectURL(image)} alt="Uploaded" className="mt-4" />}
        </div>
      )}
    </div>
  );
};


const Home = ({ orders }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterOrders(query);
  };

  const filterOrders = (query) => {
    const filtered = orders.filter(order =>
      (order.userId && order.userId.toLowerCase().includes(query.toLowerCase())) ||
      (order.circumstance && order.circumstance.toLowerCase().includes(query.toLowerCase())) ||
      (order.studio && order.studio.toLowerCase().includes(query.toLowerCase())) ||
      (order.orderNumber && order.orderNumber.toLowerCase().includes(query.toLowerCase())) ||
      (order.dpNumber && order.dpNumber.toLowerCase().includes(query.toLowerCase())) ||
      (order.itemsQtyItemSurface && order.itemsQtyItemSurface.toLowerCase().includes(query.toLowerCase())) ||
      (order.retouchAdjustment && order.retouchAdjustment.toLowerCase().includes(query.toLowerCase())) ||
      (order.dp2Adjustment && order.dp2Adjustment.toLowerCase().includes(query.toLowerCase())) ||
      (order.preprintAdjustment && order.preprintAdjustment.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredOrders(filtered);
  };

  const handleExportToCSV = () => {
    const csvData = parse(filteredOrders);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Order Fixes</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="border border-gray-400 px-4 py-2 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow mr-4"
        />
        <button
          onClick={handleExportToCSV}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Export to CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        {filteredOrders.map(order => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const client = await MongoClient.connect(dbUri);
  const db = client.db('Cluster0');
  const collection = db.collection('dp2_order_fixes');
  const orders = await collection.find().toArray();
  client.close();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

export default Home;
