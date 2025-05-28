function Popup({ title, description, setState }) {
  function handleClosePopup() {
    setState(false);
  }

  return (
    <div className="popup">
      <div className="popup-block">
        <h2 className="popup-title">{title}</h2>
        <p className="popup-description">{description}</p>
        <button className="popup-close" onClick={handleClosePopup}>
          Ok
        </button>
      </div>
    </div>
  );
}

export default Popup;
