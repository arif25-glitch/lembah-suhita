import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('users');

    const username = data.username;
    const id = data.productId;

    const result = await collection.find({ username: username }).toArray();
   
    result[0].cart.push(id);
    const lastResult = await collection.updateOne({ username: username }, { $set: { cart: result[0].cart } });

    return Response.json({
      'status': true,
      'data': lastResult,
    });

  } catch (err) {
    console.error(err);
  }

  return Response.json({
    'status': false,
  });
}