import React, { useState } from "react";
import axios from "axios";
import NetWorkViewer from "./NetworkViewer";
import AdvancedSearch from "./AdvancedSearch";
import FilterBar from "./FilterBar";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const trimmedQuery = query.trim();

  const handleSearch = async () => {
    if (trimmedQuery === "") {
      setWorks([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://api.openalex.org/works`, {
        params: {
          search: trimmedQuery,
          per_page: 10, // Limita os resultados para 10
        },
      });

      setWorks(response.data.results);
      setShowFilters(true); // Mostra a barra de filtros após a pesquisa

    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const applyFilters = (filteredWorks) => {
    setWorks(filteredWorks);
  };

  return (
    <div>
      <div style={styles.container}>
        <h2>Periódicos CAPES</h2>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search scholarly works..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>Search</button>
        </div>

        <AdvancedSearch />

        {works.length > 0 && <NetWorkViewer />}
        {isLoading && <p>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}

        <div>
          <ul style={styles.list}>
            {works.map((work) => (
              <li key={work.id} style={styles.listItem}>
                <h3 style={styles.title}>{work.title}</h3>
                <p style={styles.authors}><strong>Authors:</strong> {work.authorships.map((authorship) => authorship.author.display_name).join(", ")}</p>
                <p style={styles.publicationYear}><strong>Publication Year:</strong> {work.publication_year || "N/A"}</p>
                {work.doi && (
                  <p style={styles.doi}>
                    <strong>DOI:</strong> <a href={`https://doi.org/${work.doi}`} target="_blank" rel="noopener noreferrer">{work.doi}</a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        {!isLoading && works.length === 0 && trimmedQuery !== "" && !error && (
          <p>No results found.</p>
        )}
      </div>

      {showFilters && <FilterBar worksData={works} applyFilters={applyFilters} />}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
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
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },
  title: {
    margin: "0 0 10px 0",
  },
  authors: {
    margin: "5px 0",
  },
  publicationYear: {
    margin: "5px 0",
  },
  doi: {
    margin: "5px 0",
  },
  error: {
    color: "red",
  },
};

export default SearchBar;
