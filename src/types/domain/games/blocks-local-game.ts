import type { createLocalGame } from "../../../lib/games/blocks-engine.js";

/** A partida local de Blocos (espelho do motor do servidor), mutada a cada tick. */
export type BlocksLocalGame = ReturnType<typeof createLocalGame>;
