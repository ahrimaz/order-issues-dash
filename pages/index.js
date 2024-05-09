import { useState } from 'react';
import { MongoClient } from 'mongodb';
import { parse } from 'json2csv';
import OrderCard from '@/components/orderCard';

const dbUri = process.env.DB_URI;

const Home = ({ orders, page }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleSearchInputChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  
    // send a request to the server-side function with the search query
    const response = await fetch(`/api/orders?search=${encodeURIComponent(query)}`);
    const matchingOrders = await response.json();
  
    // update the state with the matching orders
    setFilteredOrders(matchingOrders);
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
      <div className='flex justify-between mt-4 mb-4'>
      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" href={`/?page=${Number(page) -1}`}>Previous</a>
      <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" href={`/?page=${Number(page) + 1}`}>Next</a>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params, req, res, query } = context;
  const page = Number(context.query.page ? context.query.page : 1);
  const client = await MongoClient.connect(dbUri);
  const db = client.db('Cluster0');
  const collection = db.collection('dp2_order_fixes');
  const orders = await collection.find().skip((page - 1) * 10).limit(10).toArray();
  client.close();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      page: page,
    },
  };
}

export default Home;
