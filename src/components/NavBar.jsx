import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { logo, mode, close, github, gamesData } from "../assets/assets";
import { motion } from "framer-motion";
import GameCard from "./GameCard";

function NavBar() {
  const games = gamesData.games;
  const [matchedGames, setMatchedGames] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [lightMode, setLightMode] = useState(localStorage.getItem("mode") ? JSON.parse(localStorage.getItem("mode")) : false);
  const inputSearch = useRef();
  const searchContainerRef = useRef();

  function handleNavSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
  }

  useEffect(() => {
    if (searchValue.length > 0) {
      setMatchedGames(games.filter((game) => game.name.toLowerCase().includes(searchValue)).splice(0, 5));
    } else {
      setMatchedGames([]);
    }
  }, [searchValue]);

  useEffect(() => {
    lightMode ? document.body.classList.add("light") : document.body.classList.remove("light");
    localStorage.setItem("mode", lightMode);
  }, [lightMode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearching(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        <img src={logo} /> MacVG
      </Link>
      <div className="nav-search-container" ref={searchContainerRef}>
        <div className="nav-search-bar">
          <input
            type="text"
            className="nav-search"
            placeholder="Search 500+ free online games"
            value={searchValue}
            onChange={handleNavSearch}
            onFocus={() => setSearching(true)}
            ref={inputSearch}
          />
          {searchValue.length > 0 && (
            <img
              src={close}
              title="Clear search"
              className="nav-search-img"
              onClick={() => {
                setSearchValue("");
                inputSearch.current.focus();
              }}
            />
          )}
        </div>
        {matchedGames.length > 0 && searching && (
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
      <motion.img
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 1.1, rotate: 320 }}
        transition={{ duration: 0.7, type: "spring" }}
        src={mode}
        title="Toggle light mode"
        className="nav-img"
        onClick={() => setLightMode(!lightMode)}
      />{" "}
      <motion.img
        whileHover={{ scale: 1.2, rotate: 360 }}
        whileTap={{ scale: 1.1, rotate: 320 }}
        transition={{ duration: 0.7, type: "spring" }}
        src={github}
        title="Source code"
        className="nav-img"
        onClick={() => window.open("https://github.com/Mac-Web/macvg", "_blank")}
      />
    </nav>
  );
}

export default NavBar;
