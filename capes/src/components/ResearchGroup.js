import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/ResearchGroup.css";
import commentIcon from "../assets/commenticon.png";

const ResearchGroup = () => {
  const location = useLocation();
  const { title, description } = location.state || {};

  const [selectedWorkId, setSelectedWorkId] = useState(null);

  const persons = [
    { id: 1, name: "Pedro Montes" },
    { id: 2, name: "Caroleta Costa" },
    { id: 3, name: "João Mergulhão" },
    { id: 4, name: "Rodrigo Pereira" },
  ];

  const works = [
    {
      id: 1,
      title: "6G e IoT: Conectando um Mundo Inteligente",
      mainComment:
        "O 6G promete integrar dispositivos inteligentes em larga escala, revolucionando cidades, saúde e indústrias com maior eficiência e baixa latência.",
      comments: [{person: persons[0], content: "Ótimo artigo"}, {person: persons[3], content:"Observações interessantes"}, {person: persons[1], content: "Muito pertinente para o escopo da pesquisa"}],
    },
    {
      id: 2,
      title: "Reciclagem de E-lixo: Um Desafio Urbano",
      mainComment: "Muito bom, pessoal!",
      comments: ["Importante reflexão sobre o impacto ambiental", "Gostei do enfoque nas soluções tecnológicas"],
    },
    {
      id: 3,
      title: "Redes 6G: O Futuro da Conectividade",
      mainComment: "Parabéns, pessoal!",
      comments: ["Análise abrangente do futuro da conectividade", "Perspectiva interessante sobre os desafios"],
    },
  ];

  const handleCommentClick = (workId) => {
    setSelectedWorkId(selectedWorkId === workId ? null : workId);
  };

  return (
    <div>
      <h1>Workcapes</h1>
      <hr style={{ margin: "16px 0", border: "none", borderTop: "1px solid #ccc" }} />

      <div>
        <h1>{title}</h1>
        <h1>{description}</h1>

        <div className="tags-container">
          {persons.map((person) => (
            <div key={person.id} className="tag">
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="saved-works-container">
        {works.map((work) => (
          <div key={work.id} className="saved-work">
            <h3>{work.title}</h3>
            <p>{work.mainComment}</p>

            <div className="buttons">
              <img
                src={commentIcon}
                alt="Icone de comentário"
                onClick={() => handleCommentClick(work.id)}
                style={{ cursor: "pointer" }}
              />
            </div>

            {selectedWorkId === work.id && (
            <div className={`comments ${selectedWorkId === work.id ? "open" : ""}`}>
                <h4>Comentários:</h4>
                {work.comments.map((comment, index) => (
                <div key={index} className="comment-container">
                    <p className="comment-author"><strong>{comment.person.name}</strong></p>
                    <p className="comment-content">{comment.content}</p>
                </div>
                ))}
            </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchGroup;
