// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
          <Route path="/" element={<SearchArea />} />
          <Route path="/home" element={<TelaPortalCAPES />} />
          <Route path="/workcapes" element={<Workcapes />} />
          <Route path="/researchgroup" element={<ResearchGroup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
