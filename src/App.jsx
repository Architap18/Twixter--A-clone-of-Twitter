import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import Explore from "./pages/SearchExplore";
import Notifications from "./pages/Notifications";
import ProfilePage from "./pages/ProfilePage";
import { AppProvider } from "./context/AppContext";
import LeftSidebar from "./components/layout/LeftSidebar.jsx";
import RightSidebar from "./components/layout/RightSidebar.jsx";
import Login from "./pages/Login";
import "./styles/global.css";


const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <LeftSidebar />
      <div className="main">
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<Notifications />} />
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
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />

          {/* All protected routes — redirects to /login if not logged in */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;