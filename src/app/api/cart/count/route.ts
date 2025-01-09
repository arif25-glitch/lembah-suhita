import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('users');

    const username = data.username;

    const result = await collection.findOne({ username: username });

    if (!result) {
      return new Response(JSON.stringify({ status: false, message: 'User not found' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({status: true, count: result.cart.length}), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
  }
}