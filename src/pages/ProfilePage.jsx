import { useContext } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AppContext } from "../context/AppContext";
import usersData from "../data/users.json";
import TweetCard from "../components/tweet/TweetCard";
import Avatar from "../components/common/Avatar";
import "./Profile.css";

const formatName = (name, email) => {
  if (name) return name;
  if (!email) return "User";
  return email
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const formatHandle = (username, email) => {
  if (username) return username;
  if (!email) return "user";
  return email.split("@")[0].replace(/[._-]/g, "");
};

const ProfilePage = () => {
  const { username } = useParams();
  const { user: loggedInUser } = useAuth();
  const { tweets } = useContext(AppContext);

  const routeUser =
    usersData.find(
      (item) =>
        item.username === username ||
        item.name.toLowerCase() === username?.toLowerCase()
    ) || null;

  const activeUser =
    username === "me"
      ? loggedInUser || routeUser || usersData[0]
      : routeUser || loggedInUser || usersData[0];

  const displayName = formatName(activeUser?.name, activeUser?.email);
  const handle = formatHandle(activeUser?.username, activeUser?.email);

  const profile = {
    name: displayName,
    username: handle,
    email: activeUser?.email || loggedInUser?.email || "Not available",
    bio: activeUser?.bio || "Account on Twixter.",
    avatar:
      activeUser?.avatar ||
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
    banner:
      activeUser?.banner ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    followers: activeUser?.followers ?? 0,
    following: activeUser?.following ?? 0,
    location: activeUser?.location || "",
    joined: activeUser?.joined || "Recently"
  };

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
        <Avatar src={profile.avatar} name={profile.name} size={96} />

        <div className="profile-info">
          <div className="profile-title-row">
            <h2>{profile.name}</h2>
            <span className="profile-role">Profile</span>
          </div>

          <p className="profile-username">@{profile.username}</p>
          <p className="profile-bio">{profile.bio}</p>

          <div className="profile-meta">
            {profile.location ? <span>{profile.location}</span> : null}
            <span>Joined {profile.joined}</span>
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

      <div className="profile-account-card">
        <div className="profile-account-row">
          <span>Login</span>
          <strong>@{profile.username}</strong>
        </div>
        <div className="profile-account-row">
          <span>Email</span>
          <strong>{profile.email}</strong>
        </div>
        <div className="profile-account-row">
          <span>Name</span>
          <strong>{profile.name}</strong>
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
          <div className="profile-empty">
            <h3>No posts yet</h3>
            <p>This is your Twixter profile. Your posts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
