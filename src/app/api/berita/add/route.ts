import { client } from "@/app/config/database_config";
import cloudinary from "@/app/config/cloudinary_config";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("image") as File;
  const title = form.get("title") as string; 
  const content = form.get("content") as string;

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const sanitiziedTitle = title && typeof title === 'string' ? title : 'defaultTitle';
  const sanitiziedContent = content && typeof content === 'string' ? content : 'defaultContent';

  return new Promise<Response>((resolve) => {
    cloudinary.uploader.upload_stream(
      {
        folder: 'berita',
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
          const collection = database.collection('berita');
          const dbResult = await collection.insertOne({
            title: sanitiziedTitle,
            content: sanitiziedContent,
            imageUrl: result?.url,
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