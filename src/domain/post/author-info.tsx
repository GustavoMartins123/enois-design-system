import { useMessages } from "../../messages/messages-context.js";
import type { AuthorInfoProps } from "../../types/domain/post/author-info-props.js";
import { AppLink } from "../../ui/app-link.js";
import { UserAvatar } from "../avatar/user-avatar.js";
import { UserBadges } from "../badges/user-badges.js";
import { ContributorTag } from "../name/contributor-tag.js";
import { StyledName } from "../name/styled-name.js";

/** Avatar + nome + tempo relativo do autor de um post, com a comunidade quando houver. */
export function AuthorInfo({
  authorName,
  authorStyle,
  authorContributor,
  authorAvatar,
  authorAvatarFrame,
  authorBadge,
  authorBadges,
  authorHref,
  timeLabel,
  community,
  fallbackClassName,
  onFollowCommunity,
  followPending,
  renderAuthorTrigger,
}: AuthorInfoProps) {
  const messages = useMessages().authorInfo;
  const avatar = (
    <UserAvatar
      frame={authorAvatarFrame}
      src={authorAvatar}
      alt={authorName}
      fallbackClassName={fallbackClassName}
      className="h-11 w-11"
    />
  );
  const name = <StyledName name={authorName} style={authorStyle} />;

  // O nome leva para a identidade que ASSINOU: post profissional abre o perfil profissional
  // (o @ é de outro namespace e não existe em /perfil). Quem decide o endereço é o app.
  return (
    <div className="flex items-start gap-3">
      {renderAuthorTrigger ? (
        renderAuthorTrigger(avatar, "avatar")
      ) : (
        <AppLink href={authorHref}>{avatar}</AppLink>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {renderAuthorTrigger ? (
            <span className="font-bold hover:underline text-sm">
              {renderAuthorTrigger(name, "name")}
            </span>
          ) : (
            <AppLink href={authorHref} className="font-bold hover:underline text-sm">
              {name}
            </AppLink>
          )}

          <UserBadges badges={authorBadges} badge={authorBadge} />

          {community ? (
            <span className="text-xs font-normal text-text-subtle">
              {messages.publishedIn}{" "}
              <AppLink href={community.href} className="font-medium text-primary hover:underline">
                {community.name}
              </AppLink>
            </span>
          ) : null}

          {community && !community.joined && onFollowCommunity ? (
            <button
              type="button"
              onClick={onFollowCommunity}
              disabled={followPending}
              className="rounded-full border border-primary/40 px-2.5 py-0.5 text-xs font-semibold text-primary transition hover:bg-primary/10 disabled:opacity-60"
            >
              {followPending ? messages.sending : messages.follow}
            </button>
          ) : null}

          <span className="text-xs font-normal text-text-date">{messages.time(timeLabel)}</span>
        </div>

        {authorContributor && (
          <div className="mt-1">
            <ContributorTag color={authorContributor.color} />
          </div>
        )}
      </div>
    </div>
  );
}
