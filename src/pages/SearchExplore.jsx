import { FiSearch, FiSettings } from "react-icons/fi";
import trends from "../data/trends.json";
const Explore = () => {
  return (
    <div className="explore">
      {/* LEFT SIDE */}
      <div className="explore__feed">
        {/* Search */}
        <div className="explore__search">
          <FiSearch />
          <input placeholder="Search" />
          <FiSettings />
        </div>
        {/* Tabs */}
        <div className="explore__tabs">
          <span className="active">For You</span>
          <span>Trending</span>
          <span>News</span>
          <span>Sports</span>
          <span>Entertainment</span>
        </div>
        {/* News */}
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
      {/* RIGHT SIDE (TRENDS) */}
      <div className="explore__trends">
        <h3>Trends for you</h3>
        {trends.map((trend, index) => (
          <div key={index} className="trend">
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