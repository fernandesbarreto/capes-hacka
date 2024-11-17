import React, { useState, useEffect } from "react";
import ufpe from "../assets/ufpe.jpg";

const LocalModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <br-scrim show center-content>
          <br-modal title="Acesso" show={isOpen} closable onClose={closeModal}>
            <div style={{ display: "flex", alignContent: "center" }}>
              <img
                src={ufpe}
                alt="Logo da UFPE"
                style={{
                  width: "120px",
                  margin: "auto",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              />
            </div>

            <p style={{ marginTop: "12px" }}>
              Identificamos que você está acessando o Portal pela{" "}
              <b>Universidade Federal de Pernambuco - UFPE</b>. Gostaria de ver
              materiais personalizados disponíveis para essa instituição?
            </p>
            <div slot="buttons" style={{ display: "flex", gap: "8px" }}>
              <br-button
                type="secondary"
                className="m-1"
                onClick={() => console.log("opa")}
              >
                Talvez depois
              </br-button>
              <br-button
                type="primary"
                className="m-1"
                onClick={() => setIsOpen(false)}
              >
                Sim
              </br-button>
            </div>
          </br-modal>
        </br-scrim>
      )}
    </>
  );
};

export default LocalModal;
