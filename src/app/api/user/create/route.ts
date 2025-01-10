import { client } from '@/app/config/database_config';

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('users');
    const result = await collection.insertOne(data);
    
    return Response.json({
      'status': true,
      'data': result,
    });
    
  } catch (err) {
    console.error(err);
  }

  return Response.json({
    'status': false,
  });
}