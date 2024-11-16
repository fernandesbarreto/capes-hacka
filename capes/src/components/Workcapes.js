import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Função para adicionar um novo card
  const addCard = () => {
    setCards([
      ...cards,
      {
        id: cards.length,
        title: `Título ${cards.length + 1}`,
        description: "Descrição do card",
      },
    ]);
  };

  return (
    <div>
      <h1>Workcapes</h1>
      <hr
        style={{
          margin: "16px 0",
          border: "none",
          borderTop: "1px solid #ccc",
        }}
      />
      <h3>Olá, Pedro, aqui estão os seus grupos de pesquisa</h3>

      <div style={{ display: "flex", gap: "16px" }}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            style={{ ...styles.card, width: "360px", height: "180px" }}
          >
            <br-card style={{ borderRadius: "8px", height: "180px" }}>
              <br-card-header slot="header">
                <div class="d-flex" style={{ justifyContent: "space-between" }}>
                  <div class="ml-3">
                    <div style={styles.cardInfo}>{card.title}</div>
                    <div style={styles.cardDescription}>{card.description}</div>
                  </div>
                  <div class="ml-auto">
                    <br-button circle icon="ellipsis-v"></br-button>
                  </div>
                </div>
              </br-card-header>

              <br-card-footer slot="footer">
                <div class="d-flex" style={styles.footer}>
                  <div>
                    <br-button label="Entrar"></br-button>
                  </div>
                  <div class="ml-auto">
                    <br-button circle icon="share-alt"></br-button>
                    <br-button circle icon="heart"></br-button>
                  </div>
                </div>
              </br-card-footer>
            </br-card>
          </div>
        ))}
        <div style={styles.plusButton} onClick={addCard}>
          <h3 style={{ fontSize: "4em" }}>+</h3>
        </div>
      </div>
    </div>
  );
};

export default Workcapes;

const styles = {
  card: {
    borderRadius: "5px",
    textAlign: "center",
    width: "360px", // Largura com unidade de medida
    height: "180px", // Altura com unidade de medida
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Sombra no card
    position: "relative",
    paddingBottom: "54px",
  },
  plusButton: {
    borderRadius: "5px",
    textAlign: "center",
    width: "214px",
    height: "214px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  buttonsDiv: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    borderBottomLeftRadius: "5px", // Raio na borda inferior esquerda
    borderBottomRightRadius: "5px", // Raio na borda inferior direita
    height: "54px", // Altura dos botões
    position: "absolute", // Posicionamento absoluto para ficar na parte inferior
    bottom: 0, // Alinha os botões na parte inferior
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
    justifyContent: "space-between",
    bottom: 0,
  },
};
