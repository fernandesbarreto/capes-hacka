import React from "react";
import SearchBar from "../components/SearchBar";
import woman from "../assets/mulher.png";

const TelaPortalCAPES = () => {
  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <div style={styles.header}>
        <p style={{ margin: 0 }}>
          Você tem acesso ao conteúdo gratuito do Portal através do{" "}
          <span style={styles.link}>Acesso CAFe</span>
        </p>
      </div>

      {/* Seção Principal */}
      <div style={styles.main}>
        <div style={styles.container}>
          <img
            src={woman}
            alt="Woman working on a computer"
            style={styles.image}
          />
          <h1 style={styles.title}>
            Conteúdo científico diversificado para deixar sua pesquisa ainda
            melhor.
          </h1>
        </div>

        {/* Barra de Busca */}
        <div style={styles.searchBar}>
          <select style={styles.select}>
            <option>Assuntos</option>
          </select>
          <SearchBar />
          <button style={styles.searchButton}>🔍</button>
          <button style={styles.advancedSearchButton}>Busca avançada</button>
        </div>

        {/* Como acessar os materiais */}
        <div style={styles.infoSection}>
          <h2 style={styles.sectionTitle}>
            Como acessar os materiais do Portal?
          </h2>
          <p>
            O Portal de Periódicos da CAPES disponibiliza a assinatura de
            diversos conteúdos científicos para toda a comunidade acadêmica.
            Pelo Portal, você é capaz de encontrar quais materiais estão
            disponíveis e solicitar o acesso gratuito a eles, através do
            endereço eletrônico de cada editor/autor.
          </p>

          {/* Passos */}
          <div style={styles.stepsContainer}>
            <div>
              <span style={styles.step}>1</span>
              <p>Pesquise pelo conteúdo desejado</p>
            </div>
            <div>
              <span style={styles.step}>2</span>
              <p>Entre/cadastre-se para receber seu acesso</p>
            </div>
            <div>
              <span style={styles.step}>3</span>
              <p>Veja o conteúdo de forma gratuita em cada site</p>
            </div>
            <div>
              <span style={styles.step}>4</span>
              <p>Enriqueça sua pesquisa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaPortalCAPES;

const styles = {
  header: {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    textAlign: "center",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
  },
  main: {
    padding: "40px 20px",
    textAlign: "center",
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "40px",
  },
  select: {
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px 0 0 5px",
    outline: "none",
  },
  input: {
    padding: "10px",
    width: "300px",
    border: "1px solid #ddd",
    borderLeft: "none",
    outline: "none",
  },
  searchButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
  },
  advancedSearchButton: {
    padding: "10px",
    marginLeft: "10px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
  },
  infoSection: {
    textAlign: "left",
    maxWidth: "800px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  stepsContainer: {
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
    marginTop: "30px",
  },
  step: {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },
  container: {
    position: "relative",
    textAlign: "center",
    color: "white",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  title: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2em",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Optional for better readability
  },
};
