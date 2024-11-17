import React from "react";
import SearchBar from "../components/SearchBar";
import woman from "../assets/mulher.png";
import progress from "../assets/progress.png";
import trainings from "../assets/Treinamentos.png";
import AcervoSection from "../components/collection";

const TelaPortalCAPES = () => {
  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <section style={styles.container}>
          <div style={styles.header}>
            <p style={{ margin: 0 }}>
              <i>Você tem acesso ao conteúdo gratuito do Portal através do </i>
              <span style={styles.link}>Acesso CAFe</span>
            </p>
          </div>
          <img
            src={woman}
            alt="Mulher trabalhando em um computador"
            style={styles.image}
          />
          <h1 style={styles.title}>
            Conteúdo científico diversificado para deixar sua pesquisa ainda
            melhor.
          </h1>
        </section>

        <div style={styles.searchBar}>
          <select style={styles.select}>
            <option>Assuntos</option>
          </select>
          <SearchBar />
          <button style={styles.searchButton}>🔍</button>
          <button style={styles.advancedSearchButton}>Busca avançada</button>
        </div>

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

          <img
            src={progress}
            alt="1. Pesquise pelo conteúdo desejado \n 2. Entre e cadastre-se para ter receber seu acesso \n 3. Veja o conteúdo de forma gratuita em cada site \n 4. Enriqueça sua pesquisa"
            style={styles.stepsContainer}
          />
        </div>
      </div>
      <img src={trainings} alt="Training" style={styles.trainings} />
      <div style={styles.main}>
        <AcervoSection />
      </div>
    </div>
  );
};

export default TelaPortalCAPES;

const styles = {
  header: {
    padding: "20px",
    textAlign: "left",
  },
  link: {
    color: "#1351B4",
    cursor: "pointer",
  },
  main: {
    padding: "40px 20px",
    textAlign: "center",
    margin: "24px",
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
    backgroundColor: "#1351B4",
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
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
  sectionTitle: {
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#1351B4",
  },
  stepsContainer: {
    width: "120%",
    marginTop: "48px",
  },
  trainings: {
    width: "100vw",
    height: "auto",
    display: "block",
    marginTop: "48px",
    padding: 0,
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
    bottom: "20px",
    left: "20px",
    fontSize: "36px",
    fontWeight: "bold",
    color: "white",
    width: "560px",
    textAlign: "start",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
    margin: 0,
  },
};
