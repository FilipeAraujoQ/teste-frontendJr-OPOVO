import "bootstrap-icons/font/bootstrap-icons.css";
import Button from "./Button";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="bg-102c57">
      <nav className="container-xl navbar navbar-expand-lg">
        <div className="container-xl">
          <Logo />
          <Button
            className="navbar-toggler border border-0 text-f8f0e5 mt-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-3 text-f8f0e5"></i>
          </Button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto d-flex justify-content-center align-items-center">
              <li>
                <a className="nav-link text-f8f0e5" href="#">
                  Filmes
                </a>
              </li>
              <li>
                <a
                  className="nav-link disabled text-f8f0e5"
                  aria-disabled="true"
                >
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
