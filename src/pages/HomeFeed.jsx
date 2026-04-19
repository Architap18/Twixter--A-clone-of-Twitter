import { useState } from "react";

const HomeFeed = () => {
  const [activeTab, setActiveTab] = useState("forYou");

  return (
    <div className="home">

      {/* 🔥 Tabs */}
      <div className="home__tabs">
        <span
          className={activeTab === "forYou" ? "active" : ""}
          onClick={() => setActiveTab("forYou")}
        >
          For you
        </span>

        <span
          className={activeTab === "following" ? "active" : ""}
          onClick={() => setActiveTab("following")}
        >
          Following
        </span>
      </div>

      {/* 📝 Tweet Box */}
      <div className="tweetBox">
        <input placeholder="What’s happening?" />
        <button>Post</button>
      </div>

      {/* 📰 Feed */}
      <div className="feed">
        <div className="tweet">
          <h4>Elon Musk</h4>
          <p>Grok groks 🚀</p>
        </div>

        <div className="tweet">
          <h4>Dev</h4>
          <p>Frontend dev life 😎</p>
        </div>

        <div className="tweet">
          <h4>Meera</h4>
          <p>Sunset coding sessions 🌇</p>
        </div>
      </div>

    </div>
  );
};

export default HomeFeed;