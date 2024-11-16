import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Workcapes = () => {
    const [cards, setCards] = useState([
        {id: 1, title: "Redes 6G: O Futuro da Conectividade", description: "Projeto Pesquisa Amazonense de Mauá"},
        {id: 2, title: "Reciclagem de E-lixo: Um Desafio Urbano", description: "Trabalho de Conclusão de Curso"}
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

    const colors = ["#7ECC06", "#FFCE00", "#FF6600"];

    return (
        <div>
            <h1>Workcapes</h1>
            <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #ccc" }} />
            <h3>Olá, Pedro, aqui estão os seus grupos de pesquisa</h3>
        
            <div style={{ display: "flex", gap: "16px" }}>
                {cards.map((card, index) => (
                    <div key={card.id} style={{ ...styles.card }}>
                        <div style = {styles.cardInfo}>
                            <h3 >{card.title}</h3>
                            <p >{card.description}</p>
                        </div>

                        <div
                            style={{
                                ...styles.buttonsDiv,
                                background: colors[index % colors.length],  // Alterna as cores
                            }}
                        >
                            <button style={styles.unstyledButton} 
                            onClick={() => navigate('/researchgroup', { state: { title: card.title, description: card.description } })}>
                                Entrar
                            </button>
                            <button style={styles.unstyledButton}>
                                <span className="material-symbols-outlined">
                                    favorite
                                </span>
                            </button>
                            <button style={styles.unstyledButton}>Compartilhar</button>
                        </div>
                    </div>
                ))}
                <div
                    style={styles.plusButton}
                    onClick={addCard}
                >
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
        width: "322px",  // Largura com unidade de medida
        height: "160px", // Altura com unidade de medida
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
        height: "54px",  // Altura dos botões
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
        outline: "none"
    }, 
    cardInfo:{
        textAlign: "left",
        padding: "18px",
    }
};
