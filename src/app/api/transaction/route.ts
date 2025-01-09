// eslint-disable-next-line @typescript-eslint/no-explicit-any
import midtransClient from 'midtrans-client';

export async function POST(req: Request) {
  const { order_id, gross_amount, customer_details } = await req.json();

  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-PH2p3xxymaynPXiTrKcBmeoe',
  });

  const parameter = {
    transaction_details: {
      order_id: order_id,
      gross_amount: gross_amount, // Total amount
    },
    customer_details: customer_details, // Name, email, phone
  }
  
  try {
    // Create Snap transaction token
    const transaction = await snap.createTransaction(parameter);
    return Response.json({
      status: true,
      token: transaction.token,
    });
  } catch (error) {
    return Response.json({
      status: false,
      token: null,
      error: error
    })
  }
}