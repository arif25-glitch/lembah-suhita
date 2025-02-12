import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  try {
    const { totalPurchased, servedDate } = await req.json();
    const db = client.db('lembah_suhita');
    const date_sessionCollection = db.collection('date_session');

    const session = await date_sessionCollection.findOne({ date: servedDate });
    if (session) {
      // Increase the filled count
      await date_sessionCollection.updateOne(
        { _id: session._id },
        { $inc: { filled: totalPurchased } }
      );
    } else {
      // Create new session document if not found
      await date_sessionCollection.insertOne({
        capacity: 250,
        filled: totalPurchased,
        date: servedDate,
      });
    }

    return new Response(JSON.stringify({ status: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: false, message: 'Internal Server Error' }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}