import { client } from '@/app/config/database_config';

export async function POST(req: Request) {
  const { usernameOrEmail, password } = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('users');
    
    const user = await collection.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      password: password
    });

    if (user) {
      return new Response(JSON.stringify({ status: true, username: user.username }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ status: false }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ status: false }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}