import { NavLink } from "react-router-dom";
import {Home,Compass,Bell,User,Bookmark,MessageCircle,} from "lucide-react";
import logo from "../../images/logo.png";
const LeftSidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        <h2>TWIXTER</h2>
      </div>
      {/* Navigation */}
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

        <li className="nav-item">
          <Bell size={20} /> Notifications
        </li>

        <li className="nav-item">
          <User size={20} /> Profile
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