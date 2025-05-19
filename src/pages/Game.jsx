import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "./Game.css";

function Game() {
  const { id } = useParams();
  const [game, setGame] = useState("");
  const [games, setGames] = useState([]);

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

  useEffect(() => {
    fetch("/games.json")
      .then((response) => response.json())
      .then((data) => {
        setGame(data.games.find((game) => game.id == id));
        setGames(data.games);
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
      });
  }, []);

  return (
    <>
      <NavBar />
      {games.length > 0 && (
        <div className="wrap">
          <div className="game-page">
            <div className="game-content">
              <div className="game-frame">
                <iframe src={game.link}></iframe>
                <div className="toolbar">
                  <div className="game-name">
                    <img src={game.link + game.thumb} />
                    <h2>{game.name}</h2>
                  </div>
                  <div className="toolbar-icons">
                    <img className="toolbar-icon" src="/icons/star.svg" />
                    <img className="toolbar-icon" src="/icons/share.svg" />
                    {game.download && <img className="toolbar-icon" src="/icons/download.svg" />}
                    <img className="toolbar-icon" src="/icons/flag.svg" />
                    <img className="toolbar-icon" src="/icons/expand.svg" />
                  </div>
                </div>
              </div>
              <div className="ad-container">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-5598129470490010"
                  data-ad-slot="3901218615"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
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
              <div className="ad-container">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-5598129470490010"
                  data-ad-slot="3901218615"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Game;
