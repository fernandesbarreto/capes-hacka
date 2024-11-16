import React, { useEffect, useState, useRef } from "react";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const GPTSummarize = ({ abstract = "" }) => {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    if (abstract) {
      setQuery(abstract);
      summarize();
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abstract]);

  const summarize = async () => {
    if (!query.trim()) {
      //setError("Por favor, insira um texto para resumir.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary("");

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

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    if (!apiKey) {
      setError("Chave da API do OpenAI não está definida.");
      setIsLoading(false);
      return;
    }

    try {
      abortControllerRef.current = new AbortController();
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 150,
            temperature: 0.2,
            stream: true, // Enable streaming
          }),
          signal: abortControllerRef.current.signal,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Erro desconhecido ao chamar a API."
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // OpenAI sends data in the format: "data: {...}\n\n"
          const lines = chunk
            .split("\n")
            .filter((line) => line.startsWith("data: "));
          for (const line of lines) {
            const jsonStr = line.replace(/^data: /, "").trim();
            if (jsonStr === "[DONE]") {
              done = true;
              break;
            }
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices[0].delta.content;
              if (content) {
                setSummary((prev) => prev + content);
              }
            } catch (e) {
              console.error("Erro ao analisar o chunk JSON:", e);
            }
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error(err);
        if (err.message) {
          setError(`Erro: ${err.message}`);
        } else {
          setError("Ocorreu um erro inesperado.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {!summary && (
        <button type="button" onClick={summarize} disabled={isLoading}>
          Descrever
        </button>
      )}

      {isLoading && <p>Carregando...</p>}
      {summary && (
        <p>
          <AutoAwesomeIcon />
          <i>{summary}</i>
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default GPTSummarize;
