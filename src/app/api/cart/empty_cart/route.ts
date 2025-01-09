import { client } from '@/app/config/database_config';

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('users');
    const result = await collection.updateOne({ 'username': data.username }, { $set: { 'cart': [] } });
    
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