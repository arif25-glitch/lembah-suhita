export async function POST(req: Request) {
  const form = await req.formData();
  const id = form.get('id') as string;

  console.log(id);

  return new Response(JSON.stringify({ status: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}