import React, { useState } from 'react';

const Menu = ({ itemList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuTitle, setMenuTitle] = useState(itemList[0]);

  const handleItemClick = (item) => {
    setMenuTitle(item);  // Atualiza o título com o nome do item clicado
    setIsOpen(false);  // Fecha o menu após o item ser clicado
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={styles.menuContainer}>
      <button onClick={toggleMenu} style={styles.button}>
        {menuTitle}
      </button>
      {isOpen && (
        <ul style={styles.menuList}>
          {itemList.map((item) => (
            <li
              key={item}
              style={styles.menuItem}
              onClick={() => handleItemClick(item)}
            >
              {item} {menuTitle === item && '✔ '}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdvancedSearchLine = ({ isFirst, onRemove }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
      {!isFirst && <Menu itemList={['E', 'OU']} />}
      <Menu itemList={['Qualquer campo', 'Título', 'Autor', 'Assunto', 'Editor']} />
      <Menu itemList={['Contém', 'É']} />
      <input type="text" style={styles.textField} placeholder="Digite aqui..." />
      {!isFirst && (
        <button onClick={onRemove} style={styles.removeButton}>
          X
        </button>
      )}
    </div>
  );
};

const AdvancedSearch = () => {
  const [lines, setLines] = useState([1]); // Inicialmente uma linha de pesquisa

  const addLine = () => {
    setLines([...lines, lines.length + 1]); // Adiciona um número único à lista de linhas
  };

  const removeLine = (index) => {
    setLines(lines.filter((_, i) => i !== index)); // Remove a linha específica
  };

  return (
    <div>
      {lines.map((_, index) => (
        <AdvancedSearchLine
          key={index}
          isFirst={index === 0}
          onRemove={() => removeLine(index)}
        />
      ))}

      <div style={{ marginTop: '10px' }}>
        <button onClick={addLine} style={styles.addButton}>
          + Adicionar novo campo
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;

const styles = {
  menuContainer: {
    display: 'inline-block',
    marginRight: '10px',
  },
  button: {
    width: '150px',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  menuList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    position: 'absolute',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    width: '150px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  menuItem: {
    padding: '8px',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
  },
  textField: {
    width: '200px',
    padding: '8px',
    marginLeft: '10px',
    border: 'none',
    borderBottom: '2px solid #ccc',
    borderRadius: '0',
    outline: 'none',
  },
  addButton: {
    width: '200px',
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    marginTop: '10px',
  },
  removeButton: {
    marginLeft: '10px',
    padding: '5px 10px',
    border: 'none',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};
