import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuAtivo, setMenuAtivo] = useState(false);

  const toggleMenu = () => setMenuAtivo((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <span className="logo">BanhoTosa</span>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Abrir menu"
        >
          <span>&#9776;</span>
        </button>
        <div className={`menu${menuAtivo ? " ativo" : ""}`}>
          <Link to="/" onClick={() => setMenuAtivo(false)}>
            Home
          </Link>
          <Link to="/clientes" onClick={() => setMenuAtivo(false)}>
            Clientes
          </Link>
          <Link to="/pets" onClick={() => setMenuAtivo(false)}>
            Pets
          </Link>
          <Link to="/atendimentos" onClick={() => setMenuAtivo(false)}>
            Atendimentos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
