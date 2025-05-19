import { Link } from "react-router-dom";

function GameCard({ game }) {
  return (
    <Link
      className="game-card"
      id={game.id}
      style={{
        backgroundImage: `linear-gradient(
          rgba(40, 40, 40, 0.2),
          rgba(20, 20, 20, 0.9)
          ),
          url("${game.link + game.thumb}")`,
      }}
      to={`/game/${game.id}`}
    >
      {game.name}
    </Link>
  );
}

export default GameCard;
