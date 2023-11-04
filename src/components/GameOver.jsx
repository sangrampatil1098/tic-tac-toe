import React from "react";

const GameOver = ({ winner, setGameTurns }) => {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && (
        <p>
          {winner} won! Congratulation {winner}
        </p>
      )}
      {!winner && <p>It's a draw</p>}
      <button onClick={() => setGameTurns([])}>Rematch</button>
    </div>
  );
};

export default GameOver;
