import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TweetCompose from "../components/tweet/TweetCompose";
import TweetCard from "../components/tweet/TweetCard";
const HomeFeed = () => {
  const [activeTab, setActiveTab] = useState("forYou");
  const { tweets } = useContext(AppContext);
  return (
    <div className="home">
      {/* Tabs */}
      <div className="home__tabs">
        <span className={activeTab === "forYou" ? "active" : ""}onClick={() => setActiveTab("forYou")}>For you</span>
        <span className={activeTab === "following" ? "active" : ""}onClick={() => setActiveTab("following")} >
          Following</span>
      </div>
      {/* Tweet Box */}
      <TweetCompose />
      {/* Feed */}
      <div className="feed">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>

    </div>
  );
};

export default HomeFeed;