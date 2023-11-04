import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./WinningCombination";
import GameOver from "./components/GameOver";
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player1",
  O: "Player2",
};

const getWinner = (gameBoard, playerName) => {
  let winner = null;
  for (let combination of WINNING_COMBINATIONS) {
    let firstSymbol = gameBoard[combination[0].row][combination[0].column];
    let secondSymbol = gameBoard[combination[1].row][combination[1].column];
    let thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = playerName[firstSymbol];
    }
  }
  return winner;
};

const getGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];
  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;
    gameBoard[rowIndex][colIndex] = player;
  }
  return gameBoard;
};
function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [playerName, setPlayerName] = useState(PLAYERS);
  let hasDraw;
  let activePlayer = gameTurns[0]?.player;

  const handleSelectBoard = (rowIndex, colIndex) => {
    // setActivePlayer((activePlayer) => (activePlayer === "X" ? "O" : "X"));
    setGameTurns((prev) => {
      let currentPlayer = "X";
      if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedGameTurn = [
        {
          square: { rowIndex: rowIndex, colIndex: colIndex },
          player: currentPlayer,
        },
        ...gameTurns,
      ];
      return updatedGameTurn;
    });
  };
  const gameBoard = getGameBoard(gameTurns);

  const winner = getWinner(gameBoard, playerName);

  hasDraw = gameTurns.length === 9 && !winner;

  console.log(gameTurns);
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={playerName["X"]}
            symbol="X"
            isActive={activePlayer === "X"}
            handlePlayerName={setPlayerName}
          />
          <Player
            name={playerName["O"]}
            symbol="O"
            isActive={activePlayer === "O"}
            handlePlayerName={setPlayerName}
          />
        </ol>

        {(winner || hasDraw) && (
          <GameOver winner={winner} setGameTurns={setGameTurns} />
        )}
        <GameBoard onSelect={handleSelectBoard} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
