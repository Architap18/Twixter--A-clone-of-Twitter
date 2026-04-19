import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import TweetCompose from "../components/tweet/TweetCompose";

const HomeFeed = () => {
  const { tweets } = useContext(AppContext);

  return (
    <div className="feed">
      <h2>Home</h2>

      <TweetCompose />

      {tweets.map((tweet) => (
        <div key={tweet.id} className="tweet">
          <h4>{tweet.user}</h4>
          <p>{tweet.content}</p>
          <div>
            ❤️ {tweet.likes} | 💬 {tweet.comments}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;