// SmartModal
import React, { useState, useEffect, useRef } from "react";
import magicIcon from "../assets/magicicon.png";

const SmartModal = ({ onSearch, open, convert, setQuery }) => {
  // Recebe a função onSearch como prop
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const maybeLaterButtonRef = useRef(null);
  const yesButtonRef = useRef(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleYesClick = () => {
    closeModal();
    console.log("Texto da textarea:", text); // Captura o texto da textarea
    if (onSearch) {
      onSearch(text); // Passa o texto para o componente pai
      setQuery(text);
      convert();
    }
  };

  useEffect(() => {
    const maybeLaterButton = maybeLaterButtonRef.current;
    const yesButton = yesButtonRef.current;

    const handleMaybeLaterClick = () => {
      closeModal();
      console.log("User chose to close the modal.");
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
  }, [text]);

  return (
    <>
      {isOpen && (
        <br-scrim show center-content>
          <br-modal show={isOpen} closable onClose={closeModal}>
            <div style={{ display: "flex" }}>
              <img
                src={magicIcon}
                alt="Magic Icon"
                style={{
                  width: "20px",
                  height: "18px",
                  marginRight: "8px",
                  marginBottom: "8px",
                }}
              />
              <p style={{ fontWeight: "600", fontSize: "20px" }}>
                Busca Inteligente
              </p>
            </div>

            <p style={{ marginTop: "12px" }}>
              Escreva o que você deseja encontrar sem se preocupar com
              formalidades! Nossa Inteligência Artificial irá processar o que
              você quer e exibirá os resultados mais próximos da sua busca.
            </p>

            <textarea
              placeholder="Digite aqui"
              style={{ width: "100%", borderRadius: "4px", height: "120px" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div
              slot="buttons"
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
              <br-button
                type="primary"
                icon="search"
                className="m-1"
                ref={yesButtonRef}
              >
                Buscar
              </br-button>
            </div>
          </br-modal>
        </br-scrim>
      )}
    </>
  );
};

export default SmartModal;
