import { client } from '@/app/config/database_config';

export async function GET() {
  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('data_penjualan');
    
    const antrian = await collection.find({}).toArray();
    console.log(antrian);

    return new Response(JSON.stringify({ status: true, data: antrian }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ status: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}