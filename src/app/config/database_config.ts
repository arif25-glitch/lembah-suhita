import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});