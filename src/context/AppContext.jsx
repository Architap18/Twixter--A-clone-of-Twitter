import { createContext, useState, useEffect, useCallback } from "react";
import tweetsData from "../data/tweets.json";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // New state for follows, notifications, and bookmarks
  const [followedUsers, setFollowedUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    setTweets(tweetsData);
  }, []);

  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [{ ...notification, isRead: false }, ...prev]);
  }, []);

  const markNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => {
      const hasUnread = prev.some((n) => !n.isRead);
      if (!hasUnread) return prev;
      return prev.map((notif) => ({ ...notif, isRead: true }));
    });
  }, []);

  const followUser = useCallback((user) => {
    setFollowedUsers((prev) => [...prev, user.username]);
    addNotification({
      id: Date.now(),
      type: "follow",
      message: `You started following ${user.name}`,
      timestamp: new Date().toISOString(),
    });
  }, [addNotification]);

  const unfollowUser = useCallback((user) => {
    setFollowedUsers((prev) => prev.filter((u) => u !== user.username));
    addNotification({
      id: Date.now(),
      type: "unfollow",
      message: `You unfollowed ${user.name}`,
      timestamp: new Date().toISOString(),
    });
  }, [addNotification]);

  const addTweet = useCallback((text) => {
    const newTweet = {
      id: Date.now(),
      content: text,
      likes: 0,
      comments: 0,
      user: "You",
    };

    setTweets((prev) => [newTweet, ...prev]);
  }, []);

  const toggleBookmark = useCallback((tweet) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.some((b) => b.id === tweet.id);
      if (isBookmarked) {
        return prev.filter((b) => b.id !== tweet.id);
      } else {
        return [tweet, ...prev];
      }
    });
  }, []);

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
        markNotificationsAsRead,
        bookmarks,
        toggleBookmark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};