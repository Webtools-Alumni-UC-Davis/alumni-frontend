export async function GET(request) {
    const userId = request.headers["remote_user"];
    console.log(userId);
    return Response.json({ userId });
}
