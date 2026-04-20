import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import Explore from "./pages/SearchExplore";
import ProfilePage from "./pages/ProfilePage";
import { AppProvider } from "./context/AppContext";
import LeftSidebar from "./components/layout/LeftSidebar.jsx";
import RightSidebar from "./components/layout/RightSidebar.jsx";
import "./styles/global.css";

function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <LeftSidebar />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </div>
      {location.pathname === "/" && <RightSidebar />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout />
      </Router>
    </AppProvider>
  );
}

export default App;