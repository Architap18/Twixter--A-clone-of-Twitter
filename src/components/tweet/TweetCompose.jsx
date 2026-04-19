import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const TweetCompose = () => {
  const [text, setText] = useState("");
  const { addTweet } = useContext(AppContext);

  const handleTweet = () => {
    if (!text.trim()) return;
    addTweet(text);
    setText("");
  };

  return (
    <div className="compose">
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleTweet}>Tweet</button>
    </div>
  );
};

export default TweetCompose;