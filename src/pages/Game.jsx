import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { star, starred, share, download, flag, expand, compress, gamesData } from "../assets/assets";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Ad from "../components/Ad";
import Popup from "../components/Popup";
import "./Game.css";

function Game() {
  const location = useLocation();
  const navigate = useNavigate();
  const gameFrame = useRef();
  const gameIframe = useRef();
  const gameActive = useRef(false);
  const { id } = useParams();
  const [game, setGame] = useState("");
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState(() =>
    localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : []
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const [recents, setRecents] = useState(() =>
    localStorage.getItem("recents") ? JSON.parse(localStorage.getItem("recents")) : []
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  function renderCategory(category) {
    switch (category) {
      case "strategy":
        return "Strategy and Puzzle";
      case "action":
        return "Action and Adventure";
      case "casual":
        return "Casual and Idle";
      case "driving":
        return "Driving and Sports";
      default:
        return "Other";
    }
  }

  function handleFavorite() {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  function handleFullscreen() {
    setIsFullscreen(!isFullscreen);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      gameFrame.current.requestFullscreen();
    }
  }

  useEffect(() => {
    document.body.classList.add(localStorage.getItem("theme"));
    const handleFullscreen = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };

    window.addEventListener("fullscreenchange", handleFullscreen);
    const stored = localStorage.getItem("favorites");
    setFavorites(stored ? JSON.parse(stored) : []);

    return () => {
      window.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, []);

  useEffect(() => {
    if (!recents.includes(id)) {
      if (recents.length >= 20) {
        setRecents([id, recents.slice(0, 19)]);
      } else {
        setRecents([id, ...recents]);
      }
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem("recents", JSON.stringify(recents));
  }, [recents]);

  useEffect(() => {
    setIsFavorite(favorites.includes(id));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites, id]);

  useEffect(() => {
    if (!gameFrame.current) return;

    const handleMouseEnter = () => {
      gameActive.current = true;
    };
    const handleMouseLeave = () => {
      gameActive.current = false;
    };
    const focusInterval = setInterval(() => {
      if (gameActive.current && document.activeElement !== gameIframe.current) {
        if (gameIframe.current) gameIframe.current.focus();
      }
    }, 1000);

    gameFrame.current.addEventListener("mouseenter", handleMouseEnter);
    gameFrame.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (gameFrame.current) {
        gameFrame.current.removeEventListener("mouseenter", handleMouseEnter);
        gameFrame.current.removeEventListener("mouseleave", handleMouseLeave);
      }
      clearInterval(focusInterval);
    };
  }, [games.length]);

  useEffect(() => {
    if (!gamesData.games.find((game) => game.id == id)) {
      navigate("/");
    }
    setGame(gamesData.games.find((game) => game.id == id));
    setGames(gamesData.games);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ad failed to load", e);
    }
  }, [location]);

  return (
    <>
      <title>{`${game.name} | MacVG`}</title>
      <NavBar />
      {games.length > 0 && (
        <div className="wrap">
          <div className="game-page">
            <div className="game-content">
              <div className="game-frame" ref={gameFrame}>
                <iframe src={game.link} ref={gameIframe} tabIndex={-1}></iframe>
                <div className="toolbar">
                  <div className="game-name">
                    <img src={game.link + game.thumb} />
                    <h2>{game.name}</h2>
                  </div>
                  <div className="toolbar-icons">
                    <img
                      className="toolbar-icon"
                      title="Favorite game"
                      src={isFavorite ? starred : star}
                      onClick={handleFavorite}
                    />
                    <img
                      className="toolbar-icon"
                      title="Share game"
                      src={share}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setShareOpen(true);
                      }}
                    />
                    {game.download && (
                      <img
                        className="toolbar-icon"
                        title="Download game"
                        src={download}
                        onClick={() => window.open(`https://macvg-games.github.io/zips/game${id}.zip`, "_blank")}
                      />
                    )}
                    <img
                      className="toolbar-icon"
                      title="Report issues"
                      src={flag}
                      onClick={() => window.open("https://forms.gle/GuqaHAETBs4bJtsF6", "_blank")}
                    />
                    <img
                      className="toolbar-icon"
                      title="Toggle fullscreen"
                      src={isFullscreen ? compress : expand}
                      onClick={handleFullscreen}
                    />
                  </div>
                </div>
              </div>
              <Ad type="3901218615" />
              <div className="game-info">
                {!game.about.includes("Oops") && (
                  <div className="game-info-section">
                    <h3>About</h3>
                    <p>{game.about}</p>
                  </div>
                )}
                {!game.controls.includes("Still working on this one O_O") && (
                  <div className="game-info-section">
                    <h3>Controls</h3>
                    <ul>
                      {game.controls.map((control, index) => (
                        <li key={index}>{control}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="game-info-section">
                  <h3>Game Information</h3>
                  <ul>
                    <li>Developer: {game.dev}</li>
                    <li>Category: {renderCategory(game.category)}</li>
                    <li>Genre: {game.genre}</li>
                    <li>Players: {game.popularity}</li>
                    <li>Release Date: {game.releaseDate}</li>
                    <li>Build: {game.build}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="right">
              <Ad type="3901218615" />
              <Ad type="3901218615" />
            </div>
          </div>
          <Footer />
        </div>
      )}
      {shareOpen && (
        <Popup
          title="Share game"
          description="Link copied! Send the game link to anyone via email, social media, or more to share the fun and enjoy the entertainment together!"
          setState={setShareOpen}
        />
      )}
    </>
  );
}

export default Game;
