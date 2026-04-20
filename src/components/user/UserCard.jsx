import React, { useState } from "react"; 
import Avatar from "../common/Avatar";

const UserCard = ({ user }) => {
  
  const [isFollowing, setIsFollowing] = useState(false);

  if (!user) return null;

  const handleFollowClick = (e) => {
    
    e.stopPropagation(); 
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="user-card">
      <div className="user-card__left">
        <Avatar src={user.avatar} name={user.name} size={44} />
        <div className="user-card__info">
          <h4 className="user-card__name">{user.name}</h4>
          <p className="user-card__username">@{user.username}</p>
        </div>
      </div>

      <button
        className={`user-card__follow ${isFollowing ? "following" : ""}`}
        onClick={handleFollowClick}
        type="button"
        title={isFollowing ? `Unfollow ${user.name}` : `Follow ${user.name}`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;