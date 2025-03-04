import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await client.connect();
    const database = client.db('lembah_suhita');
    const antrianCollection = database.collection('antrian');
    const dataPenjualanCollection = database.collection('data_penjualan');
    await dataPenjualanCollection.updateOne(
      { _id: new ObjectId(body.id) },
      { $set: { status: 'accept' } }
    )
    await antrianCollection.updateOne(
      { _id: new ObjectId(body.id) },
      { $set: { status: 'accept' } }
    );
    return new Response(JSON.stringify({ status: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}