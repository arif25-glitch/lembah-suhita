import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  try {
    const { totalPurchased, servedDate } = await req.json();
    await client.connect();
    const database = client.db('lembah_suhita');
    const collection = database.collection('date_session');
    const session = await collection.findOne({ date: servedDate });

    let available: boolean;
    if (session) {
      available = (session.filled + totalPurchased) <= session.capacity;
      console.log(session)
      console.log(totalPurchased)
    } else {
      console.log(session)
      console.log(totalPurchased)
      // If no session exists, assume default capacity 250 with no bookings
      available = totalPurchased <= 250;
    }

    return new Response(JSON.stringify({ status: true, available }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}