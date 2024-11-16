// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchArea from "./components/SearchArea";
import Workcapes from "./components/Workcapes";
import ResearchGroup from "./components/ResearchGroup";
import TelaPortalCAPES from "./pages/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchArea />} />
        <Route path="/home" element={<TelaPortalCAPES />} />
        <Route path="/workcapes" element={<Workcapes />} />
        <Route path="/researchgroup" element={<ResearchGroup />} />
      </Routes>
    </Router>
  );
}

export default App;
