import { client } from "@/app/config/database_config";
import cloudinary from "@/app/config/cloudinary_config";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get('image') as File;
  const nama = form.get('name');
  const volume = form.get('volume');
  const price = form.get('price') as string;
  const priceDiscount = form.get('priceDiscount') as string;

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);
  
  // sanitized variables
  const sanitizedVolume = volume && typeof volume === 'string' ? volume : 'defaultCollection';
  const sanitizedNama = nama && typeof nama === 'string' ? nama : 'defaultCollection';
  const sanitizedPrice = price && typeof price === 'string' ? price : 'defaultCollection';
  const sanitizedPriceDiscount = priceDiscount && typeof priceDiscount === 'string' ? priceDiscount : 'defaultCollection';

  cloudinary.uploader.upload_stream(
    {
      folder: 'uploads',
      public_id: file.name,
      resource_type: 'auto',
    },
    async (error, result) => {
      if (error) return Object(error);

      try {
        await client.connect();
        const database = client.db('toko_arabic_parfume');
        const collection = database.collection('produk');
        const dbResult = await collection.insertOne({
          'name': sanitizedNama,
          'price': sanitizedPrice,
          'volume': sanitizedVolume,
          'imageUrl': result?.url,
          'priceDiscount': sanitizedPriceDiscount,
        });
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
  ).end(fileBuffer);

  return Response.json({
    'status': false,
    'insertedID': null,
  })
}