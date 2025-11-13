import { MongoClient, ServerApiVersion } from 'mongodb';
import {config} from 'dotenv'
config()
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ecommerce.dt9rlzv.mongodb.net/?appName=Ecommerce`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

const db = client.db('assignment10');

export { connect, db };