import { useState, useEffect } from "react";
const RightSidebar = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=b456d0a71b284942a6a1b24a24f11f0c")
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles.slice(0, 5));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("News fetch failed:", err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="rightSidebar">
      {/* News */}
      <div className="card">
      <h3>Today's News</h3>
      {news.length > 0 ? (
  news.map((article, index) => {
    const posts = Math.floor(Math.random() * 90 + 10); // 10–100K
    return (
      <div className="newsItem" key={index}>
        <p>{article.title}</p>
        <span>
          {posts}K posts •{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
      </div>
    );
  })) : (
      <p style={{ fontSize: "13px", color: "gray" }}> No news available</p>)}
      </div>
      {/* recommedations*/}
      <div className="card">
        <h3>Who to follow</h3>
        <div className="user">
          <div className="info">
            <strong>BTS_official</strong>
            <span>@bts</span>
          </div>
          <button>Follow</button>
        </div>
        <div className="user">
          <div className="info">
            <strong>Tim Cook</strong>
            <span>@timcook</span>
          </div>
          <button>Follow</button>
        </div>
        <div className="user">
          <div className="info">
            <strong>Narendra Modi</strong>
            <span>@narendramodi</span>
          </div>
          <button>Follow</button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;