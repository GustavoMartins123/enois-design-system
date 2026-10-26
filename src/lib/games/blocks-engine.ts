import type { BlocksAction } from "../../types/domain/games/blocks-action.js";
import type { BlocksState } from "../../types/domain/games/blocks-state.js";

// Espelho do BlocksEngine.java (rules version 2): grade 10x20, gravidade a cada 5 ticks de
// 100 ms, rotação horária sem wall kick, peça O não gira, spawn em x=3/y=0, pontuação
// 100/300/500/800 e objetivo diario de 3 linhas.
export const WIDTH = 10;
export const HEIGHT = 20;
export const TARGET_LINES = 3;
export const TICK_MS = 100;
export const GRAVITY_EVERY = 5;
export const MAX_TICKS = 6000;
export const MAX_ACTIONS = 6000;
export const REFILL_THRESHOLD = 20;

export const SHAPES: number[][][] = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [1, 1],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 1],
  ],
  [
    [1, 0],
    [2, 0],
    [0, 1],
    [1, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [2, 0],
    [0, 1],
    [1, 1],
    [2, 1],
  ],
];
export const SHAPE_NAMES = ["I", "O", "T", "S", "Z", "J", "L"];

// Cores temáticas para cada tipo de peça
export const PIECE_COLORS: Record<number, { bg: string; text: string; ghost: string }> = {
  0: { bg: "bg-cyan-500", text: "text-white", ghost: "border-cyan-500/60 bg-cyan-500/20" }, // I
  1: { bg: "bg-amber-400", text: "text-amber-950", ghost: "border-amber-400/60 bg-amber-400/20" }, // O
  2: { bg: "bg-purple-500", text: "text-white", ghost: "border-purple-500/60 bg-purple-500/20" }, // T
  3: { bg: "bg-emerald-500", text: "text-white", ghost: "border-emerald-500/60 bg-emerald-500/20" }, // S
  4: { bg: "bg-rose-500", text: "text-white", ghost: "border-rose-500/60 bg-rose-500/20" }, // Z
  5: { bg: "bg-blue-500", text: "text-white", ghost: "border-blue-500/60 bg-blue-500/20" }, // J
  6: { bg: "bg-orange-500", text: "text-white", ghost: "border-orange-500/60 bg-orange-500/20" }, // L
};
export function shapeCells(piece: number, rotation: number): { x: number; y: number }[] {
  return SHAPES[piece].map(([cx, cy]) => {
    let x = cx;
    let y = cy;
    if (piece !== 1) {
      for (let turn = 0; turn < rotation; turn++) {
        const old = x;
        x = -y;
        y = old;
      }
    }
    return { x, y };
  });
}

export function freshBag(): number[] {
  const bag = [0, 1, 2, 3, 4, 5, 6];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}

export function createLocalGame() {
  return {
    rows: Array.from({ length: HEIGHT }, () => Array.from({ length: WIDTH }, () => ".")),
    bag: freshBag(),
    // Fila oficial de próximas peças (vem de BlocksState.pieces); o bag local é o fallback.
    queue: [] as number[],
    piecesSync: false,
    requestRefill: null as (() => void) | null,
    piece: 0,
    rotation: 0,
    x: 3,
    y: 0,
    next: 0,
    score: 0,
    lines: 0,
    ticks: 0,
    actions: 0,
    lastInputTick: -1,
    status: "PLAYING" as "PLAYING" | "WON" | "LOST" | "TIMED_OUT",
  };
}

export function takeNext(game: ReturnType<typeof createLocalGame>): number {
  if (game.queue.length > 0) return game.queue.shift() ?? 0;
  if (game.bag.length === 0) game.bag = freshBag();
  return game.bag.pop() ?? 0;
}

export function fits(
  game: ReturnType<typeof createLocalGame>,
  x: number,
  y: number,
  rotation: number,
): boolean {
  return shapeCells(game.piece, rotation).every((cell) => {
    const bx = x + cell.x;
    const by = y + cell.y;
    return bx >= 0 && bx < WIDTH && by >= 0 && by < HEIGHT && game.rows[by][bx] === ".";
  });
}

export function gameCells(game: ReturnType<typeof createLocalGame>): { x: number; y: number }[] {
  return shapeCells(game.piece, game.rotation).map((cell) => ({
    x: game.x + cell.x,
    y: game.y + cell.y,
  }));
}

export function getGhostY(game: ReturnType<typeof createLocalGame>): number {
  let gy = game.y;
  while (fits(game, game.x, gy + 1, game.rotation)) {
    gy++;
  }
  return gy;
}

export function ghostCells(game: ReturnType<typeof createLocalGame>): { x: number; y: number }[] {
  const gy = getGhostY(game);
  return shapeCells(game.piece, game.rotation).map((cell) => ({
    x: game.x + cell.x,
    y: gy + cell.y,
  }));
}

