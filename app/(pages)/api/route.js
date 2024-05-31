export async function GET(request, Response) {
    const userId =  request.headers["remote_user"];
    return Response.json({ userId });
}
