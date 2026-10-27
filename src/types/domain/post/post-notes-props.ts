import type { PostNoteData } from "./post-note-data.js";

export type PostNotesProps = {
  /** Notas aprovadas (verificação da comunidade). */
  notes: PostNoteData[];
  /** A nota de quem lê está em análise (ou acabou de ser enviada). */
  pending?: boolean;
  /** Motivo da negativa quando a nota de quem lê foi negada; `null` = não foi negada. */
  deniedReason?: string | null;
  /** Quem lê pode pedir uma nota (logado, não é o autor, ainda não enviou). */
  canAdd?: boolean;
  /** Envio em andamento. */
  sending?: boolean;
  /** Envia o texto (já sem espaços nas pontas); `true` fecha o diálogo e limpa o rascunho. */
  onSend: (body: string) => Promise<boolean>;
};
