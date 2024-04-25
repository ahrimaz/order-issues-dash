
import { MongoClient } from 'mongodb';
const dbUri = process.env.db_uri;

export default function Home({ orders }) {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-hidden">
        <div className="w-full">
          <table className="w-full table-fixed border border-gray-400">
            <TableHeader>
              <tr>
                <TableHeaderCell>User ID</TableHeaderCell>
                <TableHeaderCell>Circumstance</TableHeaderCell>
                <TableHeaderCell>Studio</TableHeaderCell>
                <TableHeaderCell>Order Number</TableHeaderCell>
                <TableHeaderCell>DP Numbers</TableHeaderCell>
                <TableHeaderCell>Items, Quantity, Surface</TableHeaderCell>
                <TableHeaderCell>Retouch Adjustment</TableHeaderCell>
                <TableHeaderCell>DP2 Adjustment</TableHeaderCell>
                <TableHeaderCell>Preprint Adjustment</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody className="bg-white">
              {orders.map(order => (
                <tr key={order._id} className="border border-gray-400">
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{order.circumstance}</TableCell>
                  <TableCell>{order.studio}</TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.dpNumber}</TableCell>
                  <TableCell>{order.itemsQtyItemSurface}</TableCell>
                  <TableCell>{order.retouchAdjustment}</TableCell>
                  <TableCell>{order.dp2Adjustment}</TableCell>
                  <TableCell>{order.preprintAdjustment}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TableHeader({ children }) {
  return <thead className="bg-gray-200">{children}</thead>;
}

function TableHeaderCell({ children }) {
  return <th className="border border-gray-400 px-4 py-2">{children}</th>;
}

function TableCell({ children }) {
  return <td className="border border-gray-400 px-4 py-2 text-sm whitespace-normal">{children}</td>;
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(dbUri);
  const db = client.db('Cluster0');
  const collection = db.collection('dp2_order_fixes');
  const orders = await collection.find().toArray();
  client.close();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)), // Convert ObjectId to string
    },
  };
}