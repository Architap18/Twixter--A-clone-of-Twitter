let cachedData = {};
let lastFetchTime = {};

export default async function handler(req, res) {
  const { category = "general" } = req.query;

  try {
    const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=${category}&apikey=${process.env.GNEWS_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=300"
    );

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}