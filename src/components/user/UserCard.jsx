import React, { useContext } from "react"; 
import Avatar from "../common/Avatar";
import { AppContext } from "../../context/AppContext";

const UserCard = ({ user }) => {
  const { followedUsers, followUser, unfollowUser } = useContext(AppContext);
  
  if (!user) return null;

  const isFollowing = followedUsers.includes(user.username);

  const handleFollowClick = (e) => {
    e.stopPropagation(); 
    if (isFollowing) {
      unfollowUser(user);
    } else {
      followUser(user);
    }
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