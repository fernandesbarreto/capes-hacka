import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://www.gov.br/logo.png"
          alt="Gov Logo"
          className="gov-logo"
        />
        <img
          src="https://www.capes.gov.br/logo.png"
          alt="CAPES Logo"
          className="capes-logo"
        />
        <span className="portal-title">Portal de Periódicos da CAPES</span>
        <span className="version">Versão ADA</span>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <a href="#sobre">Sobre</a>
          </li>
          <li>
            <a href="#acervo">Acervo</a>
          </li>
          <li>
            <a href="#treinamentos">Treinamentos</a>
          </li>
          <li>
            <a href="#informativos">Informativos</a>
          </li>
          <li>
            <a href="#ajuda">Ajuda</a>
          </li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="O que você procura?" />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <button className="login-button">Entrar no Meu Espaço</button>
      </div>
    </nav>
  );
}

export default Navbar;
