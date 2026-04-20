import React, { useState, useEffect } from "react";
import { FiSearch, FiSettings } from "react-icons/fi";
import trends from "../data/trends.json";
// Assuming Member 1 created this file
import tweetsData from "../data/tweets.json"; 

const Explore = () => {
  // HOOKS USED (Requirement)
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  // useEffect - filter results (Requirement)
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

  return (
    <div className="explore">
      <div className="explore__feed">
        {/* Search Bar */}
        <div className="explore__search">
          <FiSearch className="search__icon" />
          <input 
            placeholder="Search Twixter" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSettings className="settings__icon" />
        </div>

        {searchQuery ? (
          <div className="search__results">
            <h2 className="section__title">Search Results</h2>
            {filteredResults.length > 0 ? (
              filteredResults.map((tweet) => (
                <div key={tweet.id} className="news__card">
                  <p><strong>@{tweet.username}</strong></p>
                  <p>{tweet.content}</p>
                </div>
              ))
            ) : (
              <p className="no-results">No results found for "{searchQuery}"</p>
            )}
          </div>
        ) : (
          <>
            <div className="explore__tabs">
              <span className="active">For You</span>
              <span>Trending</span>
              <span>News</span>
              <span>Sports</span>
              <span>Entertainment</span>
            </div>

            <div className="news__hero">
              <h2>Today's News</h2>
              <div className="news__card">
                <h3>AI startups booming in 2026</h3>
                <span>1 day ago · 200K posts</span>
              </div>
              <div className="news__card">
                <h3>IPL finals breaking records</h3>
                <span>2 days ago · 150K posts</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* RIGHT SIDE (TRENDS) */}
      <div className="explore__trends">
        <h3>Trends for you</h3>
        {trends.map((trend) => (
          <div key={trend.id} className="trend">
            <span className="trend__category">{trend.category}</span>
            <h4>{trend.title}</h4>
            <span className="trend__posts">{trend.posts}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;