import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function ScrollTop() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("macvg-user")) || {
      name: "User " + Math.round(Math.random() * 10000),
      bio: "Tell people a bit about yourself",
      streak: 0,
    }
  );
  const [streak, setStreak] = useState(localStorage.getItem("macvg-streak") || new Date());
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    let last = new Date(streak).toISOString().slice(0, 10);
    let now = new Date().toISOString().slice(0, 10);
    let diff = (new Date(now) - new Date(last)) / (1000 * 60 * 60 * 24);
    if (diff == 1) {
      localStorage.setItem("macvg-user", JSON.stringify({ ...user, streak: user.streak + 1 }));
    } else if (diff == 0) {
      localStorage.setItem("macvg-user", JSON.stringify(user));
    } else {
      localStorage.setItem("macvg-user", JSON.stringify({ ...user, streak: 0 }));
    }
    localStorage.setItem("macvg-streak", new Date());
  }, [pathname]);

  return null;
}

export default ScrollTop;
