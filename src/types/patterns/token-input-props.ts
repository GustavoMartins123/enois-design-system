import type { Ref } from "react";

import type { TokenInputHandle } from "./token-input-handle.js";

export type TokenInputProps = {
  values: string[];
  /** May be called multiple times for one pasted list; use functional state updates. */
  onAdd: (token: string) => void;
  onRemove: (token: string) => void;
  label: string;
  hint?: string;
  placeholder?: string;
  max: number;
  maxLength: number;
  suggestions?: string[];
  suggestionsLabel?: string;
  limitMessage?: string;
  /** Optional domain-specific feedback when an existing token is entered again. */
  duplicateMessage?: string;
  count?: (count: number, max: number) => string;
  removeLabel?: (token: string) => string;
  disabled?: boolean;
  id?: string;
  ref?: Ref<TokenInputHandle>;
};
