import { client } from "@/app/config/database_config";
// import cloudinary from "@/app/config/cloudinary_config";

export async function POST(req: Request) {
  const form = await req.formData();
  // const file = form.get('image') as File;
  const nama = form.get('name') as string;
  const deskripsi = form.get('deskripsi') as string;
  const harga = form.get('harga') as string;
  // const priceDiscount = form.get('priceDiscount') as string;

  // const arrayBuffer = await file.arrayBuffer();
  // const fileBuffer = Buffer.from(arrayBuffer);
  
  // sanitized variables
  const sanitizedDeskripsi = deskripsi && typeof deskripsi === 'string' ? deskripsi : 'defaultCollection';
  const sanitizedNama = nama && typeof nama === 'string' ? nama : 'defaultCollection';
  const sanitizedHarga = harga && typeof harga === 'string' ? harga : 'defaultCollection';

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('paket');
    const dbResult = await collection.insertOne({
      'nama': sanitizedNama,
      'deskripsi': sanitizedDeskripsi,
      'harga': sanitizedHarga,
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

  // cloudinary.uploader.upload_stream(
  //   {
  //     folder: 'uploads',
  //     public_id: file.name,
  //     resource_type: 'auto',
  //   },
  //   async (error, result) => {
  //     if (error) return Object(error);

  //     try {
  //       await client.connect();
  //       const database = client.db('lembah_suhita');
  //       const collection = database.collection('paket');
  //       const dbResult = await collection.insertOne({
  //         'name': sanitizedNama,
  //         'price': sanitizedPrice,
  //         'volume': sanitizedVolume,
  //         'imageUrl': result?.url,
  //         'priceDiscount': sanitizedPriceDiscount,
  //       });
  //       return new Response(JSON.stringify({ status: true, data: dbResult }), {
  //         headers: { 'Content-Type': 'application/json' },
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
  //         headers: { 'Content-Type': 'application/json' },
  //       });
  //     }
  //   }
  // ).end(fileBuffer);

  // return Response.json({
  //   'status': false,
  //   'insertedID': null,
  // })
}