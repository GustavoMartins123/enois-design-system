import type { AuthorNameStyle } from "../name/author-name-style.js";

/** What a notification row shows. The app maps its notification records into this shape. */
export type NotificationData = {
  id: string;
  kind: string;
  actorId: string | null;
  actorName: string | null;
  /** Personalização do nome de quem agiu (tema/fonte/cor). */
  actorStyle?: AuthorNameStyle | null;
  actorAvatar: string | null;
  /** Actor profile page; null when the actor has no username. */
  actorHref: string | null;
  title: string;
  body: string;
  /** Already formatted relative time ("há 2 horas"). */
  timeLabel: string;
  read: boolean;
  /** Destination handed back to `onOpen` when the row is clicked. */
  href: string;
  ctaLabel: string;
};
