let cachedData = {};
let lastFetchTime = {};

export default async function handler(req, res) {
  const { category = "general" } = req.query;
  const now = Date.now();
  if (
    cachedData[category] &&
    now - (lastFetchTime[category] || 0) < 10 * 60 * 1000
  ) {
    return res.status(200).json(cachedData[category]);
  }
  try {
    const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=${category}&apikey=${process.env.GNEWS_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // store cache per category
    cachedData[category] = data;
    lastFetchTime[category] = now;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}