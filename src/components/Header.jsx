export const Header = () => {
  return (
    <div>
      <header className="bg-102c57">
        <nav className="container navbar navbar-expand-lg text-f8f0e5 bg-102c57">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="/imgs/logo-clara.png" alt="Logo Clara" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                <a className="nav-link" href="#">
                  Filmes
                </a>
                <a className="nav-link disabled" aria-disabled="true">
                  Séries
                </a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
