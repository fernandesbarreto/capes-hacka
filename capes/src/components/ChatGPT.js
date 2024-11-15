// src/AdvancedSearch.js

import React, { useState } from "react";
import axios from "axios";

const AdvancedSearch = () => {
  const [query, setQuery] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
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
1. Utilize os campos específicos conforme necessário (por exemplo, "Título contém").
2. Use operadores booleanos em maiúsculas: AND, OR.
3. Envolva cada conjunto de condições relacionadas em parênteses.
4. Utilize aspas para delimitar termos de busca específicos.

**Exemplos:**

**Entrada:**
Preciso de informações de cachorros no ano de 2001 e de informações de gatos no ano de 2009

**Saída:**
(Título contém "cachorro" AND Título contém "2001") OR (Título contém "gato" AND Título contém "2009")

---

**Entrada:**
${query}

**Saída:`;

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
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
    <div style={styles.container}>
      <h2>Conversor de Pesquisa Avançada</h2>
      <form onSubmit={handleConvert} style={styles.form}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite sua pergunta de pesquisa aqui..."
          style={styles.textarea}
          rows="4"
        />
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? "Convertendo..." : "Converter"}
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {advancedSearch && (
        <div style={styles.result}>
          <h3>Busca Avançada:</h3>
          <p>{advancedSearch}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
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
};

export default AdvancedSearch;
