import React from "react";
import "@govbr-ds/webcomponents/dist/webcomponents.umd.min.js";

const TopBar = () => {
  return (
    <div>
      <br-header
        image="capes/src/assets/assinatura.png"
        signature=""
        title="Portal de Periódicos da Capes"
        subtitle="Versão ADA"
        is-sticky="false"
        has-menu="true"
        has-search="true"
        placeholder-search="O que você procura?"
        label-search="O que você procura?"
      >
        <br-header-action
          slot="headerAction"
          has-login="true"
          label-login="Entrar no Meu Espaço"
          image-avatar-login="https://picsum.photos/id/823/400"
          title-links="Acesso Rápido"
          title-functions="Funcionalidades do Sistema"
          list-links="[
    {
      name: 'Sobre',
      href: '#'
    },
    {
      name: 'Acervo',
      href: '#'
    },
    {
      name: 'Treinamentos',
      href: '#'
    },
    {
      name: 'Informativos',
      href: '#'
    },
    {
      name: 'Ajuda',
      href: '#'
    }
  ]"
          list-functions="[
    {
      icon: 'adjust',
      name: 'Modo Escuro',
      url: '#',
      clickEventName: 'click-funcionalidade-1'
    }
  ]"
        ></br-header-action>
      </br-header>
    </div>
  );
};
export default TopBar;
