import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    const dbUri = process.env.DB_URI;
    try {
        const client = await MongoClient.connect(dbUri);
        const db = client.db('Cluster0');
        const products = await db.collection('product_catalog').find().toArray();
        res.json(products);
        client.close();
    } catch (error) {
        console.error('database connection error:', error);
    }
}