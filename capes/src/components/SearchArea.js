import React, { useState, useEffect } from "react";
import axios from "axios";
import NetWorkViewer from "./NetworkViewer";
import SearchBar from "./SearchBar";
import ChaGPT from "./ChatGPT";

const SearchArea = () => {
  const [works, setWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [query, setQuery] = useState("");

  const perPage = 10;

  const handleSearch = async (page = 1, newQuery = query) => {
    const trimmedQuery = newQuery.trim();
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
      setQuery(trimmedQuery);
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

  useEffect(() => {
    if (query) {
      handleSearch(currentPage, query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
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
        <button onClick={toggleComponent} style={styles.toggleButton}>
          {showSimpleSearch ? "Ir para ChatGPT" : "Voltar para SimpleSearch"}
        </button>

        {showSimpleSearch ? (
          <SearchBar
            handleSearch={handleSearch}
            query={query}
            setQuery={setQuery}
          />
        ) : (
          <ChaGPT handleSearch={handleSearch} />
        )}
      </div>

      {works.length > 0 && <NetWorkViewer />}

      {isLoading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {works.map((work, index) => {
          // Calculate the global index based on the current page and items per page
          const globalIndex = (currentPage - 1) * perPage + index + 1;

          return (
            <li key={work.id} style={styles.card}>
              <div style={styles.header}>
                <div>
                  <span style={{ ...styles.badge, backgroundColor: "#FF9A00" }}>
                    Artigo
                  </span>
                  <span
                    style={{
                      ...styles.badge,
                      ...styles.openAccess,
                      marginLeft: "8px",
                    }}
                  >
                    Acesso aberto
                  </span>
                </div>
              </div>
              <h2 style={styles.title}>
                <span style={styles.index}>{globalIndex}.</span> {work.title}
              </h2>
              <p style={styles.authors}>
                {work.authorships
                  .map((authorship) => authorship.author.display_name)
                  .join(", ")}
              </p>
              {work.abstract_inverted_index && (
                <p style={styles.abstract}>
                  {Object.entries(work.abstract_inverted_index)
                    .sort((a, b) => a[1][0] - b[1][0])
                    .map(([word]) => word)
                    .join(" ")}
                </p>
              )}
              <p style={styles.publicationYear}>
                {work.publication_year || "N/A"} |{" "}
                {
                  // Extract all institutions from all authorships
                  work.authorships
                    ?.flatMap((authorship) => authorship.institutions || [])
                    // Find the first institution with a display_name
                    .find((institution) => institution.display_name)
                    ?.display_name || "N/A"
                }
              </p>
              <p>
                <img
                  style={styles.icons}
                  src={require("../assets/brasil.png")}
                  alt="Bandeira do Brasil"
                />{" "}
                |{" "}
                <img
                  style={styles.icons}
                  src={require("../assets/book.png")}
                  alt="Estudante abrindo livro"
                />{" "}
                Revisado por pares |{" "}
                <select style={styles.select}>
                  <option>Disponibilidade</option>
                  <option>Teste</option>
                  <option>Teste</option>
                </select>{" "}
                | PlumX Metrics
              </p>
              <div style={styles.footer}>
                <span>{work.publisher}</span>
                {work.doi && (
                  <a
                    style={styles.link}
                    href={`https://doi.org/${work.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      style={styles.smallIcon}
                      src={require("../assets/door.png")}
                      alt="Acessar"
                    />{" "}
                    Acessar
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {!isLoading && works.length === 0 && query && !error && (
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
            aria-label="Página anterior"
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
            aria-label="Próxima página"
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
  toggleButton: {
    padding: "8px 16px",
    marginBottom: "20px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#6c757d",
    color: "#fff",
    cursor: "pointer",
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
  title: {
    margin: "0 0 10px 0",
    color: "#1C1C5E",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    paddingLeft: "8px",
  },
  index: {
    marginRight: "8px",
    fontWeight: "bold",
    color: "#555",
    fontSize: "18px",
  },
  authors: {
    margin: "5px 0",
    fontWeight: "300",
  },
  publicationYear: {
    margin: "5px 0",
    fontWeight: "bold",
    fontSize: "14px",
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
  card: {
    border: "1px solid #ddd",
    borderLeft: "4px solid #1C1C5E",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px 0",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
  },
  openAccess: {
    backgroundColor: "#008765",
  },
  abstract: {
    display: "-webkit-box",
    WebkitLineClamp: 6,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "14px",
    lineHeight: "1.5",
    marginBottom: "16px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "16px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#fff",
    fontWeight: "600",
    backgroundColor: "#1351B4",
    padding: "8px 24px",
    borderRadius: "16px",
  },
  icons: {
    width: "24px",
    marginBottom: "-4px",
    padding: "0px 4px 0px 4px",
  },
  select: {
    appearance: "none",
    border: "1px solid #1C1C5E",
    backgroundColor: "white",
    borderRadius: "4px",
    color: "#1C1C5E",
    padding: "4px 8px",
    fontSize: "14px",
    cursor: "pointer",
  },
  smallIcon: {
    width: "16px",
    marginBottom: "-4px",
    paddingRight: "4px",
  },
};

export default SearchArea;
