import { client } from "@/app/config/database_config";

export async function GET() {
  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('sessions');
    const result = await collection.find({}).toArray();
    return new Response(JSON.stringify({
      status: true,
      data: result,
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
