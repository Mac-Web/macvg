import { useEffect, useState } from "react";
import { github, streak, nostreak } from "../assets/assets";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Ad from "../components/Ad";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import "./Me.css";

function Me() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("macvg-user")) || {
      name: "User " + Math.round(Math.random() * 10000),
      bio: "Tell people a bit about yourself",
      streak: 0,
    }
  );
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Ad failed to load", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("macvg-user", JSON.stringify(user));
  }, [user]);

  function handleDelete() {
    if (confirm("Are you sure you want to delete your account on MacVG? This action cannot be undone.")) {
      localStorage.removeItem("macvg-user");
      window.location.reload();
    }
  }

  return (
    <>
      <title>My Profile | MacVG</title>
      <NavBar />
      <div className="wrap">
        <div className="content">
          <Hero
            title="My Profile"
            description="This is your gamer profile, where you can keep track of your daily login streaks, earn rare achievements from playing different games, and customize your profile to show off to other gamers on MacVG!"
          />
          <div className="profile">
            <img src={github} className="profile-icon" />
            <div className="profile-content">
              <div
                className={`profile-streak ${user.streak > 0 ? "" : "no-streak"}`}
                title="Log in daily to increase your streak!"
              >
                <img src={user.streak > 0 ? streak : nostreak} className="streak-img" /> {user.streak}
              </div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-bio">{user.bio}</p>
              <button className="action-btn" onClick={() => setEditing(true)}>
                Edit
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete account
              </button>
            </div>
          </div>
          <div className="profile-sections">
            <div className="profile-section">
              <h2 className="profile-section-title">Achievements</h2>
              <p className="profile-section-description">Achievements coming soon!</p>
            </div>
            <div className="profile-section">
              <h2 className="profile-section-title">My Favorite Games</h2>
              <p className="profile-section-description">Showcase coming soon!</p>
            </div>
          </div>
          <Ad type="3087664545" />
          {editing && <Modal name="Edit user profile" setModal={setEditing} user={user} setUser={setUser} />}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Me;
