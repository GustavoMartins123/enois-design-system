import {
  AlertTriangle,
  Copy,
  Feather,
  Heart,
  HelpCircle,
  Hourglass,
  LifeBuoy,
  Lightbulb,
  Star,
} from "lucide-react";

import type { PostSeal } from "../../types/domain/post/post-seal.js";

/**
 * Os nove selos de post (3x3 no seletor).
 *
 * Selo é a sinalização ao lado da reação: a comunidade marca o post no topo — o que presta
 * (importante, interessante, dica, ajuda, boa pergunta, inspirador) e o que não presta (duplicado,
 * fanfic, massante). Um por pessoa por post; o identificador é o mesmo do backend. Os rótulos
 * ficam em `postSeals` (mensagens).
 */
export const POST_SEALS: PostSeal[] = [
  {
    id: "IMPORTANTE",
    labelKey: "important",
    icon: AlertTriangle,
    className: "border-destructive/30 bg-destructive/10 text-destructive",
  },
  {
    id: "INTERESSANTE",
    labelKey: "interesting",
    icon: Star,
    className: "border-opportunity/40 bg-opportunity/15 text-opportunity-foreground",
  },
  {
    id: "DICA",
    labelKey: "tip",
    icon: Lightbulb,
    className: "border-highlight-insight-text/30 bg-highlight-insight text-highlight-insight-text",
  },
  {
    id: "AJUDA",
    labelKey: "help",
    icon: LifeBuoy,
    className: "border-growth/30 bg-growth/10 text-growth",
  },
  {
    id: "DUPLICADO",
    labelKey: "duplicate",
    icon: Copy,
    className: "border-border-soft bg-surface-2 text-text-subtle",
  },
  {
    id: "FANFIC",
    labelKey: "fanfic",
    icon: Feather,
    className: "border-highlight-project-text/30 bg-highlight-project text-highlight-project-text",
  },
  {
    id: "MASSANTE",
    labelKey: "tiring",
    icon: Hourglass,
    className: "border-border-soft bg-surface-2 text-text-subtle",
  },
  {
    id: "BOA_PERGUNTA",
    labelKey: "goodQuestion",
    icon: HelpCircle,
    className: "border-highlight-article-text/30 bg-highlight-article text-highlight-article-text",
  },
  {
    id: "INSPIRADOR",
    labelKey: "inspiring",
    icon: Heart,
    className: "border-primary/30 bg-primary-soft text-primary",
  },
];

/** O selo pelo id (a API devolve o identificador; a tela precisa do rótulo e do ícone). */
export function postSeal(id: string): PostSeal | null {
  return POST_SEALS.find((seal) => seal.id === id) ?? null;
}
