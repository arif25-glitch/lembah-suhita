import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('users');
    const dbResult = await collection.deleteOne({ _id: new ObjectId(id) });

    if (dbResult.deletedCount === 1) {
      return new Response(JSON.stringify({ status: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ status: false, message: 'User not found' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
