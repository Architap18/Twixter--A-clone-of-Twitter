let cachedData = null;
let lastFetchTime = 0;
export default async function handler(req, res) {
  const now = Date.now();
  // cache for 10 minutes
  if (cachedData && now - lastFetchTime < 10 * 60 * 1000) {
    return res.status(200).json(cachedData);
  }
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?country=in&lang=en&apikey=${process.env.GNEWS_KEY}`
    );
    const data = await response.json();
    cachedData = data;
    lastFetchTime = now;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}