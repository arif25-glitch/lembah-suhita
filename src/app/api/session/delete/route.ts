import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('sessions');

    const result = await collection.deleteOne({
      _id:
        new ObjectId(data.id),
    });
    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({
        status: true,
        message: 'Session deleted successfully'
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
      });
    } else {
      return new Response(JSON.stringify({
        status: false,
        message: 'Session not found'
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404
      });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      status: false,
      message: 'Internal Server Error'
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}