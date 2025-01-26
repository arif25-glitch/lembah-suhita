import { client } from "@/app/config/database_config";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('lembah_suhita');
    const antrianCollection = database.collection('antrian');
    const sessionsCollection = database.collection('sessions');

    // Check session availability
    const session = await sessionsCollection.findOne({ name: data.session });

    if (!session) {
      return new Response(JSON.stringify({ 
        status: false, 
        message: 'Session not found' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 404
      });
    }

    if (session.terisi >= session.kosong) {
      return new Response(JSON.stringify({ 
        status: false, 
        message: 'Session is full' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      });
    }

    // Insert transaction
    const result = await antrianCollection.insertOne(data);

    // Update session terisi count
    await sessionsCollection.updateOne(
      { name: data.session },
      { $inc: { terisi: 1 } }
    );

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