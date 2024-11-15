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
              {item}  {menuTitle === item && '✔ '}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AdvancedSearchLine = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
      <Menu itemList={['E', 'OU', 'NÃO']} />
      <Menu itemList={['Qualquer campo', 'Título', 'Autor', 'Editor']} />
      <Menu itemList={['Contém', 'É']} />
      <input type="text" style={styles.textField} placeholder="Digite aqui..." />
    </div>
  );
};


const AdvancedSearch = () => {
  const [lines, setLines] = useState([1]); // Inicialmente uma linha de pesquisa

  // Função para adicionar uma nova linha
  const addLine = () => {
    setLines([...lines, lines.length + 1]); // Adiciona um número único à lista de linhas
  };

  return (
    <div>
      {lines.map((_, index) => (
        <AdvancedSearchLine key={index} />
      ))}

      <div style={{ marginTop: '10px' }}>
        <button onClick={addLine} style={styles.addButton}> + Adicionar novo campo</button>
      </div>
    </div>
  );
};

export default AdvancedSearch;


const styles = {
  menuContainer: {
    display: 'inline-block',  // Faz com que os menus fiquem lado a lado
    marginRight: '10px',  // Adiciona espaço entre os menus
  },
  button: {
    width: '150px',  // Tamanho fixo para o botão
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
    width: '150px',  // Tamanho fixo para a lista de itens
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1,
  },
  menuItem: {
    padding: '8px',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc',
  },
  textField: {
    width: '200px',  // Largura padronizada para o campo de texto
    padding: '8px',
    marginLeft: '10px',  // Espaço entre o TextField e o menu
    border: 'none',  // Remove a borda ao redor
    borderBottom: '2px solid #ccc',  // Adiciona uma linha inferior
    borderRadius: '0',  // Remove bordas arredondadas
    outline: 'none',  // Remove a borda ao clicar
  },
  addButton: {
    width: '200px',  // Botão mais largo que o texto
    padding: '12px',
    textAlign: 'center',
    border: '1px solid #ccc',
    backgroundColor: '#f0f0f0',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    marginTop: '10px',
  }
};
