import React, { useState, useEffect } from "react";
import axios from "axios";

import NetWorkViewer from "./NetworkViewer";
import SearchBar from "./SearchBar";
import ResultsList from "./ResultsList";
import ChaGPT from "./ChatGPT";

const SearchArea = () => {
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const perPage = 10;

  useEffect(() => {
    handleSearch(currentPage);
  }, [currentPage]);

  const handleSearch = async (page = 1, query) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === "") {
      setWorks([]);
      setTotalPages(null);
      setCurrentPage(1);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://api.openalex.org/works", {
        params: {
          search: trimmedQuery,
          per_page: perPage,
          page: page,
        },
      });

      setWorks(response.data.results);

      const totalResults = response.data.meta.count;
      setTotalPages(Math.ceil(totalResults / perPage));
      setCurrentPage(page);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 429) {
          setError("Rate limit exceeded. Please try again later.");
        } else {
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        }
      } else if (err.request) {
        setError("No response from server. Please check your network.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const [showSimpleSearch, setShowSimpleSearch] = useState(true);

  const toggleComponent = () => {
    setShowSimpleSearch((prevShowSimpleSearch) => !prevShowSimpleSearch);
  };

  return (
    <div style={styles.container}>
      <h2>Periódicos CAPES</h2>

      <div>
      <button onClick={toggleComponent}>
        {showSimpleSearch ? "Ir para ChatGPT" : "Voltar para SimpleSearch"}
      </button>

      {showSimpleSearch ? 
      <SearchBar
        handleSearch = {handleSearch}
      />

      : 
      
      <ChaGPT 
        handleSearch = {handleSearch}
      />}

    </div>

      {works.length > 0 && <NetWorkViewer />}

      {isLoading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      <ResultsList works={works} />

      {!isLoading && works.length === 0 && !error && (
        <p>No results found.</p>
      )}
      {totalPages && totalPages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || isLoading}
            style={{
              ...styles.paginationButton,
              ...(currentPage === 1 || isLoading ? styles.disabledButton : {}),
            }}
            aria-label="Próxima página"
          >
            Anterior
          </button>
          <span style={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
            style={{
              ...styles.paginationButton,
              ...(currentPage === totalPages || isLoading
                ? styles.disabledButton
                : {}),
            }}
            aria-label="Página anterior"
          >
            Próxima
          </button>
        </div>
      )}
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
  error: {
    color: "red",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    gap: "10px",
  },
  paginationButton: {
    padding: "8px 16px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
  },
  disabledButton: {
    backgroundColor: "#e9ecef",
    cursor: "not-allowed",
  },
  pageInfo: {
    fontSize: "16px",
  },
};

export default SearchArea;
