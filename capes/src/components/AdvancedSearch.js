import React, { useState, useEffect } from "react";

const Menu = ({ itemList, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item) => {
    onSelect(item); // Chama a função para atualizar o valor selecionado
    setIsOpen(false); // Fecha o menu após o item ser clicado
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.menuContainer}>
      <button onClick={toggleMenu} style={styles.button}>
        <>{selectedValue}</>
        <i class="fas fa-caret-down" style={{ color: "#1351B4" }}></i>
      </button>
      {isOpen && (
        <ul style={styles.menuList}>
          {itemList.map((item) => (
            <li
              key={item}
              style={styles.menuItem}
              onClick={() => handleItemClick(item)}
            >
              {item} {selectedValue === item && "✔ "}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdvancedSearchLine = ({
  isFirst,
  onRemove,
  field,
  textValue,
  setField,
  setTextValue,
  operator,
  setOperator,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
      <button onClick={onRemove} style={styles.removeButton}>
        <i class="fas fa-times-circle"></i>
      </button>
      {!isFirst && (
        <Menu
          itemList={["E", "OU"]}
          selectedValue={operator}
          onSelect={setOperator}
        />
      )}
      <Menu
        itemList={["Qualquer campo", "Título", "Autor", "Assunto", "Editor"]}
        selectedValue={field}
        onSelect={setField}
      />
      <Menu
        itemList={["Contém", "É"]}
        selectedValue="Contém" // Fixado como "Contém" para este exemplo
        onSelect={() => {}} // Sem atualização, pois é fixo
      />
      <textarea
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        type="text"
        style={isFirst ? styles.textFieldFirst : styles.textField}
        placeholder="Digite os termos da busca"
      />
    </div>
  );
};

const AdvancedSearch = ({ advancedString = "", handleConvert }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("advancedString:", advancedString);
    stringToList(advancedString);
  }, [advancedString]);

  const stringToList = (advancedString) => {
    if (advancedString === "" || !advancedString) {
      return [];
    }

    // Remove asteriscos do início da string
    const cleanedString = advancedString
      .replace(/^\*+/, "")
      .replace(/[()]/g, "");

    const result = [];
    const parts = cleanedString.split(/(\bAND\b|\bOR\b)/);

    let currentOperator = null;

    for (let part of parts) {
      part = part.trim();

      if (part === "AND" || part === "OR") {
        currentOperator = part === "AND" ? "E" : "OU";
      } else if (part) {
        // Remove as aspas e divide o campo e o valor
        let fieldAndText = part.replace(/"/g, ""); // Remove aspas
        let [field, textValue] = fieldAndText
          .split(":")
          .map((item) => item.trim());

        switch (field) {
          case "title":
            field = "Título";
            break;
          case "author":
            field = "Autor";
            break;
          default:
            field = "Assunto";
            break;
        }

        const item = {
          field: field.trim(), // Título, Autor, etc.
          textValue: textValue.replace(/'/g, "").trim(), // Remove aspas simples se existirem
        };

        // Aplica o operador, se não for o primeiro item
        if (result.length > 0 && currentOperator) {
          item.operator = currentOperator;
        }

        result.push(item);
      }
    }

    console.log("result:", result);

    setLines(result);

    return result;
  };

  const [lines, setLines] = useState([
    { field: "Título", textValue: "", operator: "OU" },
    { field: "Título", textValue: "", operator: "OU" },
  ]);

  const addLine = () => {
    setLines([...lines, { field: "Título", textValue: "", operator: "OU" }]);
  };

  const resetLine = () => {
    setLines([
      { field: "Título", textValue: "", operator: "OU" },
      { field: "Título", textValue: "", operator: "OU" },
    ]);
  };

  const removeLine = (index) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  const updateLine = (index, newValues) => {
    const updatedLines = [...lines];
    updatedLines[index] = { ...updatedLines[index], ...newValues };
    setLines(updatedLines);
  };

  return (
    <div>
      {lines.map((line, index) => (
        <AdvancedSearchLine
          key={index}
          isFirst={index === 0}
          onRemove={() => removeLine(index)}
          field={line.field}
          textValue={line.textValue}
          operator={line.operator}
          setField={(value) => updateLine(index, { field: value })}
          setTextValue={(value) => updateLine(index, { textValue: value })}
          setOperator={(value) => updateLine(index, { operator: value })}
        />
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "16px",
        }}
      >
        <div>
          <br-button
            onClick={addLine}
            icon="plus"
            label="Adicionar novo campo"
          ></br-button>
          <br-button onClick={resetLine} icon="undo" label="Limpar"></br-button>
        </div>

        <br-button icon="search" label="Buscar" type="primary"></br-button>
      </div>
    </div>
  );
};

export default AdvancedSearch;

const styles = {
  menuContainer: {
    display: "inline-block",
    marginRight: "10px",
  },
  button: {
    width: "150px",
    padding: "8px",
    textAlign: "center",
    border: "1px solid #888888",
    borderRadius: "4px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "38px",
  },
  menuList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    position: "absolute",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    width: "150px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: 1,
  },
  menuItem: {
    padding: "8px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
  },
  textField: {
    width: "200px",
    padding: "8px",
    border: "1px solid #888",
    borderRadius: "4px",
    height: "38px",
  },
  textFieldFirst: {
    width: "360px",
    height: "38px",
    padding: "8px",
    border: "1px solid #888",
    borderRadius: "4px",
    outline: "none",
  },
  removeButton: {
    margin: "4px",
    padding: "5px 10px",
    border: "none",
    backgroundColor: "white",
    color: "#333",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
