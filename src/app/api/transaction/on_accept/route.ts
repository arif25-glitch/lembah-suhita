import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('antrian');

    const result = await collection.insertOne(data);

    return new Response(JSON.stringify({ 
      status: true, 
      data: result 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ 
      status: false, 
      message: 'Internal Server Error' 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  } finally {
    await client.close();
  }
}