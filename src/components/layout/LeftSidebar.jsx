import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Home, Compass, Bell, User, Bookmark, MessageCircle } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import useAuth from "../../hooks/useAuth";
import logo from "../../images/logo.png";

const LeftSidebar = () => {
  const { currentUser } = useContext(AppContext);
  const { user: loggedInUser } = useAuth();

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
            <Bell size={20} /> Notifications
          </NavLink>
        </li>

        <li>
          <NavLink to={`/profile/${profileHandle}`} className="nav-item">
            <User size={20} /> Profile
          </NavLink>
        </li>

        <li className="nav-item">
          <Bookmark size={20} /> Bookmarks
        </li>

        <li className="nav-item">
          <MessageCircle size={20} /> Chat
        </li>
      </ul>

      <button className="post-btn">Post</button>
    </div>
  );
};

export default LeftSidebar;
