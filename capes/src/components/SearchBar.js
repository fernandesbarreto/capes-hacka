import React, { useState} from "react";

const SearchBar = ({handleSearch}) => {

    const [query, setQuery] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(1);
    }
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search scholarly works..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={styles.input}
        aria-label="Search scholarly works"
      />
      <button
        onClick={() => handleSearch(1, query)}
        style={styles.button}
        aria-label="Search"
      >
        Search
      </button>
    </div>
  );
};

const styles = {
  searchContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default SearchBar;
