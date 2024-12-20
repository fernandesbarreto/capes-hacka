// SearchArea
import React, { useState, useEffect } from "react";
import axios from "axios";
import NetWorkViewer from "./NetworkViewer";
import SearchBar from "./SearchBar";
import ChatGPT from "./ChatGPT";
import FilterBar from "./FilterBar";
import "./searchBar.css";
import "@govbr-ds/webcomponents/dist/webcomponents.umd.min.js";
import GPTSummarize from "./SummarizeAI";
import "../style/SearchArea.css";

const SearchArea = () => {
  const [works, setWorks] = useState([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [query, setQuery] = useState("");
  const [isShowingFilters, setIsShowingFilters] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [networkMode, setNetworkMode] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);

  const [showSimpleSearch, setShowSimpleSearch] = useState(true);
  const [perPage, setPerPage] = useState(10);

  const applyFilters = (filteredWorks) => {
    setWorks(filteredWorks);
  };

  const handleGroupClick = () => {
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false); // Oculta a mensagem após um tempo (exemplo: 3 segundos)
    }, 3000);
  };

  const toggleMenu = (index) => {
    // Se o menu está aberto e o índice clicado for o mesmo, fecha o menu
    if (isMenuOpen && menuIndex === index) {
      setIsMenuOpen(false);
    } else {
      setMenuIndex(index); // Caso contrário, abre o menu correspondente ao índice clicado
      setIsMenuOpen(true);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(currentPage, query);
    }
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

  const handleSearch = async (page = 1, query = "") => {
    if (query === "" || !query) {
      setWorks([]);
      setTotalPages(null);
      setCurrentPage(1);
      return;
    }
    const trimmedQuery = query.trim();

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
      setSearched(true);
      const totalResults = response.data.meta.count;
      setTotalPages(Math.ceil(totalResults / perPage));
      setCurrentPage(page);
      setQuery(trimmedQuery);
      setSearchPerformed(true);
      setIsShowingFilters(true);
    } catch (err) {
      setError("Error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComponent = () => {
    setShowSimpleSearch((prevShowSimpleSearch) => !prevShowSimpleSearch);
  };

  return (
    <div style={styles.container}>
      <div class="search-area">
        {
          <FilterBar
            worksData={works}
            applyFilters={applyFilters}
            searchPerformed={searchPerformed}
            isShowingFilters={isShowingFilters}
            handleSearch={handleSearch}
          />
        }
        <div>
          <div className="acervo">
            <div className="acervo-left">
              <h3 style={{ color: "#1351b4", margin: 0 }}>Acervo</h3>
              <i style={{ margin: "4px" }}>
                Você tem acesso ao conteúdo exclusivo através do
              </i>
              <p style={{ color: "#1351b4", margin: "2px" }}>
                Acesso CAFe <i class="fas fa-caret-down"></i>
              </p>
            </div>
            <br-button
              onClick={toggleComponent}
              label={showSimpleSearch ? "Busca Avançada" : "Busca Simples"}
            ></br-button>
          </div>
          <div className="search-bar">
            <select id="dropdown" name="page" className="styled-select">
              <option value="Assuntos">Assuntos</option>
              <option value="Bases e Coleções">Bases e Coleções</option>
              <option value="Livros">Livro</option>
              <option value="Periódicos">Periódicos</option>
            </select>
            <div className="search-bar-input">
              {showSimpleSearch ? (
                <SearchBar
                  handleSearch={handleSearch}
                  query={query}
                  setQuery={setQuery}
                />
              ) : (
                <ChatGPT handleSearch={handleSearch} />
              )}
            </div>
          </div>
          {searched && (
            <div className="results">
              <div style={{ display: "flex", alignItems: "center" }}>
                <h3>Resultados</h3>
                <br-button
                  onClick={() => setNetworkMode(false)}
                  icon="list"
                ></br-button>
                <br-button
                  onClick={() => setNetworkMode(true)}
                  icon="project-diagram"
                ></br-button>
              </div>
              <div className="search-quantity">
                <div
                  style={{
                    display: "flex",
                    borderRight: "2px solid #ccc",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <h4>Exibir</h4>
                  <h4>10</h4>
                  <br-button circle icon="caret-down" />
                </div>
                <div
                  style={{
                    display: "flex",
                    borderRight: "2px solid #ccc",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <h4>
                    {totalPages > 0 ? 1 + (currentPage - 1) * perPage : 0} de{" "}
                    {totalPages * perPage} itens
                  </h4>
                  <h4>Página</h4>
                  <h4>1</h4>
                  <br-button circle icon="caret-down" />
                </div>
                <br-button icon="angle-left" onClick={handlePreviousPage} />
                <br-button icon="angle-right" onClick={handleNextPage} />
              </div>
            </div>
          )}
          {error && <p style={styles.error}>{error}</p>}
          {!networkMode && (
            <ul style={styles.list}>
              {works.map((work, index) => {
                // Calculate the global index based on the current page and items per page
                const globalIndex = (currentPage - 1) * perPage + index + 1;

                return (
                  <li key={work.id} style={styles.card}>
                    <div style={styles.header}>
                      <div>
                        <span
                          style={{
                            ...styles.badge,
                            backgroundColor: "#1351B4",
                          }}
                        >
                          Artigo
                        </span>
                        <span
                          style={{
                            ...styles.badge,
                            ...styles.openAccess,
                            marginLeft: "16px",
                          }}
                        >
                          <i
                            class="fa-solid fa-lock-open"
                            style={{ marginRight: "4px" }}
                          ></i>
                          Acesso aberto
                        </span>
                        <span
                          style={{
                            ...styles.badge,
                            ...styles.peerReviewed,
                            marginLeft: "16px",
                          }}
                        >
                          <i
                            class="fa-solid fa-book-open-reader"
                            style={{ marginRight: "4px" }}
                          ></i>
                          Revisado por Pares
                        </span>
                      </div>
                      {isMessageVisible && (
                        <br-message
                          state="success"
                          show-icon="true"
                          style={{
                            position: "absolute",
                            top: "200px",
                            right: "60px",
                            zIndex: "10",
                          }}
                        >
                          Salvo com sucesso ao grupo{" "}
                          <i> Redes 6G: O Futuro da Conectividade </i>
                        </br-message>
                      )}

                      <div style={{ display: "flex", position: "relative" }}>
                        <br-button icon="link" />
                        <br-button icon="share" />
                        <br-button icon="download" />
                        <br-button
                          icon="folder"
                          onClick={() => toggleMenu(index)}
                        />
                        {isMenuOpen && menuIndex === index && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: 0,
                              backgroundColor: "#fff",
                              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
                              borderRadius: "8px",
                              zIndex: 10,
                            }}
                          >
                            <div className="group-name name-with-divisor">
                              Meus salvos
                            </div>
                            <div
                              className="group-name name-with-divisor"
                              onClick={handleGroupClick}
                            >
                              Redes 6G: O Futuro da Conectividade
                            </div>
                            <div className="group-name name-with-divisor">
                              Reciclagem de E-lixo: Um Desafio Urbano
                            </div>
                            <div className="group-name">
                              6G e IoT: Conectando um Mundo Inteligente
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <h2 style={styles.title}>
                      <span style={styles.index}></span> {work.title}
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
                    {work.abstract_inverted_index && (
                      <GPTSummarize
                        abstract={JSON.stringify(work.abstract_inverted_index)}
                      />
                    )}
                    <p>
                      <img
                        style={styles.icons}
                        src={require("../assets/brasil.png")}
                        alt="Bandeira do Brasil"
                      />{" "}
                      | {work.publication_year || "N/A"} |{" "}
                      {work.authorships
                        ?.flatMap((authorship) => authorship.institutions || [])
                        .find((institution) => institution.display_name)
                        ?.display_name || "N/A"}{" "}
                      | <u>{work.cited_by_count} citações</u>
                    </p>
                    <div style={styles.footer}>
                      <span>{work.publisher}</span>
                      {work.doi && (
                        <a
                          href={`https://doi.org/${work.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <br-button
                            href={`https://doi.org/${work.doi}`}
                            icon="sign-in-alt"
                            label="Acessar"
                            type="secondary"
                          ></br-button>
                        </a>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {works.length > 0 && networkMode && <NetWorkViewer />}
        </div>
      </div>

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
    width: "90%",
    marginTop: "300px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "8px",
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
    color: "#757575",
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
    color: "#168821",
  },
  peerReviewed: {
    color: "#F16421",
  },
  abstract: {
    border: "1px solid #ddd",
    borderLeft: "4px solid #1C1C5E",
    display: "-webkit-box",
    WebkitLineClamp: 6,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "14px",
    lineHeight: "1.5",
    margin: "16px 0",
    padding: "16px",
    color: "#333333",
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
    width: "120px",
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
  hiperlinks: {
    padding: "16px",
    color: "#1351B4",
  },
};

export default SearchArea;
