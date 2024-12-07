import React from "react";
import LogoEscura from "./LogoEscura";

const Footer = () => {
  return (
    <footer className="bg-f8f0e5 py-4">
      <div className="container-xl py-5">
        <div className="row">
          <div className="col-12 col-lg-3 pb-4 mb-2">
            <LogoEscura />
          </div>
          <div className="col-12 col-lg-9 row text-102c57 ">
            <div className="col-12 col-md-4 col-lg-4">
              <div className="pb-4 mb-2">Sobre</div>
              <div className="pb-4 mb-2">Contato</div>
              <div className="pb-4 mb-2">Suporte</div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <div className="pb-4 mb-2">Adicione um Filme</div>
              <div className="pb-4 mb-2">Adicione uma Série</div>
              <div className="pb-4 mb-2">Discussões</div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <div className="pb-4 mb-2">Termos de uso</div>
              <div className="pb-4 mb-2">Política de Privacidade</div>
              <div className="">Diretrizes</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
