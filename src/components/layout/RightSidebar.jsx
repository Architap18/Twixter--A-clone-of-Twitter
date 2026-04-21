import { useState, useEffect } from "react";
import users from "../../data/users.json";
import UserCard from "../user/UserCard"; 

const RightSidebar = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
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
          <>
            {news.map((article, index) => {
              const posts = Math.floor(Math.random() * 90 + 10);
              return (
                <div className="newsItem" key={index}>
                  <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "700" }}>
                    {article.title}
                  </p>
                  <span style={{ color: "#71767b", fontSize: "13px" }}>
                    {posts}K posts •{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
            <div className="show-more">Show more</div>
          </>
        ) : (
          <p style={{ padding: "16px", fontSize: "13px", color: "gray", margin: 0 }}>
            No news available
          </p>
        )}
      </div>

      {/* Who to follow */}
      <div className="card" style={{ maxHeight: "480px", overflowY: "auto" }}>
        <h3>Who to follow</h3>
        {users.map((user) => (
          <UserCard key={user.id || user.username} user={user} />
        ))}
        <div className="show-more">Show more</div>
      </div>
    </div>
  );
};

export default RightSidebar;