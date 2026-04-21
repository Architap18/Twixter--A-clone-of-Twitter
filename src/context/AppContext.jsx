import { createContext, useState, useEffect } from "react";
import tweetsData from "../data/tweets.json";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // New state for follows and notifications
  const [followedUsers, setFollowedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setTweets(tweetsData);
  }, []);

  const addNotification = (notification) => {
    setNotifications((prev) => [notification, ...prev]);
  };

  const followUser = (user) => {
    setFollowedUsers((prev) => [...prev, user.username]);
    addNotification({
      id: Date.now(),
      type: "follow",
      message: `You started following ${user.name}`,
      timestamp: new Date().toISOString(),
    });
  };

  const unfollowUser = (user) => {
    setFollowedUsers((prev) => prev.filter((u) => u !== user.username));
    addNotification({
      id: Date.now(),
      type: "unfollow",
      message: `You unfollowed ${user.name}`,
      timestamp: new Date().toISOString(),
    });
  };

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

  // Simulate followed users posting new tweets
  useEffect(() => {
    if (followedUsers.length === 0) return;

    const interval = setInterval(() => {
      // Pick a random followed user
      const randomUsername = followedUsers[Math.floor(Math.random() * followedUsers.length)];
      
      const newTweet = {
        id: Date.now(),
        content: `This is a new simulated tweet! Hello from the void! 🌟`,
        user: randomUsername, // To be technically correct, we use username here though others use name
        likes: Math.floor(Math.random() * 10),
        comments: Math.floor(Math.random() * 5),
      };

      setTweets((prev) => [newTweet, ...prev]);
      addNotification({
        id: Date.now() + 1,
        type: "post",
        message: `@${randomUsername} posted a new tweet.`,
        timestamp: new Date().toISOString(),
      });
    }, 30000); // Trigger every 30 seconds

    return () => clearInterval(interval);
  }, [followedUsers]);

  return (
    <AppContext.Provider
      value={{
        tweets,
        addTweet,
        darkMode,
        setDarkMode,
        followedUsers,
        followUser,
        unfollowUser,
        notifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};