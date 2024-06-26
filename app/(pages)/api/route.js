export async function GET(request) {
    const headers = request.headers;

    // Log each header
    // for (const [key, value] of headers.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    const userId = request.headers["REMOTE_USER"];
    // console.log(userId);
    return Response.json({ userId });
}

export default function handler(req, res) {
    res.status(200).json({
        headers: req.headers,
    });
}