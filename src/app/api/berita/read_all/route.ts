import { client } from "@/app/config/database_config";

export async function GET() {
  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('berita');
    const dbResult = await collection.find().toArray();
    return new Response(JSON.stringify({ status: true, data: dbResult }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}