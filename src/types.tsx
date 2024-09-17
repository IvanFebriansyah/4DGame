export type PlayerNumber = 1 | 2;
export type WinType = -1 | 0 | PlayerNumber;
export type Dropped = {
  x: number;
  y: number;
  player: PlayerNumber;
};