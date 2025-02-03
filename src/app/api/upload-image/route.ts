import cloudinary from "@/app/config/cloudinary_config";
import { client } from "@/app/config/database_config";

export async function POST(req: Request): Promise<Response> {
  const form = await req.formData();
  const file = form.get("image") as File;
  const nama = form.get("username") as string;
  const uniqueId = form.get("uniqueId") as string;

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const sanitizedNama = nama && typeof nama === 'string' ? nama : 'defaultCollection';
  
  return new Promise((resolve) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'uploads',
        public_id: file.name,
        resource_type: 'auto',
      },
      async (error, result) => {
        if (error) {
          resolve(new Response(JSON.stringify({ status: false, message: error.message }), {
            headers: { 'Content-Type': 'application/json' },
          }));
          return;
        }

        try {
          await client.connect();
          const database = client.db('lembah_suhita');
          const collection = database.collection('upload_bukti_pembayaran');
          const dbResult = await collection.insertOne({
            'name': sanitizedNama,
            'imageUrl': result?.url,
            'uniqueId': uniqueId,
          });
          resolve(new Response(JSON.stringify({ status: true, data: dbResult }), {
            headers: { 'Content-Type': 'application/json' },
          }));
        } catch (err) {
          console.log(err);
          resolve(new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
            headers: { 'Content-Type': 'application/json' },
          }));
        }
      }
    ).end(fileBuffer);
  });
}