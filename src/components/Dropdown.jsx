import { useState, useRef, useEffect } from "react";

function Dropdown({ label, options }) {
  const dropdownRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownLabel, setDropdownLabel] = useState(label);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="filter" ref={dropdownRef}>
      <div className="label" onClick={() => setIsOpen(!isOpen)}>
        {dropdownLabel}
      </div>
      {isOpen && (
        <ul className="filter-list">
          {options.map((option, index) => (
            <li
              key={index}
              className="filter-item"
              onClick={() => {
                option.onClick();
                setDropdownLabel(option.complete);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
