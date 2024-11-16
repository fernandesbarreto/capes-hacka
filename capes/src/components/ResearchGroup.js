import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/ResearchGroup.css";
import commentIcon from "../assets/commenticon.png";

const ResearchGroup = () => {
  const location = useLocation();
  const { title, description } = location.state || {};

  const [newComment, setNewComment] = useState("");

  const [selectedWorkId, setSelectedWorkId] = useState(null);

  const colors = ["#FFCE00", "#7ECC06", "#FF6600", "#01CD9A"];

  const persons = [
    { id: 1, name: "Pedro Montes", image: "https://picsum.photos/id/823/400" },
    { id: 2, name: "Caroleta Costa", image: "https://picsum.photos/id/823/400" },
    { id: 3, name: "João Mergulhão", image: "https://picsum.photos/id/823/400" },
    { id: 4, name: "Rodrigo Pereira", image: "https://picsum.photos/id/823/400" },
  ];

  const [works, setWorks] = useState([
    {
      id: 1,
      title: "6G e IoT: Conectando um Mundo Inteligente",
      mainComment:
      {person: persons[0], content: "O 6G promete integrar dispositivos inteligentes em larga escala, revolucionando cidades, saúde e indústrias com maior eficiência e baixa latência."},
      comments: [
        { person: persons[0], content: "Ótimo artigo" },
        { person: persons[3], content: "Observações interessantes" },
        { person: persons[1], content: "Muito pertinente para o escopo da pesquisa" },
      ],
    },
    {
      id: 2,
      title: "Reciclagem de E-lixo: Um Desafio Urbano",
      mainComment: {person: persons[0], content: "Muito bom, pessoal!"},
      comments: [
        { person: persons[0], content: "Importante reflexão sobre o impacto ambiental" },
        { person: persons[2], content: "Gostei do enfoque nas soluções tecnológicas" },
      ],
    },
    {
      id: 3,
      title: "Redes 6G: O Futuro da Conectividade",
      mainComment:  {person: persons[0], content: "Muito bom, pessoal!"},
      comments: [
        { person: persons[1], content: "Análise abrangente do futuro da conectividade" },
        { person: persons[2], content: "Perspectiva interessante sobre os desafios" },
      ],
    },
  ]);


  const addComment = (workId) => {
    // Procura o trabalho correto e adiciona o comentário
    console.log('Adicionando comentário', newComment);
    const updatedWorks = works.map((work) => {
      if (work.id === workId) {
        const updatedComments = [...work.comments, { person: persons[0], content: newComment }]; // Aqui 'persons[0]' é apenas um exemplo. Você pode ajustar para o usuário correto.
        return { ...work, comments: updatedComments };
      }
      return work;
    });
    setWorks(updatedWorks);
    setNewComment(""); // Limpa o campo de input
  };

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
            <div key={person.id} className="tag" style={{ backgroundColor: colors[person.id % 4] }}>
              <br-avatar image={person.image} ></br-avatar>
              <p>{person.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="saved-works-container">
        {works.map((work) => (
          <div key={work.id} className="saved-work">
            <h3>{work.title}</h3>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <p style={{ marginRight: 'auto' }}>{work.mainComment.content}</p>
              

                <div>

                  <div key={work.mainComment.person.id} className="tag" style={{ backgroundColor: colors[work.mainComment.person.id % 4], display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>{work.mainComment.person.name}</p>
                    <br-avatar image={work.mainComment.person.image}></br-avatar>
                  </div>

                  <div className="buttons">
                    <img
                      src={commentIcon}
                      alt="Icone de comentário"
                      onClick={() => handleCommentClick(work.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
            </div>

            {selectedWorkId === work.id && (
              <div className={`comments ${selectedWorkId === work.id ? "open" : ""}`}>
                <h4>Comentários:</h4>
                {work.comments.map((comment, index) => (

                  <div key={index} className="comment-container">
                    <div className="namePhoto">
                      <br-avatar image={comment.person.image} ></br-avatar>
                      <p className="comment-author"><strong>{comment.person.name}</strong></p>
                    </div>

                    <p className="comment-content">{comment.content}</p>
                  </div>

                ))}

                <input
                  label="Adicione um comentário"
                  placeholder="Placeholder"
                  density="large"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)} // Atualiza o estado com o valor digitado
                  onBlur={() => console.log('Campo perdeu foco')} // Caso precise capturar o evento de foco
                />

                <br-button
                  icon
                  label="Comentar"
                  type="primary"
                  onClick={() => addComment(work.id)}
                ></br-button>

              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchGroup;
