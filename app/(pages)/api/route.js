export async function GET(request) {
    const userId = request.headers["remote_user"];
    return Response.json({ userId });
}
