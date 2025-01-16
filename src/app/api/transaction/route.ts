import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('antrian');

    const result = await collection.insertOne(data);

    return new Response(JSON.stringify({ 
      status: true, 
      data: result 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ 
      status: false, 
      message: 'Internal Server Error' 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  } finally {
    await client.close();
  }
}


































// eslint-disable-next-line @typescript-eslint/no-explicit-any
// import midtransClient from 'midtrans-client';

// export async function POST(req: Request) {
//   const { order_id, gross_amount, customer_details } = await req.json();

//   const snap = new midtransClient.Snap({
//     isProduction: false,
//     serverKey: 'SB-Mid-server-PH2p3xxymaynPXiTrKcBmeoe',
//   });

//   const parameter = {
//     transaction_details: {
//       order_id: order_id,
//       gross_amount: gross_amount, // Total amount
//     },
//     customer_details: customer_details, // Name, email, phone
//   }
  
//   try {
//     // Create Snap transaction token
//     const transaction = await snap.createTransaction(parameter);
//     return Response.json({
//       status: true,
//       token: transaction.token,
//     });
//   } catch (error) {
//     return Response.json({
//       status: false,
//       token: null,
//       error: error
//     })
//   }
// }