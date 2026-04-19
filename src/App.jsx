import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import { AppProvider } from "./context/AppContext";
import LeftSidebar from "./components/layout/LeftSidebar";
import RightSidebar from "./components/layout/RightSidebar";
import "./styles/global.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="layout">
          <LeftSidebar />

          <div className="main">
            <Routes>
              <Route path="/" element={<HomeFeed />} />
            </Routes>
          </div>

          <RightSidebar />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;