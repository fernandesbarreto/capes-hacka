import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SearchArea from "./components/SearchArea";
import Workcapes from "./components/Workcapes";
import ResearchGroup from "./components/ResearchGroup";
import TelaPortalCAPES from "./pages/Home.js";
import TopBar from "./components/TopBar.js";
import LocalModal from "./components/Modal.js";
import "./App.css";

function App() {
  return (
    <Router>
      <LocalModal />
      <TopBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/collection" element={<SearchArea />} />
          <Route path="/home" element={<TelaPortalCAPES />} />
          <Route path="/workcapes" element={<Workcapes />} />
          <Route path="/researchgroup" element={<ResearchGroup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
