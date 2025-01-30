import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  const form = await req.formData();
  const id = form.get('id') as string;
  const nama = form.get('nama') as string;
  const deskripsi = form.get('deskripsi') as string;
  const harga = form.get('harga') as string;

  // sanitized variables
  const sanitizedDeskripsi = deskripsi && typeof deskripsi === 'string' ? deskripsi : 'defaultCollection';
  const sanitizedNama = nama && typeof nama === 'string' ? nama : 'defaultCollection';
  const sanitizedHarga = harga && typeof harga === 'string' ? harga : 'defaultCollection';

  const updateData = {
    'nama': sanitizedNama,
    'deskripsi': sanitizedDeskripsi,
    'harga': sanitizedHarga,
  };

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('paket');
    const dbResult = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    return new Response(JSON.stringify({ status: true, data: dbResult }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}