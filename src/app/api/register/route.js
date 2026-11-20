export async function POST(request) {
  try {
    const data = await request.json();
    return Response.json({ success: true, message: 'Registration received', data });
  } catch (error) {
    return Response.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  }
}
