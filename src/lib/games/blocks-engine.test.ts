import { describe, expect, it } from "vitest";

import { HEIGHT, WIDTH, createLocalGame, fromServerState, stepGame } from "./blocks-engine.js";

describe("blocks engine", () => {
  it("queda instantânea do I deitado limpa a linha quase cheia e pontua", () => {
    const game = createLocalGame();
    game.rows[HEIGHT - 1] = [".", ".", ".", ".", "#", "#", "#", "#", "#", "#"];
    game.piece = 0;
    game.x = 0;
    stepGame(game, "HARD_DROP");
    expect(game.lines).toBe(1);
    expect(game.score).toBe(100);
    expect(game.rows[HEIGHT - 1].every((cell) => cell === ".")).toBe(true);
  });

  it("estado do servidor: peça ativa reconhecida e fila oficial de peças", () => {
    const board = Array.from({ length: HEIGHT }, () => ".".repeat(WIDTH));
    const game = fromServerState({
      date: "2026-10-26",
      status: "PLAYING",
      score: 0,
      lines: 0,
      actions: 2,
      board,
      activeCells: [
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 3, y: 1 },
        { x: 4, y: 1 },
      ],
      nextCells: [],
      pieces: [2, 5, 6],
      rulesVersion: 2,
    });
    expect(game.piece).toBe(1);
    expect({ x: game.x, y: game.y }).toEqual({ x: 3, y: 0 });
    expect(game.next).toBe(2);
    expect(game.queue).toEqual([5, 6]);
    expect(game.piecesSync).toBe(true);
  });
});
