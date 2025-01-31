import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  const { username } = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('antrian');

    const result = await collection.find({ username }).toArray();

    if (result.length > 0) {
      return Response.json({ status: true, data: result });
    }
  } catch (err) {
    console.log(err);
  }

  return Response.json({ status: false, data: null });
  // try {
  //   await client.connect();
  //   const database = client.db('lembah_suhita');
  //   const collection = database.collection('upload_bukti_pembayaran');
  //   const result = await collection.insertOne({
  //     'name': req.body.name,
  //     'phone': req.body.phone,
  //     'email': req.body.email,
  //     'address': req.body.address,
  //     'date': req.body.date,
  //     'time': req.body.time,
  //     'status': 'waiting',
  //   });
  //   return new Response(JSON.stringify({
  //     status: true,
  //     data: result,
  //   }), {
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  // }
}