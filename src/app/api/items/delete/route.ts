import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('produk');
    const dbResult = await collection.deleteOne({ _id: new ObjectId(id) });

    if (dbResult.deletedCount === 1) {
      return new Response(JSON.stringify({ status: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ status: false, message: 'Item not found' }), {
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
