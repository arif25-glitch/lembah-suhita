import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('antrian');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ status: true, message: 'Transaction removed successfully' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ status: false, message: 'Transaction not found' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}
