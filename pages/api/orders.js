import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const dbUri = process.env.DB_URI;

    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('Cluster0');

        const searchQuery = req.query.search;
        console.log('Search query:', searchQuery); // Log the search query

        let orders;

        if (searchQuery) {
            orders = await db.collection('dp2_order_fixes').find({
                $or: [
                    { orderNumber: { $regex: searchQuery, $options: 'i' } },
                    { userId: { $regex: searchQuery, $options: 'i' } },
                    { circumstance: { $regex: searchQuery, $options: 'i' } },
                    { studio: { $regex: searchQuery, $options: 'i' } },
                    { dpNumber: { $regex: searchQuery, $options: 'i' } },
                    { itemsQtyItemSurface: { $regex: searchQuery, $options: 'i' } },
                    { retouchAdjustment: { $regex: searchQuery, $options: 'i' } },
                    { dp2Adjustment: { $regex: searchQuery, $options: 'i' } },
                    { preprintAdjustment: { $regex: searchQuery, $options: 'i' } },
                    { timeStamp: { $regex: searchQuery, $options: 'i' } },
                    { buttonClicked: { $regex: searchQuery, $options: 'i' } },
                    { userName: { $regex: searchQuery, $options: 'i' } }
                ]
            }).toArray();
        } else {
            orders = await db.collection('dp2_order_fixes').find().toArray();
        }

        console.log('Number of orders:', orders.length);

        res.json(orders);
        client.close();
    } catch (error) {
        console.error(error);
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'An error occurred', error: error.toString() });
        if (client) client.close();
    }
}