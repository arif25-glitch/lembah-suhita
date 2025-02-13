import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";
import cloudinary from "@/app/config/cloudinary_config";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const id = form.get('id') as string;
    const title = form.get('title') as string;
    const content = form.get('content') as string;
    const imageField = form.get('image');
    const existingImageUrl = form.get('imageUrl') as string || '';

    // Sanitize title and content
    const sanitizedTitle = title && typeof title === 'string' ? title.trim() : 'Untitled';
    const sanitizedContent = content && typeof content === 'string' ? content.trim() : '';

    // Handle image upload: if a new image file is provided, build a new imageUrl; otherwise, use existingImageUrl.
    if (imageField) {
      const file = imageField as File;
      const arrayBuffer = await file.arrayBuffer();
      const fileBuffer = Buffer.from(arrayBuffer);

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
              const updateData = {
                title: sanitizedTitle,
                content: sanitizedContent,
                imageUrl: result?.url,
              };
              const dbResult = await collection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateData }
              );
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
    } else {
      await client.connect();
      const database = client.db('lembah_suhita');
      const collection = database.collection('berita');
      const updateData = {
        title: sanitizedTitle,
        content: sanitizedContent,
        imageUrl: existingImageUrl
      };
      const dbResult = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      return new Response(JSON.stringify({ status: true, data: dbResult }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}