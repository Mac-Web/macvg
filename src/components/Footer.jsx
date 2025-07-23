import { Link } from "react-router-dom";
import { logo, email, youtube, github, discord } from "../assets/assets";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">
        <Link to="/" className="footer-logo">
          <img src={logo} /> MacVG
        </Link>
        <div className="footer-copy">
          &copy; {new Date().getFullYear()}{" "}
          <a href="https://mac-web.github.io" target="_blank">
            MacWeb
          </a>
        </div>
        <div className="footer-copy">All rights reserved</div>
        <div className="footer-copy">
          Made with ❤️ by{" "}
          <a href="https://github.com/tonymac129/" target="_blank">
            Tony Macaroni
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">Browse Games</h2>
        <Link to="/" className="footer-link">
          Home
        </Link>
        <Link to="/new" className="footer-link">
          New
        </Link>
        <Link to="/trending" className="footer-link">
          Trending
        </Link>
        <Link to="/recent" className="footer-link">
          Recent
        </Link>
        <Link to="/settings" className="footer-link">
          Settings
        </Link>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">MacVG Information</h2>
        <a href="https://mac-web.github.io/macblog/apps/macvg" className="footer-link" target="_blank">
          About
        </a>
        <a href="https://mac-web.github.io/macblog/#/apps/macvg/updates" className="footer-link" target="_blank">
          Updates
        </a>
        <a href="https://forms.gle/UpHgbAmLtUPCD5bs8" className="footer-link" target="_blank">
          Feedback
        </a>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">MacWeb Apps</h2>
        <a href="https://mac-web.github.io/" className="footer-link" target="_blank">
          MacWeb
        </a>
        <a href="https://mac-web.github.io/maclearn/" className="footer-link" target="_blank">
          MacLearn
        </a>
        <a href="https://mac-web.github.io/macideas/" className="footer-link" target="_blank">
          MacIdeas
        </a>
        <a href="https://mac-web.github.io/mactools/" className="footer-link" target="_blank">
          MacTools
        </a>
        <a href="https://mac-web.github.io/macblog/" className="footer-link" target="_blank">
          MacBlog
        </a>
      </div>
      <div className="footer-column">
        <h2 className="footer-title">Social</h2>
        <div className="footer-social">
          <a href="mailto:mac.web.company@gmail.com" target="_blank" className="footer-icon" title="Email us">
            <img src={email} />
          </a>
          <a href="https://www.youtube.com/@Mac-Web" target="_blank" className="footer-icon" title="YouTube">
            <img src={youtube} />
          </a>
          <a href="https://github.com/Mac-Web/macvg" target="_blank" className="footer-icon" title="Source code">
            <img src={github} />
          </a>
          <a href="https://discord.gg/UT7g2S2cBP" target="_blank" className="footer-icon" title="Join our server!">
            <img src={discord} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
