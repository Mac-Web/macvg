import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function GameCard({ game }) {
  return (
    <motion.div
      // initial={{ y: 50, opacity: 0 }}
      // whileInView={{ y: 0, opacity: 1 }}
      // viewport={{ once: true }}
      // transition={{ duration: 0.3 }}
    >
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
    </motion.div>
  );
}

export default GameCard;
