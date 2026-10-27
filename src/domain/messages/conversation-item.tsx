import { useMessages } from "../../messages/messages-context.js";
import type { ConversationItemProps } from "../../types/domain/messages/conversation-item-props.js";
import { AppLink } from "../../ui/app-link.js";
import { UserAvatar } from "../avatar/user-avatar.js";
import { UserBadges } from "../badges/user-badges.js";
import { StyledName } from "../name/styled-name.js";

/** Uma linha da lista de conversas. Vive fora da rota para o dock poder reaproveitá-la. */
export function ConversationItem({
  conversation,
  peer,
  profileHref,
  timeLabel,
  isActive,
  onSelect,
  selecting,
  selected,
}: ConversationItemProps) {
  const messages = useMessages().conversationItem;
  const title = conversation.title ?? peer?.name ?? messages.conversationFallback;

  return (
    <li>
      <button
        onClick={onSelect}
        className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
          selected ? "bg-primary-soft" : isActive ? "bg-primary-soft" : "hover:bg-muted"
        }`}
      >
        {selecting && (
          <span
            aria-hidden
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
              selected ? "border-primary bg-primary text-primary-foreground" : "border-border-soft"
            }`}
          >
            {selected ? "✓" : ""}
          </span>
        )}
        <AppLink href={profileHref}>
          <UserAvatar src={peer?.avatar} alt={title} className="h-11 w-11 shrink-0" />
        </AppLink>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-sm font-medium">
                {conversation.title ?? <StyledName name={title} style={peer?.nameStyle} />}
              </span>

              <UserBadges badges={peer?.badges} badge={peer?.badge} />
            </span>

            <span className="text-xs text-muted-foreground shrink-0 ml-2">{timeLabel}</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs text-muted-foreground">
              {conversation.lastMessage ?? ""}
            </p>
            {conversation.unread > 0 && (
              <span className="grid h-5 min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                {conversation.unread}
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}
