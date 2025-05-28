import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logo, mode, close, github, gamesData } from "../assets/assets";
import GameCard from "./GameCard";

function NavBar() {
  const games = gamesData.games;
  const [matchedGames, setMatchedGames] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function handleNavSearch(e) {
    const value = e.target.value.trim().toLowerCase();
    setSearchValue(value);
  }

  useEffect(() => {
    if (searchValue.length > 0) {
      setMatchedGames(games.filter((game) => game.name.toLowerCase().includes(searchValue)).splice(0, 5));
    } else {
      setMatchedGames([]);
    }
  }, [searchValue]);

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <img src={logo} /> MacVG
      </Link>
      <div className="nav-search-container">
        <div className="nav-search-bar">
          <input
            type="text"
            className="nav-search"
            placeholder="Search 500+ free online games"
            value={searchValue}
            onChange={handleNavSearch}
          />
          {searchValue.length > 0 && (
            <img src={close} title="Clear search" className="nav-search-img" onClick={() => setSearchValue("")} />
          )}
        </div>
        {matchedGames.length > 0 && (
          <div className="nav-search-results">
            {matchedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
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
