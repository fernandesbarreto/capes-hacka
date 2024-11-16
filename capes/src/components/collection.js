import React from "react";

const AcervoSection = () => {
  const styles = {
    container: {
      textAlign: "center",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      fontSize: "1.2em",
      fontWeight: "bold",
      margin: "20px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    headerLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#ddd",
      margin: "0 10px",
    },
    headerText: {
      fontWeight: "bold",
      fontSize: "1em",
      textTransform: "uppercase",
      color: "#333",
    },
    description: {
      color: "#666",
      marginBottom: "30px",
    },
    grid: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
    card: {
      backgroundColor: "#f9f9f9",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      width: "150px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    icon: {
      fontSize: "40px",
      color: "#2770E8",
      marginBottom: "10px",
    },
    cardTitle: {
      fontSize: "1em",
      fontWeight: "bold",
      color: "#1351B4",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLine}></div>
        <span style={styles.headerText}>
          <br-icon-base
            icon-name="box"
            family-name="fas"
            class-name=""
            style={{ fontSize: "16px", paddingRight: "4px" }}
          ></br-icon-base>
          Acervo
        </span>
        <div style={styles.headerLine}></div>
      </div>

      <p style={styles.description}>
        Receba o acesso de livros, normas técnicas, patentes e estatísticas até
        vídeos e áudios de diversas fontes
      </p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.icon}>
            <br-icon-base
              icon-name="file"
              family-name="fas"
              style={{ fontSize: "40px" }}
            ></br-icon-base>
          </div>
          <div style={styles.cardTitle}>ASSUNTOS</div>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>
            <br-icon-base
              icon-name="folder-open"
              family-name="fas"
              class-name=""
              style={{ fontSize: "40px" }}
            ></br-icon-base>
          </div>
          <div style={styles.cardTitle}>BASES E COLEÇÕES</div>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>
            <br-icon-base
              icon-name="book"
              family-name="fas"
              class-name=""
              style={{ fontSize: "40px" }}
            ></br-icon-base>
          </div>
          <div style={styles.cardTitle}>LIVROS</div>
        </div>
        <div style={styles.card}>
          <div style={styles.icon}>
            <br-icon-base
              icon-name="newspaper"
              family-name="fas"
              class-name=""
              style={{ fontSize: "40px" }}
            ></br-icon-base>
          </div>
          <div style={styles.cardTitle}>PERIÓDICOS</div>
        </div>
      </div>
    </div>
  );
};

export default AcervoSection;
