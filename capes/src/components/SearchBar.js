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
      <input
        type="text"
        placeholder="Procure por títulos, palavras-chave e autores"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        aria-label="Search scholarly works"
      />
      <br-button
        icon="microphone"
        style={{ padding: "8px", margin: "0" }}
      ></br-button>
      <br-button
        icon="search"
        onClick={onSearchClick}
        style={{ padding: "8px", margin: "0" }}
        class="search-button"
      ></br-button>
    </div>
  );
};

export default SearchBar;
