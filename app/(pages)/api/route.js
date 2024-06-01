export async function GET(request) {
    const userId = request.headers["REMOTE_USER"];
    console.log(userId);
    return Response.json({ userId });
}
