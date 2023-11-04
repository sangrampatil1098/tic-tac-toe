import React from "react";

const Log = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.rowIndex}${turn.square.colIndex}`}>
          player {turn.player} selected {turn.square.rowIndex}{" "}
          {turn.square.colIndex}
        </li>
      ))}
    </ol>
  );
};

export default Log;
