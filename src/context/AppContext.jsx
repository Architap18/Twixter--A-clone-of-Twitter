import { createContext, useState, useEffect } from "react";
import tweetsData from "../data/tweets.json";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setTweets(tweetsData);
  }, []);

  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      content: text,
      likes: 0,
      comments: 0,
      user: "You",
    };

    setTweets([newTweet, ...tweets]);
  };

  return (
    <AppContext.Provider
      value={{ tweets, addTweet, darkMode, setDarkMode }}
    >
      {children}
    </AppContext.Provider>
  );
};