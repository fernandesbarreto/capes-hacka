// src/AdvancedSearch.js

import React, { useState } from "react";
import axios from "axios";
import AdvancedSearch from "./AdvancedSearch";
import SmartModal from "./SmartModal.js";

const GPTSearch = ({ handleSearch, input }) => {
  const [query, setQuery] = useState(input);
  const [advancedSearch, setAdvancedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popupIsOpen, SetPopupIsOpen] = useState(false);

  const handleSearchFromModal = (text) => {
    setQuery(text); // Atualiza o estado do ChatGPT com o texto vindo do modal
  };

  const handlePopup = () => {
    SetPopupIsOpen(true);
  };

  const handleConvert = async (e) => {
    e.preventDefault();

    if (!query || !query.trim()) {
      setError("Por favor, insira uma pergunta de pesquisa.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAdvancedSearch("");

    try {
      const prompt = `
Você é um assistente especializado em transformar perguntas de pesquisa em buscas avançadas utilizando operadores booleanos. Sua tarefa é converter a entrada do usuário em uma expressão lógica que pode ser utilizada em sistemas de busca avançada.

**Regras:**
1. Utilize os campos específicos conforme necessário (por exemplo, title: e author:).
2. Use operadores booleanos em maiúsculas: AND, OR.
3. Utilize aspas para delimitar termos de busca específicos.
4. Combine os termos com termos semlhantes com OR (por exemplo, se o texto tem Information Technology use "Information Technology" OR "IT").
5. Combine o assunto do texto com AND usando topics : (por exemplo, topics: "Machine Learning" OR topics: "Artificial Intelligence").
4. Deixe os campos fora das aspas, exemplo: title: "machine learning".

**Exemplos:**

**Entrada:**
Preciso de informações de cachorros no ano de 2001 e de informações de gatos no ano de 2009

**Saída:**
title: "dog" AND "2001" OR title: "cat" AND "2009" AND topics: "Animals" OR topics: "Pets"

**Entrada:**
Estou fazendo uma pesquisa sobre terremotos e vulcões do Chile e da Argentina

**Saída:**
title: "argentina" OR title: "chile" AND title: "earthquakes" OR title: "volcanoes"  AND topics: "Geology" OR topics: "Natural Disasters"

**Entrada:**
Queria ler trabalhos sobre inteligência artificial e machine learning escritos por John Bolton

**Saída:**
title: "Artificial Inteligence" OR title: "AI" OR title: "Machine Learning" AND authors: "John Bolton"  AND topics: "Artificial Intelligence" OR topics: "Machine Learning"

---

**Entrada:**
${query}

**Saída:`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 150,
          temperature: 0.2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content.trim();
      setAdvancedSearch(aiResponse);
      handleSearch(1, aiResponse);
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(`Erro: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        setError("Sem resposta do servidor. Verifique sua conexão de rede.");
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SmartModal onSearch={handleSearchFromModal} open={popupIsOpen} />

      <h2>Conversor de Pesquisa Avançada</h2>

      <form onSubmit={handleConvert} style={styles.form}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite sua pergunta de pesquisa aqui..."
          style={styles.textarea}
          rows="4"
        />
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {advancedSearch && (
        <div style={styles.result}>
          <h3>Busca Avançada:</h3>
          <p>{advancedSearch}</p>
        </div>
      )}
      <div style={styles.buttons}>
        <AdvancedSearch advancedString={advancedSearch} />
        <button onClick={() => handlePopup()} style={styles.smart}>
          <i
            class="fa-solid fa-wand-magic-sparkles"
            style={{ paddingRight: "8px" }}
          ></i>
          Busca Inteligente
        </button>
      </div>
    </div>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#17a2b8",
    color: "#fff",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  result: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smart: {
    padding: "-16px 24px -16px 24px",
    textAlign: "center",
    color: "#1351B4",
    border: "1px solid #ccc",
    backgroundColor: "white",
    cursor: "pointer",
    borderRadius: "32px",
    marginTop: "10px",
    fontSize: "16px",
    fontWeight: "500",
  },
};

export default GPTSearch;
