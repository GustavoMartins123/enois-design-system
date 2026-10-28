import type { BlocksCell } from "./blocks-cell.js";

export type BlocksState = {
  date: string;
  status: "NOT_STARTED" | "PLAYING" | "WON" | "LOST" | "TIMED_OUT";
  score: number;
  lines: number;
  actions: number;
  board: string[];
  activeCells: BlocksCell[];
  nextCells: BlocksCell[];
  pieces: number[];
  rulesVersion: number;
};
