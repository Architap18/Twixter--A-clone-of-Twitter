import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TweetCompose from "../components/tweet/TweetCompose";
import TweetCard from "../components/tweet/TweetCard";

const HomeFeed = () => {
  const { tweets } = useContext(AppContext);

  return (
    <div className="feed">
      <h2>Home</h2>

      <TweetCompose />

      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default HomeFeed;
