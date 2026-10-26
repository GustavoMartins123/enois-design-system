/** Resultado da última exportação/importação de arquivo de tema, mostrado abaixo dos botões. */
export type AppearanceFileStatus =
  | { kind: "ok" }
  | {
      kind: "error";
      reason: "json" | "format" | "version" | "collection" | "settings" | "background";
    };
