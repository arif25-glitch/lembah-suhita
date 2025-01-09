import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { id, username, email, password } = await req.json();

  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('users');
    const dbResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { username, email, password } }
    );
    return new Response(JSON.stringify({ status: true, data: dbResult }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
