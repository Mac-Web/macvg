import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import GameCard from "../components/GameCard";
import Ad from "../components/Ad";
import Footer from "../components/Footer";
import { gamesData } from "../assets/assets";
import "./Settings.css";

function Tab({ page }) {
  const [description, setDescription] = useState("");
  const [games, setGames] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "orange");
  const recents = localStorage.getItem("recents") ? JSON.parse(localStorage.getItem("recents")) : [];
  const tabNameInput = useRef();
  const tabFaviconInput = useRef();
  const embedInput = useRef();

  function embed(_, link = null) {
    let urlt = link ? link : embedInput.current.value;
    console.log(urlt);
    if (!urlt.startsWith("https://") && !urlt.startsWith("http://")) {
      urlt = `https://${urlt.split("https://").pop()}`;
    } else if (urlt.startsWith("http://")) {
      urlt = `https://${urlt.split("http://").pop()}`;
    }
    const win = window.open();
    win.document.body.style.margin = "0";
    win.document.body.style.height = "100vh";
    const iframe = win.document.createElement("iframe");
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = "0";
    iframe.referrerpolicy = "no-referrer";
    iframe.allow = "fullscreen";
    iframe.src = urlt;
    win.document.body.appendChild(iframe);
  }

  useEffect(() => {
    document.body.classList.remove("light");
    document.body.classList.remove("red");
    document.body.classList.remove("blue");
    document.body.classList.remove("green");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    switch (page) {
      case "new":
        setDescription(
          "On each seasonal update we add tons of new games to MacVG, and you can access the games added in the previous update here! Play and discover all the new awesome games directly from the New tab!"
        );
        setGames(gamesData.games.filter((game) => game.new));
        break;
      case "trending":
        setDescription(
          "Here are the top 10 games on MacVG right now, sorted by total plays! View and play the most popular games everyone's playing, all easily through the Trending tab! (This list updates every season)"
        );
        setGames(gamesData.games.filter((game) => game.trending).sort((a, b) => b.trending - a.trending));
        break;
      case "recent":
        setDescription(
          "With the Recent tab, you can quickly access the games you've recently played, making it easy to jump right back and continue playing them without browsing through every game to find them!"
        );
        setGames(recents.map((recent) => gamesData.games.find((game) => game.id.toString() === recent)));
        break;
      case "settings":
        setDescription(
          "Here, you can set a fully customized theme for a more personalized gaming experience, select a cloaker to change and customize the game site's tab name, and open different websites using our about:blank embedder!"
        );
        break;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ad failed to load", e);
    }
  }, [page]);

  return (
    <>
      <title>{`${page[0].toUpperCase() + page.substring(1)} | MacVG`}</title>
      <NavBar />
      <div className="wrap">
        <div className="content">
          <Hero title={page[0].toUpperCase() + page.substring(1)} description={description} />
          <Ad type="3087664545" />
          {page !== "settings" && (
            <div className="games-container">
              {page !== "trending" && games.map((game) => <GameCard key={game.id} game={game} />)}
              {page === "trending" && (
                <div className="trending-games">
                  {games.map((game, i) => (
                    <div className="trending-game">
                      <div className="trending-plays">
                        <h3>#{i + 1}</h3> {game.trending?.toLocaleString()} plays
                      </div>
                      <GameCard key={game.id} game={game} />
                    </div>
                  ))}
                </div>
              )}
              {games.length === 0 && (
                <>
                  {page === "new" && (
                    <>
                      No games found. Request a game{" "}
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScE9-d6agIablAARRlwVDUAcL7N6V4AVR6-c33dhVPSaR45CA/viewform"
                        target="_blank"
                        className="games-link"
                      >
                        here
                      </a>
                      !
                    </>
                  )}
                  {page === "recent" && (
                    <>
                      You haven't played any games on MacVG yet! Browse our collection of the best online games on the homepage or
                      from the tabs above!
                    </>
                  )}
                </>
              )}
            </div>
          )}
          {page === "settings" && (
            <div className="settings">
              <div className="setting">
                <h2 className="setting-name">Themes</h2>
                <select className="setting-dropdown" value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <option value="orange">Sun</option>
                  <option value="blue">Ocean</option>
                  <option value="green">Forest</option>
                  <option value="red">Mars</option>
                </select>
              </div>
              <div className="setting">
                <h2 className="setting-name">Tab Cloaker</h2>
                <p className="setting-description">
                  <span
                    onClick={() => {
                      localStorage.setItem("macvg-cloaker", "");
                      localStorage.setItem("macvg-favicon", "");
                      window.location.reload();
                    }}
                  >
                    Uncloak
                  </span>
                </p>
                <form className="hero-search">
                  <input type="text" className="hero-search-bar" placeholder="Enter tab name here" ref={tabNameInput} />
                  <button
                    className="setting-search-img"
                    onClick={() => {
                      localStorage.setItem("macvg-cloaker", tabNameInput.current.value);
                      document.title = tabNameInput.current.value;
                    }}

                    type="submit"
                  >
                    Go
                  </button>
                </form>
                <form className="hero-search">
                  <input type="text" className="hero-search-bar" placeholder="Enter tab image URL here" ref={tabFaviconInput} />
                  <button className="setting-search-img" 
                    onClick={() => {
                      localStorage.setItem("macvg-favicon", tabFaviconInput.current.value);
                      window.location.reload()
                    }} type="submit">
                    Go
                  </button>
                </form>
              </div>
              <div className="setting">
                <h2 className="setting-name">About:blank embedder</h2>
                <p className="setting-description">
                  Open a website in an about:blank page.{" "}
                  <span onClick={(e) => embed(e, window.location.href)}>Open MacVG in about:blank</span>
                </p>
                <form className="hero-search">
                  <input type="text" className="hero-search-bar" placeholder="Enter URL address here" ref={embedInput} />
                  <button className="setting-search-img" onClick={embed} type="submit">
                    Go
                  </button>
                </form>
              </div>
            </div>
          )}
          <Ad type="3087664545" />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Tab;
