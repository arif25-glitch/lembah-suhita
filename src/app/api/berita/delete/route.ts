import { client } from "@/app/config/database_config";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const db = client.db('lembah_suhita');
    const beritaCollection = db.collection('berita');

    const deleteResult = await beritaCollection.deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ status: true, deletedCount: deleteResult.deletedCount }), {
      headers: { 'Content-Type': 'application/json' },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ status: false, message: error.message }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}