import { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import GameCard from "../components/GameCard";
import Footer from "../components/Footer";
import Dropdown from "../components/Dropdown";

function Home() {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [displayedGames, setDisplayedGames] = useState([]);
  const [randomGame, setRandomGame] = useState(null);
  const [sortMethod, setSortMethod] = useState("a");
  const favoritedGames = localStorage.getItem("macvg-favorites") ? JSON.parse(localStorage.getItem("macvg-favorites")) : [];
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

  useEffect(() => {
    fetch("/games.json")
      .then((response) => response.json())
      .then((data) => {
        setGames(data.games.sort((a, b) => a.name.localeCompare(b.name)));
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  useEffect(() => {
    switch (sortMethod) {
      case "a":
        setDisplayedGames([...displayedGames].sort((a, b) => a.name.localeCompare(b.name)));
        console.log(displayedGames);
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
                    src="/icons/close.svg"
                    onClick={() => {
                      setSearch("");
                      searchInput.current.focus();
                    }}
                    title="Clear search"
                  />
                </div>
              )}
              <div className="hero-search-img">
                <img src="/icons/random.svg" title="Random game" onClick={selectRandomGame} />
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
                <img src="/icons/up.svg" className="direction-flip" />
              </button>
            </div>
          </div>
          {randomGame && (
            <div className="games-container games-centered">
              <GameCard game={randomGame} />
            </div>
          )}
          {favoritedGames.length > 0 && (
            <div className="favorites-container">
              <h2>Favorites</h2>
              <div className="favorites-delete">
                <img src="/icons/delete.svg" className="favorites" />
              </div>
            </div>
          )}
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
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Home;
