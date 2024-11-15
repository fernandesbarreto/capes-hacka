// src/App.js

import React from "react";
import SimpleSearchBar from "./components/SimpleSearchBar";
import SearchBar from "./components/SearchBar";
import ChatGPT from "./components/ChatGPT";

function App() {
  return (
    <div>
      <SearchBar />
      <ChatGPT />
    </div>
  );
}

export default App;
