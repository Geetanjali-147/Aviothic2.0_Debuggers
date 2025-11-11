// This becomes a serverless function
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await client.connect();
    const db = client.db('sahayscore');
    const applications = db.collection('applications');

    if (req.method === 'GET') {
      const apps = await applications.find({}).toArray();
      res.json({ success: true, data: apps });
    } 
    else if (req.method === 'POST') {
      const newApp = req.body;
      const result = await applications.insertOne(newApp);
      res.json({ success: true, data: { ...newApp, _id: result.insertedId } });
    }
    else if (req.method === 'PATCH') {
      // Handle updates
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await client.close();
  }
}
