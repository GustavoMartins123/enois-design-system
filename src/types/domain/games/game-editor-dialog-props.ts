import type { GameEditorData } from "./game-editor-data.js";
import type { GameEditorValues } from "./game-editor-values.js";
import type { GameImageKind } from "./game-image-kind.js";

export type GameEditorDialogProps = {
  game: GameEditorData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savePending?: boolean;
  onSave: (values: GameEditorValues) => void;
  /** Sobe a imagem e devolve o endereço salvo; `null` quando falhou (o app já avisou). */
  onUploadImage: (kind: GameImageKind, file: File) => Promise<string | null>;
  deleteConfirmOpen: boolean;
  onDeleteConfirmOpenChange: (open: boolean) => void;
  deletePending?: boolean;
  onDelete: () => void;
};
