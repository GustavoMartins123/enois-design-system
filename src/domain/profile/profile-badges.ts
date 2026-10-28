import type { ProfileGamificationData } from "../../types/domain/profile/profile-gamification-data.js";

/**
 * Os emblemas do perfil: a lista nova e, para quem ainda só tem o emblema antigo (campo único),
 * ele sozinho — a mesma leitura que a página de perfil faz. A primeira imagem é a que acompanha
 * o nome em todo o app.
 */
export function profileBadges(
  profile: Pick<ProfileGamificationData, "badges" | "badge">,
): string[] {
  if (profile.badges?.length) return profile.badges;
  return profile.badge ? [profile.badge] : [];
}
