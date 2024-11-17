import React from "react";
import magicicon from "../assets/magicicon.png";

const SugestedWorks = () => {
  const works = [
    { id: 1, title: "Redes 6G: O Futuro da Conectividade" },
    { id: 2, title: "Reciclagem de E-lixo: Um Desafio Urbano" },
    { id: 3, title: "Reciclagem de E-lixo: Um Desafio Urbano" },
    { id: 4, title: "Reciclagem de E-lixo: Um Desafio Urbano" },
  ];

    return (
        <div style = {{ marginBottom: "100px"}}>

            <h2 style={{ fontSize: 24, fontWeight: 800 }}>Trabalhos relacionados</h2>
            

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "#F0F0F0", paddingBottom: "16px",  paddingTop: "16px", paddingRight: "12px", paddingLeft: "12px"}}>
                <p style={{ margin: 0, color: "#1351B4"}}> <img src={magicicon} alt="Magic Icon" style={{width:"20", height:"20px"}}/> Trabalhos Relacionados Presentes no Portal de Periódicos</p>

        <div
          style={{
            width: "100px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <br-button circle icon="search"></br-button>
          <br-button circle icon="ellipsis-v"></br-button>
        </div>
      </div>

            {works.map((work) => (
                <div key={work.id}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingRight: "12px", paddingLeft: "12px"}}>
                        <p style={{ margin: 0}}>{work.title}</p>

            <div
              style={{
                width: "160px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <br-button circle icon="eye"></br-button>
              <br-button circle icon="edit"></br-button>
              <br-button circle icon="trash-alt"></br-button>
            </div>
          </div>

          <hr
            style={{
              margin: "16px 0",
              border: "none",
              borderTop: "1px solid #ccc",
            }}
          />
        </div>
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <div style={{ paddingRight: "10px", borderRight: "2px solid #ccc" }}>
          Página 10
          <br-button circle icon="caret-down"></br-button>
        </div>

        <br-button circle icon="angle-left"></br-button>
        <br-button circle icon="angle-right"></br-button>
      </div>
    </div>
  );
};

export default SugestedWorks;
