export async function GET() {
    const userId = process.env.REMOTE_USER || null;
    return Response.json({ userId });
}
