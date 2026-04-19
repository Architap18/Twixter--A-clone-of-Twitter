import { Home, Compass, Bell, User, Bookmark, MessageCircle } from "lucide-react";
import logo from "../../images/logo.png";
const LeftSidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" className="logo-img" />
        <h2>TWIXTER</h2>
      </div>  
      <ul>
        <li><Home size={20} /> Home</li>
        <li><Compass size={20} /> Explore</li>
        <li><Bell size={20} /> Notifications</li>
        <li><User size={20} /> Profile</li>
        <li><Bookmark size={20} /> Bookmarks</li>
        <li><MessageCircle size={20} /> Chat</li>
      </ul>

      <button className="post-btn">Post</button>
    </div>
  );
};

export default LeftSidebar;