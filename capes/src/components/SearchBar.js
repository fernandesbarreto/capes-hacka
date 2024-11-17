import React from "react";

const SearchBar = ({ handleSearch, query, setQuery }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(1, query);
    }
  };

  const onSearchClick = () => {
    handleSearch(1, query);
  };

  return (
    /*
      <div>
        <br-input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          label="string"
          placeholder="Procure por títulos, palavras-chave e autores"
          is-highlight="true"
          icon="search"
          icon-clicked={onSearchClick}
          > </br-input>
      </div>
      */

    /*
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Procure por títulos, palavras-chave e autores"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        style={styles.input}
        aria-label="Search scholarly works"
      />
      <button onClick={onSearchClick} style={styles.button} aria-label="Search">
        Search
      </button>
    </div>
    */

    <div class="search-container">
      <input type="text"
        placeholder="Procure por títulos, palavras-chave e autores"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="Search scholarly works"/>
        <br-button icon="microphone">
        </br-button>
        <br-button icon="search" onClick={onSearchClick} class="search-button">
        </br-button>
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
