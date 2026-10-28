import { ArrowUpRight } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { ProfileMiniCardProps } from "../../types/domain/cosmetics/profile-mini-card-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";

import { ProfileCard } from "./profile-card.js";

/** The profile card for a popover: compact, with a short bio and the "ver perfil" action. */
export function ProfileMiniCard({ profile, href, onViewProfile, className }: ProfileMiniCardProps) {
  const messages = useMessages().profileMiniCard;
  const action = href ? (
    <AppLink href={href} className="cos-card__link">
      {messages.viewProfile}
      <ArrowUpRight size={14} aria-hidden />
    </AppLink>
  ) : (
    <Button size="sm" variant="outline" onClick={onViewProfile}>
      {messages.viewProfile}
    </Button>
  );
  return <ProfileCard profile={profile} compact actions={action} className={className} />;
}
