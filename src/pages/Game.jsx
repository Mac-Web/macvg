import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { star, share, download, flag, expand, gamesData } from "../assets/assets";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Ad from "../components/Ad";
import "./Game.css";
import Home from "./Home";

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
    setGame(gamesData.games.find((game) => game.id == id));
    setGames(gamesData.games);
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ad failed to load", e);
    }
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
                    <img className="toolbar-icon" src={star} />
                    <img className="toolbar-icon" src={share} />
                    {game.download && <img className="toolbar-icon" src={download} />}
                    <img className="toolbar-icon" src={flag} />
                    <img className="toolbar-icon" src={expand} />
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
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Game;
