import type { SaciHalloweenTeam } from "../../types/domain/cosmetics/saci-halloween-team.js";

/** Share of the Saci team, in whole percent; `null` when nobody has chosen yet. */
export function saciShare(counts: Record<SaciHalloweenTeam, number>): number | null {
  const total = counts.saci + counts.halloween;
  return total > 0 ? Math.round((counts.saci / total) * 100) : null;
}
