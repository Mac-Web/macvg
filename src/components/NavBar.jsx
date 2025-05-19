import { Link } from "react-router-dom";
import { logo, mode, github } from "../assets/assets";

function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <img src={logo} /> MacVG
      </Link>
      <input type="text" className="nav-search" placeholder="Search 500+ free online games" />
      <Link to="/new" className="nav-link">
        New
      </Link>
      <Link to="/trending" className="nav-link">
        Trending
      </Link>
      <Link to="/recent" className="nav-link">
        Recent
      </Link>
      <Link to="/settings" className="nav-link">
        Settings
      </Link>
      <img src={mode} title="Toggle light mode" className="nav-img" onClick={() => document.body.classList.toggle("light")} />
      <img
        src={github}
        title="Source code"
        className="nav-img"
        onClick={() => window.open("https://github.com/Mac-Web/macvg", "_blank")}
      />
    </nav>
  );
}

export default NavBar;
