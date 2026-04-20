export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=${process.env.GNEWS_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}