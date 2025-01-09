import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('toko_arabic_parfume');
    const collection = database.collection('users');
    const itemCollection = database.collection('produk');

    const username = data.username;

    const result = await collection.findOne({ username: username });

    if (!result) {
      return new Response(JSON.stringify({ status: false, message: 'User not found' }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const cart = result.cart.map((item: string) => new ObjectId(item));

    const items = await itemCollection.find({ _id: { $in: cart } }).toArray();

    const cartItems = items.map(item => {
      const count = cart.filter((id: ObjectId) => id.equals(item._id)).length;
      return { data: item, count: count };
    });

    return new Response(JSON.stringify({ status: true, data: cartItems }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}