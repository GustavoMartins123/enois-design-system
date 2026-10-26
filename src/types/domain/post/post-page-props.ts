import type { ReactNode } from "react";

export type PostPageProps = {
  /**
   * Endereço da página na ORIGEM DE CONTEUDO (`{CONTENT_ORIGIN}/pages/{postId}`); `null` quando a
   * origem não está configurada e a página roda no quadro isolado de reserva.
   */
  pageUrl: string | null;
  /** Altura do quadro embutido no post (o que passar rola por dentro). */
  embedHeight: number;
  /**
   * Fallback frame (sandboxed HTML, full size, no inner padding, no auto height), rendered when
   * there is no `pageUrl`, both in the post and in the full-screen dialog.
   */
  frame: ReactNode;
};
