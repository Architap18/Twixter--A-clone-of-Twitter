import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import usersData from "../data/users.json";
import TweetCard from "../components/tweet/TweetCard";
import Avatar from "../components/common/Avatar";
import "./Profile.css";

const ProfilePage = () => {
  const { username } = useParams();
  const { tweets } = useContext(AppContext);

  const user =
    usersData.find(
      (item) =>
        item.username === username ||
        item.name.toLowerCase() === username?.toLowerCase()
    ) || usersData[0];

  const userTweets = tweets.filter((tweet) => {
    const tweetUser = (tweet.user || "").toLowerCase();
    const nameMatch = user.name.toLowerCase();
    const usernameMatch = user.username.toLowerCase();
    return tweetUser === nameMatch || tweetUser === usernameMatch;
  });

  return (
    <div className="profile-page">
      <div className="profile-cover">
        <img src={user.banner} alt="profile cover" className="profile-cover-img" />
      </div>

      <div className="profile-header">
        <Avatar name={user.name} src={user.avatar} size={88} />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p className="profile-username">@{user.username}</p>
          <p className="profile-bio">{user.bio}</p>

          <div className="profile-meta">
            {user.location && <span>{user.location}</span>}
            {user.joined && <span>Joined {user.joined}</span>}
          </div>

          <div className="profile-stats">
            <span><strong>{user.following}</strong> Following</span>
            <span><strong>{user.followers}</strong> Followers</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button className="active">Posts</button>
        <button>Replies</button>
        <button>Media</button>
        <button>Likes</button>
      </div>

      <div className="profile-tweets">
        {userTweets.length > 0 ? (
          userTweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))
        ) : (
          <p className="empty-state">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
