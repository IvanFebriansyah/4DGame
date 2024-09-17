import { useEffect, useState } from "react";
import "./DropZone.css";
import { cols, rows, size } from "../../constans/constants";
import ActiveMarble from "../ActiveMarble/ActiveMarble";
import Winner from "../Winner/Winner";
import { Dropped, PlayerNumber, WinType } from "../../types";

const DropZone = () => {
  const [dropped, setDropped] = useState<Dropped[]>([]);
  const [turn, setTurn] = useState<PlayerNumber>(1);
  const [winner, setWinner] = useState<WinType>(0);

  const checkWinCondition = (
    playerMoves: Dropped[],
    playerNumber: PlayerNumber
  ) => {
    const directions = [
      { x: 1, y: 0 }, // Horizontal
      { x: 0, y: 1 }, // Vertical
      { x: 1, y: 1 }, // Diagonal down-right
      { x: 1, y: -1 }, // Diagonal up-right
    ];

    for (let { x, y } of playerMoves) {
      for (let dir of directions) {
        if (
          playerMoves.some((m) => m.x === x + dir.x && m.y === y + dir.y) &&
          playerMoves.some(
            (m) => m.x === x + 2 * dir.x && m.y === y + 2 * dir.y
          ) &&
          playerMoves.some(
            (m) => m.x === x + 3 * dir.x && m.y === y + 3 * dir.y
          )
        ) {
          setWinner(playerNumber);
          return true;
        }
      }
    }
    return false;
  };

  const findWinner = () => {
    const p1Moves = dropped.filter((d) => d.player === 1);
    const p2Moves = dropped.filter((d) => d.player === 2);

    if (checkWinCondition(p1Moves, 1)) return;
    if (checkWinCondition(p2Moves, 2)) return;
  };

  const reset = () => {
    setTurn(1);
    setDropped([]);
    setWinner(0);
  };

  useEffect(() => {
    if (dropped.length === rows * cols) setWinner(-1);

    findWinner();
  }, [dropped.length]);

  return (
    <div className="drop-zone">
      {dropped.map((m, i) => (
        <div
          key={i}
          className={`p${m.player}`}
          style={{
            transform: `translate(${m.y * size}px,${m.x * size + 150}px)`,
          }}
        ></div>
      ))}

      {winner ? (
        <Winner winner={winner} reset={reset} />
      ) : (
        <ActiveMarble
          turn={turn}
          dropped={dropped}
          setDropped={setDropped}
          setTurn={setTurn}
        />
      )}
    </div>
  );
};

export default DropZone;