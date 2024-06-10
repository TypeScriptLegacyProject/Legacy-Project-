import React, { useState } from 'react';


export default function condition({ show, onClose, onConfirm, title, productId }) {
  const [condition, setCondition] = useState("");

  const handleConfirm = () => {
    onConfirm(productId, condition);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div>
          <label>
            <input
              type="radio"
              value="Flash Sales"
              checked={condition === "Flash Sales"}
              onChange={() => setCondition("Flash Sales")}
            />
            Flash Sales
          </label>
          <label>
            <input
              type="radio"
              value="Best Seller"
              checked={condition === "Best Seller"}
              onChange={() => setCondition("Best Seller")}
            />
            Best Seller
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
