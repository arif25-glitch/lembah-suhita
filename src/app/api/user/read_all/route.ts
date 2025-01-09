import { client } from '@/app/config/database_config';

export async function GET() {
  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('users');
    
    const users = await collection.find({}).toArray();

    return new Response(JSON.stringify({ status: true, data: users }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ status: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}