import React, { useState } from 'react';

const NetworkViewer = () => {
  // Estado para controlar a visibilidade do iframe
  const [showIframe, setShowIframe] = useState(false);

  // Função para alternar a visibilidade do iframe
  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };

  return (
    <div>
      {/* Botão que alterna a visibilidade do iframe */}
      <button onClick={toggleIframe}>
        {showIframe ? 'Esconder Visualizador' : 'Mostrar Visualizador'}
      </button>

      {/* Iframe condicionalmente renderizado com base no estado */}
      {showIframe && (
        <iframe
          allowFullScreen="true"
          src="https://app.vosviewer.com/?json=https://app.vosviewer.com/data/QSS_SM_2020-2021_co-authorship_network.json&simple_ui=true"
          width="100%"
          height="600px"
          style={{ border: 'none' }}
        >
        </iframe>
      )}
    </div>
  );
};

export default NetworkViewer;
