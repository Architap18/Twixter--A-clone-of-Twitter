import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import usersData from "../../data/users.json";
import { AppContext } from "../../context/AppContext";
import UserCard from "../user/UserCard"; 

const RightSidebar = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ users: [], tweets: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  
  const { tweets } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles.slice(0, 5));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("News fetch failed:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults({ users: [], tweets: [] });
      setShowDropdown(false);
      return;
    }

    const filteredUsers = usersData.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);

    const filteredTweets = tweets.filter(tweet => 
      tweet.content.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);

    setSearchResults({ users: filteredUsers, tweets: filteredTweets });
    setShowDropdown(true);
  }, [searchQuery, tweets]);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
    }
  };

  return (
    <div className="rightSidebar">
      {/* Search Bar */}
      <div className="search-wrapper">
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search"
            placeholder="Search Twixter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchSubmit}
            onFocus={() => searchQuery && setShowDropdown(true)}
          />
        </div>
        
        {showDropdown && (
          <div className="search-results-dropdown">
            {searchResults.users.length > 0 && (
              <div className="search-section">
                <h4>People</h4>
                {searchResults.users.map(user => (
                  <div 
                    key={user.id} 
                    className="search-result-item"
                    onClick={() => {
                      navigate(`/profile/${user.username}`);
                      setShowDropdown(false);
                      setSearchQuery("");
                    }}
                  >
                    <img src={user.avatar} alt={user.name} />
                    <div className="result-info">
                      <span className="result-name">{user.name}</span>
                      <span className="result-username">@{user.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchResults.tweets.length > 0 && (
              <div className="search-section">
                <h4>Tweets</h4>
                {searchResults.tweets.map(tweet => (
                  <div 
                    key={tweet.id} 
                    className="search-result-item"
                    onClick={() => {
                      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
                      setShowDropdown(false);
                    }}
                  >
                    <div className="result-info">
                      <p className="result-content">{tweet.content.substring(0, 50)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchResults.users.length === 0 && searchResults.tweets.length === 0 && (
              <div className="no-results-msg">No results for "{searchQuery}"</div>
            )}
            
            <div 
              className="see-all-results"
              onClick={() => {
                navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
                setShowDropdown(false);
              }}
            >
              Go to explore for "{searchQuery}"
            </div>
          </div>
        )}
      </div>
      {/* News */}
      <div className="card">
        <h3>Today's News</h3>
        {news.length > 0 ? (
          <>
            {news.map((article, index) => {
              const posts = Math.floor(Math.random() * 90 + 10);
              return (
                <div className="newsItem" key={index}>
                  <p style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "700" }}>
                    {article.title}
                  </p>
                  <span style={{ color: "#71767b", fontSize: "13px" }}>
                    {posts}K posts •{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
            <div className="show-more">Show more</div>
          </>
        ) : (
          <p style={{ padding: "16px", fontSize: "13px", color: "gray", margin: 0 }}>
            No news available
          </p>
        )}
      </div>

      {/* Who to follow */}
      <div className="card" style={{ maxHeight: "480px", overflowY: "auto" }}>
        <h3>Who to follow</h3>
        {usersData.slice(0, 5).map((user) => (
          <UserCard key={user.id || user.username} user={user} />
        ))}
        <div className="show-more">Show more</div>
      </div>
    </div>
  );
};

export default RightSidebar;