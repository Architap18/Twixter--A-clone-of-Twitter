import React from "react";
import trends from "../../data/trends.json"; // Requirement: Use your 10 trends
import UserCard from "../user/UserCard"; // Use the component you just updated

const RightSidebar = () => {
  return (
    <div className="rightSidebar">
      {/* Trends Section — This is your "Trends Panel" task */}
      <div className="card">
        <h3>What's happening</h3>
        {trends.length > 0 ? (
          trends.slice(0, 5).map((trend, index) => (
            <div className="newsItem" key={index}>
              <span className="trend__category">{trend.category}</span>
              <p className="trend__title"><strong>{trend.title}</strong></p>
              <span className="trend__posts">{trend.posts}</span>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "13px", color: "gray" }}>No trends available</p>
        )}
      </div>

      {/* Recommendations Section — Using UserCard with Follow Toggle */}
      <div className="card">
        <h3>Who to follow</h3>
        {/* We pass user objects to your UserCard component */}
        <UserCard 
          user={{ name: "BTS_official", username: "bts", avatar: "" }} 
        />
        <UserCard 
          user={{ name: "Tim Cook", username: "timcook", avatar: "" }} 
        />
        <UserCard 
          user={{ name: "Narendra Modi", username: "narendramodi", avatar: "" }} 
        />
      </div>
    </div>
  );
};

export default RightSidebar;