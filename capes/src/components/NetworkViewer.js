import React, { useState } from "react";

const NetworkViewer = () => {
  // Estado para controlar a visibilidade do iframe

  // Função para alternar a visibilidade do iframe

  return (
    <div style={{ marginTop: "10px" }}>
      {/* Botão que alterna a visibilidade do iframe */}
      {/* Iframe condicionalmente renderizado com base no estado */}
        <iframe
          title="vosViewer"
          allowFullScreen="true"
          src="https://app.vosviewer.com/?json=https://app.vosviewer.com/data/QSS_SM_2020-2021_co-authorship_network.json&simple_ui=true"
          width="100%"
          height="600px"
          style={{ border: "none" }}
        ></iframe>
    </div>
  );
};

export default NetworkViewer;
