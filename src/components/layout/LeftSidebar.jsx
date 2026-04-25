import { Bell, Compass, Home, MessageCircle, User, Bookmark } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import useAuth from "../../hooks/useAuth";
import logo from "../../images/logo.png";
import PostModal from "../tweet/PostModal";

const LeftSidebar = () => {
  const { currentUser, notifications } = useContext(AppContext);
  const unreadCount = notifications ? notifications.filter((n) => !n.isRead).length : 0;
  const { user: loggedInUser } = useAuth();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const profileHandle =
    loggedInUser?.username ||
    currentUser?.username ||
    "me";

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        <h2>TWIXTER</h2>
      </div>

      <ul>
        <li>
          <NavLink to="/" className="nav-item">
            <Home size={20} /> Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/explore" className="nav-item">
            <Compass size={20} /> Explore
          </NavLink>
        </li>

        <li>
          <NavLink to="/notifications" className="nav-item">
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </div>
            Notifications
          </NavLink>
        </li>

        <li>
          <NavLink to={`/profile/${profileHandle}`} className="nav-item">
            <User size={20} /> Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/bookmarks" className="nav-item">
            <Bookmark size={20} /> Bookmarks
          </NavLink>
        </li>

        <li className="nav-item">
          <MessageCircle size={20} /> Chat
        </li>
      </ul>


      <button className="post-btn" onClick={() => setIsPostModalOpen(true)}>
        Post
      </button>

      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
      />
    </div>
  );
};

export default LeftSidebar;
