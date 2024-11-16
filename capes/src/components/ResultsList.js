import React from "react";
import GPTSummarize from "./SummarizeAI";

const ResultsList = ({ works }) => {
  return (
    <ul style={styles.list}>
      {works.map((work) => (
        <li key={work.id} style={styles.listItem}>
          <h3 style={styles.title}>{work.title}</h3>
          <p style={styles.authors}>
            <strong>Authors:</strong>{" "}
            {work.authorships
              .map((authorship) => authorship.author.display_name)
              .join(", ")}
          </p>
          <p style={styles.publicationYear}>
            <strong>Publication Year:</strong> {work.publication_year || "N/A"}
          </p>
          {work.doi && (
            <p style={styles.doi}>
              <strong>DOI:</strong>{" "}
              <a
                href={`https://doi.org/${work.doi}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {work.doi}
              </a>
            </p>
          )}

          {work.abstract_inverted_index && (
            <GPTSummarize abstract={JSON.stringify(work.abstract_inverted_index)} />
          )}
        </li>
      ))}
    </ul>
  );
};

const styles = {
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "15px",
    borderBottom: "1px solid #eee",
  },
  title: {
    margin: "0 0 10px 0",
  },
  authors: {
    margin: "5px 0",
  },
  publicationYear: {
    margin: "5px 0",
  },
  doi: {
    margin: "5px 0",
  },
};

export default ResultsList;
