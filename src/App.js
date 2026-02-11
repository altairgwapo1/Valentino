import React, { useState, useRef } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import catheart from "./catheart.gif";
import pixelCatGif from "./pixelcat.gif";

function App() {
  const defaultYesSize = 22;
  const defaultNoSize = 18;

  const [yesSize, setYesSize] = useState(defaultYesSize);
  const [noSize, setNoSize] = useState(defaultNoSize);
  const [isMoving, setIsMoving] = useState(false);
  const [noPosition, setNoPosition] = useState({ top: 0, left: 0 });
  const [message, setMessage] = useState("");
  const [noClicks, setNoClicks] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const yesBtnRef = useRef(null); // ref for YES button

  const sadMessages = [
    "Sure ka? 🥺",
    "Sure najud kaaa?? 😭",
    "Please huna-hunaa… 💔",
    "Muhilak lagi ko ron… 😢",
    "Sige na baaaaaa… 🥹",
    "Last chance nani 😔",
    "Sakit na akong dughan oh 💔😭",
    "Ayaw na pag NO, please 🥺💖",
    "Mahal tika, please be my Valentine 🥹💖",
    "Sige na, promise di nako mag minaldito 🥺💖",
  ];

  // Container dimensions
  const containerWidth = 414;
  const containerHeight = 829;

  const noBtnWidth = 100; // approx button width
  const noBtnHeight = 50; // approx button height

  // Teleport NO button near YES button
  const getSafePositionNearYes = () => {
    if (!yesBtnRef.current) return { top: 0, left: 0 };

    const yesRect = yesBtnRef.current.getBoundingClientRect();

    const minX = yesRect.left - 80;
    const maxX = yesRect.right + 80;
    const minY = yesRect.top - 50;
    const maxY = yesRect.bottom + 50;

    const top = Math.min(
      containerHeight - noBtnHeight,
      Math.max(0, minY + Math.random() * (maxY - minY))
    );
    const left = Math.min(
      containerWidth - noBtnWidth,
      Math.max(0, minX + Math.random() * (maxX - minX))
    );

    return { top, left };
  };

  const handleNo = () => {
    setIsMoving(true);
    setNoClicks((prev) => prev + 1);

    setYesSize((prev) => prev + 4);
    setNoSize((prev) => (prev > 10 ? prev - 2 : prev));

    setNoPosition(getSafePositionNearYes());
    setMessage(sadMessages[noClicks % sadMessages.length]);
  };

  const handleYes = () => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
    setYesSize(defaultYesSize);
    setNoSize(defaultNoSize);
    setIsMoving(false);
    setNoClicks(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setMessage("💖 You’re my Valentine now!");
  };

  return (
    <div
      className="pixel-container"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        margin: "0 auto",
        marginTop: "60px",
        position: "relative",
      }}
    >
      {/* Pixel Cat */}
      <img src={catheart} alt="Pixel Cat" className="pixel-cat" />

      <h1 className="pixel-title">Kisha my love, Will you be my Valentine?</h1>

      <div className="button-wrapper">
        <button
          className="pixel-btn yes"
          style={{ fontSize: `${yesSize}px` }}
          onClick={handleYes}
          ref={yesBtnRef} // attach ref here
        >
          YES
        </button>
        <button
          className="pixel-btn no"
          onClick={handleNo}
          style={{
            fontSize: `${noSize}px`,
            position: isMoving ? "absolute" : "static",
            top: isMoving ? `${noPosition.top}px` : "auto",
            left: isMoving ? `${noPosition.left}px` : "auto",
          }}
        >
          NO
        </button>
      </div>

      <p className="pixel-message">{message}</p>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal pixel-modal">
            <img src={pixelCatGif} alt="Pixel Cat" className="modal-cat" />
            <h2>Yaaayyyy Iloveyouuu babyyyy! 💖</h2>
            <h2>mwamwamwamwamwamwa</h2>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
