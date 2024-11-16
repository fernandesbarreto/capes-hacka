import React, { useEffect, useState } from "react";
import axios from "axios";

const GPTSummarize = ({ abstract = "" }) => {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (abstract) {
      setQuery(abstract);
      summarize();
    }
  }, [abstract]);

  const summarize = async () => {
    if (!query.trim()) {
      setError("Por favor, insira um texto para resumir.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `
Você é um assistente especializado em transformar textos em resumos concisos com até 200 caracteres.

**Regras:**
1. Seja conciso e objetivo.
2. Evite informações irrelevantes.
3. Mantenha o tom profissional.
4. Não adicione informações falsas ou enganosas.
5. Use no máximo 200 caracteres.

**Entrada:**
${query}

**Saída:**`;

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
      setSummary(aiResponse);
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
      {summary === "" && (
        <button
          type="button"
          onClick={summarize}
          disabled={isLoading}
        >
          Descrever
        </button>
      )}

      {isLoading && <p>Carregando...</p>}
      {summary && <p>{summary}</p>}
    </div>
  );
};

export default GPTSummarize;
