import { WinType } from "../../types";

type WinnerProps = {
  winner: WinType;
  reset: () => void;
};

const Winner = ({ winner, reset }: WinnerProps) => (
  <p className="center">
    <span>{winner === -1 ? "No player won!" : `Player ${winner} won!`}</span>
    <br />
    <br />
    <button onClick={reset}>Play again?</button>
  </p>
);

export default Winner;