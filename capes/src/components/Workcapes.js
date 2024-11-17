import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WorkcapesTabViewer from "./WorkcapesTabViwer";

import "@govbr-ds/webcomponents/dist/webcomponents.umd.min.js";

const Workcapes = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Redes 6G: O Futuro da Conectividade",
      description: "Projeto Pesquisa Amazonense de Mauá",
    },
    {
      id: 2,
      title: "Reciclagem de E-lixo: Um Desafio Urbano",
      description: "Trabalho de Conclusão de Curso",
    },
  ]);

  const navigate = useNavigate();

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: cards.length + 1, // Ensure unique IDs
        title: `Título ${cards.length + 1}`,
        description: "Descrição do card",
      },
    ]);
  };

  return (
    <div style={{ padding: "20px" }} className="margin-lateral">

      <WorkcapesTabViewer />

      <h3 style={{ fontSize: "34px" }}>Olá, <b>Pedro!</b> Aqui estão os seus grupos de pesquisa</h3>

      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "scroll", // Enable horizontal scrolling
          flexWrap: "nowrap", // Prevent wrapping to the next line
          padding: "16px 0", // Optional: Add some padding
        }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            style={{ ...styles.card, width: "360px", height: "180px" }}
          >
            <br-card style={{ borderRadius: "8px", height: "180px" }}>
              <br-card-header slot="header">
                <div
                  className="d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className="ml-3">
                    <div style={styles.cardInfo}>{card.title}</div>
                    <div style={styles.cardDescription}>{card.description}</div>
                  </div>
                  <div className="ml-auto">
                    <br-button circle icon="ellipsis-v"></br-button>
                  </div>
                </div>
              </br-card-header>

              <br-card-footer slot="footer">
                <div className="d-flex" style={styles.footer}>
                  <div>
                    <br-button
                      label="Entrar"
                      onClick={() => {
                        navigate("/researchgroup", {
                          state: {
                            title: card.title,
                            description: card.description,
                          },
                        });
                      }}
                    ></br-button>
                  </div>
                  <div className="ml-auto">
                    <br-button circle icon="share-alt"></br-button>
                    <br-button circle icon="heart"></br-button>
                  </div>
                </div>
              </br-card-footer>
            </br-card>
          </div>
        ))}
        <div style={styles.plusButton} onClick={addCard}>
          <h3 style={{ fontSize: "4em", color: "#1351B4" }}>+</h3>
        </div>
      </div>
    </div>
  );
};

export default Workcapes;

const styles = {
  card: {
    borderRadius: "8px",
    textAlign: "center",
    width: "360px",
    height: "180px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    position: "relative",
    paddingBottom: "54px",
    flex: "0 0 auto",
  },
  plusButton: {
    borderRadius: "8px",
    textAlign: "center",
    width: "180px",
    height: "180px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flex: "0 0 auto",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    height: "54px",
    position: "absolute",
    bottom: 0,
  },
  unstyledButton: {
    background: "none",
    border: "none",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
    padding: "0",
    outline: "none",
  },
  cardInfo: {
    textAlign: "left",
    fontSize: "20px",
    fontWeight: "bold",
  },
  cardDescription: {
    textAlign: "left",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "8px 16px",
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
  },
};
