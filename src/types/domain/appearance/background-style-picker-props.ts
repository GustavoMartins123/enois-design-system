import type { BackgroundStyle } from "../../lib/theme/background-style.js";

export type BackgroundStylePickerProps = {
  /** Escolha atual; `null` é o comportamento automático (tingimento fino). */
  value: BackgroundStyle | null;
  /** Chamado a cada mudança — a aplicação é imediata, como no resto do diálogo. */
  onChange: (style: BackgroundStyle | null) => void;
};
