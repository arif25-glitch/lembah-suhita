import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { id, text } = await req.json();
  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('pengumuman');
    const dbResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { text } });

    return new Response(JSON.stringify({ status: dbResult.modifiedCount > 0 }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }

  return new Response(JSON.stringify({ status: false }), {
    headers: { "Content-Type": "application/json" },
  });
}