import { useEffect, useState, useRef } from "react";
import { close, random, up, del, gamesData } from "../assets/assets";
import NavBar from "../components/NavBar";
import GameCard from "../components/GameCard";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";
import Ad from "../components/Ad";

function Home() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [randomGame, setRandomGame] = useState(null);
  const [sortMethod, setSortMethod] = useState("a");
  const [favorites, setFavorites] = useState(null);
  const searchInput = useRef();

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function selectRandomGame() {
    let newGame;
    do {
      const randomIndex = Math.floor(Math.random() * games.length);
      newGame = games[randomIndex];
    } while (newGame === randomGame && games.length > 1);
    setRandomGame(newGame);
  }

  function handleRemoveFavorites() {
    if (confirm("Are you sure you want to remove all your favorited games? This action cannot be undone.")) {
      localStorage.removeItem("favorites");
      setFavorites([]);
    }
  }

  useEffect(() => {
    setGames(gamesData.games.sort((a, b) => a.name.localeCompare(b.name)));
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ad failed to load", e);
    }
  }, []);

  useEffect(() => {
    setFavorites(
      localStorage.getItem("favorites")
        ? games.filter((game) => JSON.parse(localStorage.getItem("favorites")).includes(game.id.toString()))
        : []
    );
  }, [games]);

  useEffect(() => {
    switch (sortMethod) {
      case "a":
        setDisplayedGames([...displayedGames].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "c":
        setDisplayedGames([...displayedGames].sort((a, b) => a.category.localeCompare(b.category)));
        break;
      case "r":
        setDisplayedGames([...displayedGames].sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)));
        break;
    }
  }, [sortMethod]);

  useEffect(() => {
    let filtered = games.filter((game) => game.name.toLowerCase().includes(search.trim().toLowerCase()));
    setDisplayedGames(filtered);
  }, [games, search]);

  return (
    <>
      <NavBar />
      <div className="wrap">
        <div className="content">
          <div className="hero">
            <h1 className="hero-title">Welcome to MacVG!</h1>
            <p className="hero-description">
              Fun, redefined: hundreds of free online games. Endless fun. Infinite possibilities.
            </p>
            <div className="hero-search">
              <input
                className="hero-search-bar"
                ref={searchInput}
                placeholder="Search 500+ free online games"
                onChange={handleSearch}
                value={search}
              />
              {search.length !== 0 && (
                <div className="hero-search-img">
                  <img
                    src={close}
                    onClick={() => {
                      setSearch("");
                      searchInput.current.focus();
                    }}
                    title="Clear search"
                  />
                </div>
              )}
              <div className="hero-search-img">
                <img src={random} title="Random game" onClick={selectRandomGame} />
              </div>
            </div>
            <div className="hero-filters">
              <Dropdown
                label="Sort By: Name"
                options={[
                  { complete: "Sort By: Name", label: "Name", onClick: () => setSortMethod("a") },
                  { complete: "Sort By: Category", label: "Category", onClick: () => setSortMethod("c") },
                  { complete: "Sort By: Release", label: "Release", onClick: () => setSortMethod("r") },
                ]}
              />
              <Dropdown
                label="Filter All (420)"
                options={[
                  { complete: "Filter All (420)", label: "All", onClick: () => setDisplayedGames(games) },
                  {
                    complete: "Featured Games (50)",
                    label: "Featured (50)",
                    onClick: () => setDisplayedGames(games.filter((game) => game.featured)),
                  },
                  {
                    complete: "Action & Adventure (165)",
                    label: "Action (165)",
                    onClick: () => setDisplayedGames(games.filter((game) => game.category === "action")),
                  },
                  {
                    complete: "Streategy & Puzzle (136)",
                    label: "Strategy (136)",
                    onClick: () => setDisplayedGames(games.filter((game) => game.category === "strategy")),
                  },
                  {
                    complete: "Casual & Idle (64)",
                    label: "Casual (64)",
                    onClick: () => setDisplayedGames(games.filter((game) => game.category === "casual")),
                  },
                  {
                    complete: "Driving & Sports (55)",
                    label: "Driving (55)",
                    onClick: () => setDisplayedGames(games.filter((game) => game.category === "driving")),
                  },
                  {
                    complete: "Downloadable Games (68)",
                    label: "Downloadable (68)",
                    onClick: () => setDisplayedGames(games.filter((game) => game.download)),
                  },
                ]}
              />
              <button
                className="filter direction"
                onClick={(e) => {
                  e.target.classList.toggle("direction-flip");
                  setDisplayedGames((c) => [...c].reverse());
                }}
              >
                <img src={up} className="direction-flip" />
              </button>
            </div>
          </div>
          {randomGame && (
            <div className="games-container games-centered">
              <GameCard game={randomGame} />
            </div>
          )}
          {favorites?.length > 0 && (
            <div className="favorites-container">
              <h2>Favorites</h2>
              <div className="favorites-delete" onClick={handleRemoveFavorites}>
                <img src={del} className="favorites" />
              </div>
              <div className="favorites-list">
                {favorites.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          )}
          <Ad type="3087664545" />
          <div className="games-container">
            {displayedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
            {displayedGames.length === 0 && (
              <div>
                No games found. Request a game{" "}
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScE9-d6agIablAARRlwVDUAcL7N6V4AVR6-c33dhVPSaR45CA/viewform"
                  target="_blank"
                  className="games-link"
                >
                  here
                </a>
                !
              </div>
            )}
          </div>
          <Ad type="3087664545" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
