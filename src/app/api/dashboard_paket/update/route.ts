/* eslint-disable @typescript-eslint/no-explicit-any */
import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { id, nama, deskripsi, harga } = await req.json();
    await client.connect();
    const db = client.db("lembah_suhita");
    const collection = db.collection("dashboard_paket");

    const updateResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { nama, deskripsi, harga } }
    );

    return new Response(JSON.stringify({ status: true, data: updateResult }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: false, message: error.message }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