export function spawn(game: ReturnType<typeof createLocalGame>) {
  game.piece = game.next;
  game.rotation = 0;
  game.x = 3;
  game.y = 0;
  game.next = takeNext(game);
  if (game.piecesSync && game.queue.length < REFILL_THRESHOLD) game.requestRefill?.();
  if (!fits(game, game.x, game.y, game.rotation)) game.status = "LOST";
}

export function lock(game: ReturnType<typeof createLocalGame>) {
  for (const cell of shapeCells(game.piece, game.rotation)) {
    game.rows[game.y + cell.y][game.x + cell.x] = "#";
  }
  let cleared = 0;
  for (let row = HEIGHT - 1; row >= 0; row--) {
    if (game.rows[row].every((ch) => ch === "#")) {
      game.rows.splice(row, 1);
      game.rows.unshift(Array.from({ length: WIDTH }, () => "."));
      cleared++;
      row++;
    }
  }
  game.lines += cleared;
  game.score +=
    cleared === 1 ? 100 : cleared === 2 ? 300 : cleared === 3 ? 500 : cleared === 4 ? 800 : 0;
  if (game.lines >= TARGET_LINES) game.status = "WON";
  else spawn(game);
}

export function gravity(game: ReturnType<typeof createLocalGame>) {
  if (game.status !== "PLAYING") return;
  if (fits(game, game.x, game.y + 1, game.rotation)) game.y++;
  else lock(game);
}

export function stepGame(game: ReturnType<typeof createLocalGame>, action: BlocksAction) {
  if (game.status !== "PLAYING") return;
  game.actions++;
  if (action === "LEFT") {
    if (fits(game, game.x - 1, game.y, game.rotation)) game.x--;
  } else if (action === "RIGHT") {
    if (fits(game, game.x + 1, game.y, game.rotation)) game.x++;
  } else if (action === "ROTATE") {
    const rotation = (game.rotation + 1) % 4;
    if (fits(game, game.x, game.y, rotation)) game.rotation = rotation;
  } else if (action === "SOFT_DROP") {
    gravity(game);
  } else if (action === "HARD_DROP") {
    while (fits(game, game.x, game.y + 1, game.rotation)) game.y++;
    lock(game);
  }
}

export function identifyPiece(
  cells: { x: number; y: number }[],
): { piece: number; rotation: number; x: number; y: number } | null {
  if (cells.length !== 4) return null;
  const placed = new Set(cells.map((cell) => `${cell.x},${cell.y}`));
  for (let piece = 0; piece < SHAPES.length; piece++) {
    for (let rotation = 0; rotation < 4; rotation++) {
      const shape = shapeCells(piece, rotation);
      for (const anchor of cells) {
        const x = anchor.x - shape[0].x;
        const y = anchor.y - shape[0].y;
        if (shape.every((cell) => placed.has(`${x + cell.x},${y + cell.y}`))) {
          return { piece, rotation, x, y };
        }
      }
    }
  }
  return null;
}

export function identifyShape(cells: { x: number; y: number }[]): number {
  const key = cells
    .map((cell) => `${cell.x},${cell.y}`)
    .sort()
    .join(" ");
  for (let piece = 0; piece < SHAPES.length; piece++) {
    const shape = SHAPES[piece]
      .map(([x, y]) => `${x},${y}`)
      .sort()
      .join(" ");
    if (shape === key) return piece;
  }
  return -1;
}

export function normalizePieces(input: number[] | undefined): number[] {
  if (!Array.isArray(input)) return [];
  return input.filter((piece) => Number.isInteger(piece) && piece >= 0 && piece < SHAPES.length);
}

export function fromServerState(state: BlocksState): ReturnType<typeof createLocalGame> {
  const game = createLocalGame();
  if (state.board.length === HEIGHT && state.board.every((row) => row.length === WIDTH)) {
    game.rows = state.board.map((row) => row.split(""));
  }
  game.score = state.score;
  game.lines = state.lines;
  game.actions = state.actions;
  const current = identifyPiece(state.activeCells);
  if (current) {
    game.piece = current.piece;
    game.rotation = current.rotation;
    game.x = current.x;
    game.y = current.y;
  }
  const serverPieces = normalizePieces(state.pieces);
  if (serverPieces.length > 0) {
    // Sequência oficial: pieces[0] é a peça logo após a ativa (igual a nextCells).
    game.piecesSync = true;
    if (current) {
      game.next = serverPieces[0];
      game.queue = serverPieces.slice(1);
    } else {
      game.piece = serverPieces[0];
      game.next = serverPieces.length > 1 ? serverPieces[1] : takeNext(game);
      game.queue = serverPieces.slice(2);
    }
  } else {
    // Fallback (não-PLAYING ou servidor sem pieces): mantém o bag local aleatório.
    game.next = identifyShape(state.nextCells);
    if (game.next < 0) game.next = takeNext(game);
    if (!current) game.piece = takeNext(game);
  }
  return game;
}
