import { ArrowUpRight, Hash, Users } from "lucide-react";

import { useAdapters } from "../../adapters/adapters-context.js";
import { useMessages } from "../../messages/messages-context.js";
import type { ProfileCommunityShelfProps } from "../../types/domain/profile/profile-community-shelf-props.js";
import { AppLink } from "../../ui/app-link.js";

/**
 * O perfil só consulta as comunidades da própria pessoa: a API não expõe os círculos de terceiros,
 * então não inventamos uma associação para quem está visitando o perfil.
 */
export function ProfileCommunityShelf({
  communities,
  loading,
  communitiesHref,
}: ProfileCommunityShelfProps) {
  const allMessages = useMessages();
  const messages = allMessages.profileCommunityShelf;
  const { resolveMediaUrl } = useAdapters();

  return (
    <section className="overflow-hidden rounded-2xl border border-border-soft bg-surface-card shadow-[0_18px_50px_-44px_color-mix(in_oklab,var(--primary)_85%,transparent)]">
      <div className="border-b border-border-soft bg-surface-1/50 px-4 py-4 sm:px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
              {messages.communityEyebrow}
            </p>

            <h2 className="mt-1 text-base font-medium text-text-strong">
              {messages.communityTitle}
            </h2>
          </div>

          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"
            title={messages.communityTitle}
          >
            <Hash className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-text-subtle">
          {messages.communityDescription}
        </p>
      </div>

      {loading ? (
        <p className="px-4 py-4 text-sm text-text-subtle sm:px-5">{messages.loading}</p>
      ) : communities.length > 0 ? (
        <ul className="divide-y divide-border-soft">
          {communities.map((community) => (
            <li key={community.id}>
              <AppLink
                href={community.href}
                className="group flex items-center gap-3 px-4 py-3 transition hover:bg-primary/5 sm:px-5"
              >
                {community.avatar ? (
                  <img
                    src={resolveMediaUrl(community.avatar)}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-xl object-cover ring-1 ring-border-soft"
                  />
                ) : (
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-primary">
                    <Hash className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 truncate text-sm font-medium text-text-strong">
                    <Hash className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />

                    <span className="truncate">{community.name}</span>
                  </span>

                  <span className="mt-0.5 flex items-center gap-2 text-xs text-text-subtle">
                    {typeof community.topicLabel === "string" && (
                      <span className="truncate">{community.topicLabel}</span>
                    )}

                    <span className="inline-flex shrink-0 items-center gap-1">
                      <Users className="h-3 w-3" aria-hidden="true" />

                      <>{allMessages.communityCard.members(community.members ?? 0)}</>
                    </span>
                  </span>
                </span>

                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-text-subtle transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden="true"
                />
              </AppLink>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-4 text-sm leading-relaxed text-text-subtle sm:px-5">
          {messages.communityEmpty}
        </p>
      )}

      <AppLink
        href={communitiesHref}
        className="flex items-center justify-between border-t border-border-soft px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/5 sm:px-5"
      >
        <>{messages.communityAction}</>

        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </AppLink>
    </section>
  );
}
