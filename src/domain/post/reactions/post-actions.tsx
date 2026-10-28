import { useEffect, useRef, useState } from "react";

import { Bookmark, Flag, Heart, MessageSquare, Repeat2, Share2 } from "lucide-react";

import { useMessages } from "../../../messages/messages-context.js";
import type { PostActionsProps } from "../../../types/domain/post/post-actions-props.js";

import { ReactionPicker } from "./reaction-picker.js";

/**
 * A fileira de ações de um post: reagir, ver quem reagiu, comentar, compartilhar, salvar e
 * denunciar.
 *
 * Era o rodapé do card do feed e virou peça própria porque o post do blog é o MESMO post (o
 * ponteiro do feed tem o id do post do blog) e ficava sem ação nenhuma lá — reagir, comentar e
 * compartilhar só existiam no feed. Os diálogos (repost, reações, selos, denúncia) chegam prontos
 * do app em `dialogs`.
 */
export function PostActions<T extends string>({
  emojis,
  reactionStatus,
  onReact,
  reactionPending,
  motionAllowed,
  reactionCount,
  commentsCount,
  savesCount,
  saved,
  canRepost,
  onShowReactions,
  onComments,
  onRepost,
  onShare,
  onReport,
  onSave,
  children,
  dialogs,
}: PostActionsProps<T>) {
  const messages = useMessages().postActions;
  const wasReactionPending = useRef(reactionPending);
  const [reactionPulse, setReactionPulse] = useState<T | null>(null);

  useEffect(() => {
    // Só a nova ação dispara o pulso: carregar o feed ou desfazer uma falha não celebra a reação.
    if (reactionPending && !wasReactionPending.current) {
      setReactionPulse(motionAllowed() ? reactionStatus : null);
    }
    wasReactionPending.current = reactionPending;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- motionAllowed is read at the transition only
  }, [reactionPending, reactionStatus]);

  return (
    <>
      <footer className="mt-4 flex flex-wrap items-center justify-between gap-1 border-t border-border pt-3 text-sm text-muted-foreground">
        <div className="flex items-center">
          {/* Coração primeiro — reação principal, estilo LinkedIn. */}
          <ReactionPicker
            emojis={emojis}
            activeType={reactionStatus}
            onReact={onReact}
            buttonClassName={`flex items-center gap-1.5 rounded-lg px-2.5 py-2.5 transition hover:bg-muted hover:text-foreground ${
              reactionStatus ? "text-primary" : ""
            }`}
            buttonTitle={
              reactionStatus ? messages.reactedWith(emojis[reactionStatus]) : messages.react
            }
          >
            <span
              key={reactionStatus ?? "none"}
              className={`grid h-4 w-4 place-items-center ${
                reactionPulse && reactionPulse === reactionStatus
                  ? "post-action-reaction-pulse"
                  : ""
              }`}
              onAnimationEnd={() => setReactionPulse(null)}
            >
              {reactionStatus ? (
                <span className="text-base leading-none">{emojis[reactionStatus]}</span>
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </span>
          </ReactionPicker>

          {reactionCount > 0 && (
            <button
              type="button"
              onClick={onShowReactions}
              title={messages.seeWho(reactionCount)}
              aria-label={messages.seeWho(reactionCount)}
              aria-haspopup="dialog"
              className="flex h-9 items-center rounded-lg px-1.5 text-xs tabular-nums text-muted-foreground transition hover:bg-muted hover:text-foreground hover:underline decoration-dotted underline-offset-4"
            >
              {reactionCount}
            </button>
          )}

          <button
            onClick={onComments}
            title={messages.comments}
            aria-label={messages.comments}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2.5 transition hover:bg-muted hover:text-foreground"
          >
            <MessageSquare className="h-4 w-4" />

            <span className="text-xs tabular-nums">{commentsCount}</span>
          </button>

          {canRepost && (
            <button
              onClick={onRepost}
              title={messages.repost}
              aria-label={messages.repost}
              className="flex items-center rounded-lg px-2.5 py-2.5 transition hover:bg-muted hover:text-foreground"
            >
              <Repeat2 className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onShare}
            title={messages.share}
            aria-label={messages.share}
            className="flex items-center rounded-lg px-2.5 py-2.5 transition hover:bg-muted hover:text-foreground"
          >
            <Share2 className="h-4 w-4" />
          </button>

          {children}

          <button
            onClick={onReport}
            title={messages.report}
            aria-label={messages.report}
            className="flex items-center rounded-lg px-2.5 py-2.5 transition hover:bg-muted hover:text-foreground"
          >
            <Flag className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={onSave}
          title={saved ? messages.unsave : messages.save}
          aria-label={saved ? messages.unsave : messages.save}
          aria-pressed={saved}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-muted ${
            saved ? "text-primary" : "hover:text-foreground"
          }`}
        >
          <Bookmark className="post-action-bookmark h-4 w-4" data-saved={saved} />

          <span className="text-xs tabular-nums">{savesCount}</span>
        </button>
      </footer>

      {dialogs}
    </>
  );
}
