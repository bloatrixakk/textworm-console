import React, { useState } from 'react';
import './Dropdown.css'; // optional styling

export default function Dropdown({ options, selected, onSelect, placeholder = 'Select...' }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    onSelect(value);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={() => setOpen(!open)}>
        {selected || placeholder}
        <span className="dropdown-arrow">{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div className="dropdown-list">
          {options.map((option, i) => (
            <div
              key={i}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
