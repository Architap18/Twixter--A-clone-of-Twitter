import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usersData from "../data/users.json";
import TweetCard from "../components/tweet/TweetCard";
import Avatar from "../components/common/Avatar";
import "./Profile.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ProfilePage = () => {
  const { username } = useParams();
  const { user: loggedInUser } = useAuth();
  const { tweets } = useContext(AppContext);

  const profile =
    usersData.find(
      (item) =>
        item.username === username ||
        item.name.toLowerCase() === username?.toLowerCase()
    ) ||
    usersData.find(
      (item) =>
        item.email === loggedInUser?.email ||
        item.username === loggedInUser?.username
    ) ||
    usersData[0];

  const userTweets = tweets.filter((tweet) => {
    const tweetUser = (tweet.user || "").toLowerCase();
    return (
      tweetUser === profile.name.toLowerCase() ||
      tweetUser === profile.username.toLowerCase()
    );
  });

  return (
    <div className="profile-page">
      <div className="profile-cover">
        <img
          src={profile.banner}
          alt="profile cover"
          className="profile-cover-img"
        />
      </div>

      <div className="profile-header">
        <Avatar src={profile.avatar} name={profile.name} size={90} />

        <div className="profile-info">
          <h2>{profile.name}</h2>
          <p className="profile-username">@{profile.username}</p>
          <p className="profile-bio">{profile.bio}</p>

          <div className="profile-login-card">
            <div className="profile-login-row">
              <span>Login</span>
              <strong>
                {loggedInUser?.username ||
                  profile.login ||
                  profile.username ||
                  "Not available"}
              </strong>
            </div>

            <div className="profile-login-row">
              <span>Email</span>
              <strong>
                {loggedInUser?.email || profile.email || "Not available"}
              </strong>
            </div>

            <div className="profile-login-row">
              <span>Name</span>
              <strong>{loggedInUser?.name || profile.name}</strong>
            </div>
          </div>

          <div className="profile-meta">
            {profile.location && <span>{profile.location}</span>}
            {profile.joined && <span>Joined {profile.joined}</span>}
          </div>

          <div className="profile-stats">
            <span>
              <strong>{profile.following}</strong> Following
            </span>
            <span>
              <strong>{profile.followers}</strong> Followers
            </span>
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
          userTweets.map((tweet) => <TweetCard key={tweet.id} tweet={tweet} />)
        ) : (
          <p className="empty-state">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
