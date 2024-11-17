import React, { useState, useEffect, useRef } from "react";
import ufpe from "../assets/ufpe.jpg";

const LocalModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const maybeLaterButtonRef = useRef(null);
  const yesButtonRef = useRef(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const maybeLaterButton = maybeLaterButtonRef.current;
    const yesButton = yesButtonRef.current;

    const handleMaybeLaterClick = () => {
      setIsOpen(false);
    };

    const handleYesClick = () => {
      setIsOpen(false);
    };

    if (maybeLaterButton) {
      maybeLaterButton.addEventListener("click", handleMaybeLaterClick);
    }

    if (yesButton) {
      yesButton.addEventListener("click", handleYesClick);
    }

    return () => {
      if (maybeLaterButton) {
        maybeLaterButton.removeEventListener("click", handleMaybeLaterClick);
      }
      if (yesButton) {
        yesButton.removeEventListener("click", handleYesClick);
      }
    };
  }, [isOpen]);

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
                ref={maybeLaterButtonRef}
              >
                Talvez depois
              </br-button>
              <br-button type="primary" className="m-1" ref={yesButtonRef}>
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
