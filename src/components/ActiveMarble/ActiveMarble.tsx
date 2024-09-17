import { useEffect, useState } from "react";
import { cols, size } from "../../constans/constants";
import { Dropped, PlayerNumber } from "../../types";

type ActiveMarbleProps = {
  turn: PlayerNumber;
  dropped: Dropped[];
  setDropped: (dropped: Dropped[]) => void;
  setTurn: (turn: PlayerNumber) => void;
};

const ActiveMarble = ({
  turn,
  dropped,
  setDropped,
  setTurn,
}: ActiveMarbleProps) => {
  const [column, setColumn] = useState(0);
  const [row, setRow] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && column > 0) {
        setColumn(column - 1);
      }
      if (e.key === "ArrowRight" && column <= cols) {
        setColumn(column + 1);
      }
      if (e.key === " " || e.key === "Enter") {
        if (dropped.find((drop) => drop.x === 0 && drop.y === column)) {
          return;
        }

        const len = cols - dropped.filter((drop) => drop.y === column).length;

        setRow(len);
        setTimeout(() => {
          setDropped([...dropped, { x: len, y: column, player: turn }]);
          setTurn(turn === 1 ? 2 : 1);
          setRow(-1);
        }, 500);
      }
    };
    document.addEventListener("keyup", handleKeyDown);
    return () => document.removeEventListener("keyup", handleKeyDown);
  }, [column, dropped]);

  return (
    <div
      className={`p${turn} ${row === -1 ? "not-dropped" : ""}`}
      style={{
        marginLeft: column * size + "px",
        transform: `translateY(${row === -1 ? 0 : 150 + row * size}px)`,
      }}
    ></div>
  );
};

export default ActiveMarble;