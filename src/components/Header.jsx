import Button from "./Button";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-102c57">
      <nav className="container navbar navbar-expand-lg text-f8f0e5 bg-102c57">
        <div className="container-fluid">
          <Logo />
          <Button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto text-f8f0e5 ">
              <li>
                <a className="nav-link text-f8f0e5" href="#">
                  Filmes
                </a>
              </li>
              <li>
                <a className="nav-link disabled text-f8f0e5" aria-disabled="true">
                  Séries
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
