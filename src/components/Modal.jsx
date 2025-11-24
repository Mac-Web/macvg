import { Link } from "react-router-dom";
import { useState } from "react";

function Modal({ img = null, name, description = null, link = null, setModal, user = null, setUser = null }) {
  const [userName, setUserName] = useState(user?.name);
  const [userBio, setUserBio] = useState(user?.bio);

  function handleSave(e) {
    e.preventDefault();
    setUser({
      ...user,
      name: userName,
      bio: userBio,
    });
    setModal(false);
  }

  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        if (e.target === e.currentTarget) setModal(false);
      }}
    >
      <form className="modal" onSubmit={(e) => handleSave(e)}>
        <img src={img} className="modal-img" />
        <h2 className="modal-name">{name}</h2>
        {!user ? (
          <p className="modal-description">{description}</p>
        ) : (
          <div className="modal-inputs">
            <input className="modal-input" placeholder="Username" value={userName} onInput={(e) => setUserName(e.target.value)} />
            <input className="modal-input" placeholder="Bio" value={userBio} onInput={(e) => setUserBio(e.target.value)} />
          </div>
        )}
        {link ? (
          <Link to={link} className="action-btn" target="_blank">
            Join Now!
          </Link>
        ) : (
          <button type="submit" className="action-btn">
            Save
          </button>
        )}
      </form>
    </div>
  );
}

export default Modal;
