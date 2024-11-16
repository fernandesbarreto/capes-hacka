// src/App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchArea from "./components/SearchArea";
import Workcapes from "./components/Workcapes";
import ResearchGroup from "./components/ResearchGroup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchArea />} />
        <Route path="/workcapes" element={<Workcapes />} />
        <Route path="/researchgroup" element={<ResearchGroup />} />
      </Routes>
    </Router>
  );
}

export default App;
