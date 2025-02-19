/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/app/config/database_config";

export async function GET() {
  try {
    await client.connect();
    const db = client.db('lembah_suhita');
    const collection = db.collection('dashboard_paket');
    const data = await collection.find({}).toArray();
    return new Response(JSON.stringify({ status: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: false, message: error.message }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
