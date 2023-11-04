import React, { useState } from "react";

const Player = ({ name, symbol, isActive, handlePlayerName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  return (
    <li className={isActive ? "active" : undefined}>
      <span className={"player"}>
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            onChange={(e) => setPlayerName(e.target.value)}
            value={playerName}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button
        onClick={() => {
          setIsEditing((prev) => !prev);
          if (isEditing) {
            handlePlayerName((prev) => {
              return {
                ...prev,
                [symbol]: playerName,
              };
            });
          }
        }}
      >
        {!isEditing ? "Edit" : "Save"}
      </button>
    </li>
  );
};

export default Player;
