import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../style/ResearchGroup.css";
import commentIcon from "../assets/commenticon.png";
import heartIcon from "../assets/hearticon.png";
import heartFillIcon from "../assets/heartfillicon.png";
import SugestedWorks from "./SugestedWorks";
import WorkcapesTabViewer from "./WorkcapesTabViwer";
import workStatus from "../assets/workstatus.png";
import person1 from "../assets/person1.jpg"
import person2 from "../assets/person2.jpg"
import person3 from "../assets/person3.jpg"
import person4 from "../assets/person4.jpg"

const ResearchGroup = () => {
  const location = useLocation();
  const { title, description } = location.state || {};

  const [newComment, setNewComment] = useState("");

  const [selectedWorkId, setSelectedWorkId] = useState(null);

  const colors = ["#FFCE00", "#7ECC06", "#FF6600", "#01CD9A"];

  const persons = [
    { id: 1, name: "João Monte", image: person1 },
    { id: 2, name: "Lucas Paiva", image: person2 },
    { id: 3, name: "Maria Lima", image: person3 },
    { id: 4, name: "Alice Lins", image: person4 },
  ];

  const [works, setWorks] = useState([
    {
      id: 1,
      title: "6G e IoT: Conectando um Mundo Inteligente",
      link: "https://example.com/6g-iot", // Adicionando o link
      mainComment: {
        person: persons[3],
        content:
          "O 6G promete integrar dispositivos inteligentes em larga escala, revolucionando cidades, saúde e indústrias com maior eficiência e baixa latência.",
      },
      comments: [
        {
          person: persons[2],
          content:
            "Gostei muito do parágrafo que aborda como o 6G vai transformar o ecossistema da Internet das Coisas (IoT). A conexão massiva e a latência ultrabaixa mencionadas são exatamente os pontos que podem embasar nossa pesquisa em Redes 6G: O Futuro da Conectividade, já que destacam o potencial dessa tecnologia para suportar dispositivos em larga escala e aplicações críticas, como cidades inteligentes e saúde conectada. Acho que vale explorar mais essa relação entre IoT e 6G no nosso trabalho!",
          liked: false,
        },
      ],
    },
    {
      id: 2,
      title: "Reciclagem de E-lixo: Um Desafio Urbano",
      link: "https://example.com/reciclagem-e-lixo", // Adicionando o link
      mainComment: { person: persons[1], content: "Muito bom, pessoal!" },
      comments: [
        {
          person: persons[0],
          content: "Importante reflexão sobre o impacto ambiental",
          liked: false,
        },
        {
          person: persons[2],
          content: "Gostei do enfoque nas soluções tecnológicas",
          liked: false,
        },
      ],
    },
    {
      id: 3,
      title: "Redes 6G: O Futuro da Conectividade",
      link: "https://example.com/redes-6g", // Adicionando o link
      mainComment: { person: persons[2], content: "Muito bom, pessoal!" },
      comments: [
        {
          person: persons[1],
          content: "Análise abrangente do futuro da conectividade",
          liked: false,
        },
        {
          person: persons[2],
          content: "Perspectiva interessante sobre os desafios",
          liked: false,
        },
      ],
    },
  ]);



  const toggleLike = (workId, commentIndex) => {
    const updatedWorks = works.map((work) => {
      if (work.id === workId) {
        const updatedComments = work.comments.map((comment, index) => {
          if (index === commentIndex) {
            return { ...comment, liked: !comment.liked };
          }
          return comment;
        });
        return { ...work, comments: updatedComments };
      }
      return work;
    });
    setWorks(updatedWorks);
  };


  const addComment = (workId) => {
    // Procura o trabalho correto e adiciona o comentário
    console.log("Adicionando comentário", newComment);
    const updatedWorks = works.map((work) => {
      if (work.id === workId) {
        const updatedComments = [
          ...work.comments,
          { person: persons[0], content: newComment },
        ]; 
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
    <div className="margin-lateral group-container">

      <WorkcapesTabViewer />

      <div>
        <div style={{ borderLeft: "8px solid #01CD9A", paddingLeft: "10px" }}>
          <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>{title}</h1>
          <h1 style={{ fontSize: "29px", fontWeight: "normal" }}>{description}</h1>
        </div>

        <div className="tags-container">
          {persons.map((person) => (
            <div
              key={person.id}
              className="tag"
              style={{ backgroundColor: colors[person.id % 4] }}
            >
              <br-avatar image={person.image}></br-avatar>
              <p style={{ fontWeight: "600", fontSize: "14px" }}>{person.name}</p>
            </div>
          ))}
        </div>
      </div>

      <h2 className="section-title">Status da pesquisa</h2>
      <img
        src={workStatus}
        alt="Status do trabalho"
        style={{ width: "100%", height: "auto", marginBottom: "50px" }}
      />

      <h2 className="section-title">Conteúdos Salvos</h2>
      <div className="saved-works-container">
        {works.map((work) => (
          <div key={work.id} className="saved-work">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div>
                <a
                  href={work.link}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "#1C1C5E",
                    textDecoration: "none"
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {work.title}
                </a>
                <p style={{ marginRight: "auto", maxWidth: "900px" }}>
                  {work.mainComment.content}
                </p>
              </div>


              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  key={work.mainComment.person.id}
                  className="tag"
                  style={{
                    backgroundColor: colors[work.mainComment.person.id % 4],
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <p style={{ marginRight: "10px", fontWeight: "600", fontSize: "14px" }}>
                    {work.mainComment.person.name}
                  </p>
                  <br-avatar image={work.mainComment.person.image}></br-avatar>
                </div>

                <div className="buttons" style={{ gap: "16px" }}>
                  <div className="iconAndCount">
                    <p>{work.comments.length}</p>
                    <img
                      src={commentIcon}
                      alt="Icone de comentário"
                      onClick={() => handleCommentClick(work.id)}
                      style={{ cursor: "pointer", height: "18px" }}
                    />
                  </div>

                  <div className="iconAndCount">
                    <img
                      src={heartIcon}
                      alt="Icone de coração"
                      style={{
                        cursor: "pointer",
                        width: "22px",
                        height: "22px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {selectedWorkId === work.id && (
              <div
                className={`comments ${selectedWorkId === work.id ? "open" : ""
                  }`}
              >
                <h4>Comentários:</h4>
                {work.comments.map((comment, index) => (
                  <div key={index} className="comment-container">
                    <div className="namePhoto">
                      <br-avatar image={comment.person.image}></br-avatar>
                      <p className="comment-author">
                        <strong>{comment.person.name}</strong>
                      </p>
                    </div>

                    <p className="comment-content" style={{ marginLeft: "16px" }}>{comment.content}</p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        alignSelf: 'flex-end',
                        margin: "12px",
                      }}
                    >
                      <p style={{ margin: "0 8px 0 0" }}>
                        {comment.liked ? 3 : 2}
                      </p>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          color: "inherit",
                          font: "inherit",
                          cursor: "pointer",
                          padding: "0",
                          outline: "none",
                        }}
                        onClick={() => toggleLike(work.id, index)}
                      >
                        <img
                          src={comment.liked ? heartFillIcon : heartIcon}
                          alt="Icone de coração"
                          style={{
                            cursor: "pointer",
                            width: "22px",
                            height: "22px",
                          }}
                        />
                      </button>
                    </div>


                  </div>
                ))}

                <div className="comment-input-and-button">
                  <p>Adicionar Comentário</p>
                  <textarea
                    className="comment-input"
                    label="Adicione um comentário"
                    placeholder="Comente aqui..."
                    density="large"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onBlur={() => console.log("Campo perdeu foco")}
                  />

                  <br-button
                    style={{ alignSelf: "flex-end", marginTop: "16px" }}
                    label="Comentar"
                    type="primary"
                    onClick={() => addComment(work.id)}
                  ></br-button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <SugestedWorks />

    </div>
  );
};

export default ResearchGroup;
