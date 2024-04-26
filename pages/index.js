import { useState } from 'react';
import { MongoClient } from 'mongodb';
import { parse } from 'json2csv';
const dbUri = process.env.DB_URI;

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
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Orders</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="border border-gray-400 px-4 py-2 mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleExportToCSV}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Export to CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">User ID</th>
              <th className="border border-gray-300 px-4 py-2">Circumstance</th>
              <th className="border border-gray-300 px-4 py-2">Studio</th>
              <th className="border border-gray-300 px-4 py-2">Order Number</th>
              <th className="border border-gray-300 px-4 py-2">DP Numbers</th>
              <th className="border border-gray-300 px-4 py-2">Items, Quantity, Surface</th>
              <th className="border border-gray-300 px-4 py-2">Retouch Adjustment</th>
              <th className="border border-gray-300 px-4 py-2">DP2 Adjustment</th>
              <th className="border border-gray-300 px-4 py-2">Preprint Adjustment</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{order.userId}</td>
                <td className="border border-gray-300 px-4 py-2">{order.circumstance}</td>
                <td className="border border-gray-300 px-4 py-2">{order.studio}</td>
                <td className="border border-gray-300 px-4 py-2">{order.orderNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{order.dpNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{order.itemsQtyItemSurface}</td>
                <td className="border border-gray-300 px-4 py-2">{order.retouchAdjustment}</td>
                <td className="border border-gray-300 px-4 py-2">{order.dp2Adjustment}</td>
                <td className="border border-gray-300 px-4 py-2">{order.preprintAdjustment}</td>
              </tr>
            ))}
          </tbody>
        </table>
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