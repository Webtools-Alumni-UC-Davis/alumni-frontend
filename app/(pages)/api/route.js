export function GET(req, res) {
    const userId = process.env.REMOTE_USER || null;

    // Use the userId as needed
    res.status(200).json({ userId });
}
