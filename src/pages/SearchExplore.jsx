import React, { useState, useEffect } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import tweetsData from "../data/tweets.json";
const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [news, setNews] = useState([]);
  const [redditTrends, setRedditTrends] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);   
  const [trendsLoading, setTrendsLoading] = useState(true); 
  const [newsError, setNewsError] = useState(false);
  const [trendsError, setTrendsError] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Search filter
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
    } else {
      const filtered = tweetsData.filter((tweet) =>
        tweet.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchQuery]);

  // News fetch
  useEffect(() => {
  const fetchNews = async () => {
    try {
      setNewsLoading(true);
      setNewsError(false);
      // map tabs → API category
      const getCategory = (tab) => {
        switch (tab) {
          case "news":
            return "world";
          case "sports":
            return "sports";
          case "entertainment":
            return "entertainment";
          default:
            return "general";
        }
      };
      const category = getCategory(activeTab);
      const res = await fetch(`/api/news?category=${category}`);
      if (!res.ok) throw new Error("News API failed");
      const data = await res.json();
      let articles = data.articles || [];
      // make trending different
      if (activeTab === "trending") {
          articles = articles.sort(
            (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
          );
        }
          setNews(articles.slice(0, 5));
        } catch (err) {
          console.error("News fetch failed:", err);
          setNewsError(true);
        } finally {
          setNewsLoading(false);
        }
      };

      fetchNews();
    }, [activeTab]);

  // Reddit trends 
  useEffect(() => {
    const fetchReddit = async () => {
      try {
        const res = await fetch("https://www.reddit.com/r/all/top.json?limit=5&t=day",
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) throw new Error("Reddit fetch failed");
        const data = await res.json();
        const formatted = data.data.children.map((item, i) => ({
          id: i,
          title: item.data.title,
          category: `r/${item.data.subreddit}`,
          posts: `${item.data.ups.toLocaleString()} upvotes`,
        }));

        setRedditTrends(formatted);
      } catch (err) {
        console.error("Reddit error:", err);
        setTrendsError(true); 
      } finally {
        setTrendsLoading(false);
      }
    };
    fetchReddit();
  }, []);
  return (
    <div className="explore">
      <div className="explore__feed">
        {/* search*/}
        <div className="explore__search">
          <FiSearch className="search__icon" />
          <input placeholder="Search Twixter" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          <FiSettings className="settings__icon" />
        </div>
        {searchQuery ? (
          <div className="search__results">
            <h2 className="section__title">Search Results</h2>
            {filteredResults.length > 0 ? (
              filteredResults.map((tweet) => (
                <div key={tweet.id} className="news__card">
                  <p><strong>@{tweet.user || tweet.username}</strong></p>
                  <p>{tweet.content}</p>
                </div>
              ))
            ) : (
              <p className="no-results">No results found</p>
            )}
          </div>
        ) : (
          <>
            {/* tabs */}
            <div className="explore__tabs">
                <span className={activeTab === "general" ? "active" : ""} onClick={() => setActiveTab("general")}>For You</span>
                <span className={activeTab === "trending" ? "active" : ""} onClick={() => setActiveTab("trending")}>Trending</span>
                <span className={activeTab === "general-news" ? "active" : ""} onClick={() => setActiveTab("general-news")}>News</span> 
                <span className={activeTab === "sports" ? "active" : ""} onClick={() => setActiveTab("sports")}>Sports</span>
                <span className={activeTab === "entertainment" ? "active" : ""} onClick={() => setActiveTab("entertainment")}>Entertainment</span>
              </div>
            {/* news*/}
            <div className="news__hero">
              <h2>Today's News</h2>
              {newsLoading ? (
                <p>Loading news...</p>
              ) : newsError ? (
                <p>Failed to load news. Check your /api/news route.</p> 
              ) : news.length > 0 ? (
                news.map((item, index) => (
                  <div key={index} className="news__card">
                    <h3>{item.title}</h3>
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <p>No news available.</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* trends */}
      <div className="explore__trends">
        <h3>Trends for you</h3>
        {trendsLoading ? (
          <p>Loading trends...</p>) : 
          trendsError?(
          <p>Failed to load trends.</p> 
        ):redditTrends.length > 0 ? (
          redditTrends.map((trend) => (
            <div key={trend.id} className="trend">
              <span className="trend__category">{trend.category}</span>
              <h4>{trend.title}</h4>
              <span className="trend__posts">{trend.posts}</span>
            </div>
          ))
        ) : (
          <p>No trends available.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;