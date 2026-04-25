import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TweetCard from "../components/tweet/TweetCard";

const Bookmarks = () => {
  const { bookmarks } = useContext(AppContext);

  return (
    <div className="bookmarks-page">
      <div className="page-header" style={{ padding: "15px", borderBottom: "1px solid #2f3336" }}>
        <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "800" }}>Bookmarks</h2>
      </div>

      <div className="feed">
        {bookmarks.length > 0 ? (
          bookmarks.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))
        ) : (
          <div className="no-bookmarks" style={{ padding: "40px 20px", textAlign: "center" }}>
            <h3 style={{ fontSize: "31px", fontWeight: "800", marginBottom: "8px" }}>Save posts for later</h3>
            <p style={{ color: "#71767b", fontSize: "15px", maxWidth: "330px", margin: "0 auto" }}>
              Don’t let the good ones cause you to lose them! Bookmark posts to easily find them again in the future.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
