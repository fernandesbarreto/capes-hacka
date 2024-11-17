import React, { useState, useEffect, useRef } from "react";
import ufpe from "../assets/ufpe.jpg";

const LocalModal = () => {
  const LOCAL_STORAGE_KEY = "hasClosedModal";

  const [isOpen, setIsOpen] = useState(
    !localStorage.getItem(LOCAL_STORAGE_KEY)
  );

  const maybeLaterButtonRef = useRef(null);
  const yesButtonRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasClosedModal = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!hasClosedModal) {
        setIsOpen(true);
      }
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, true);
    }
  };

  useEffect(() => {
    const maybeLaterButton = maybeLaterButtonRef.current;
    const yesButton = yesButtonRef.current;

    const handleMaybeLaterClick = () => {
      closeModal();
      console.log("User chose to close the modal.");
    };

    const handleYesClick = () => {
      closeModal();
      console.log("User confirmed.");
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
  }, []);

  return (
    <>
      {isOpen && (
        <br-scrim show center-content>
          <br-modal title="Acesso" show={isOpen} closable onClose={closeModal}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={ufpe}
                alt="Logo da UFPE"
                style={{
                  width: "120px",
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
            <div
              slot="buttons"
              style={{
                display: "flex",
                gap: "8px",
                justifyContent: "flex-end",
              }}
            >
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
