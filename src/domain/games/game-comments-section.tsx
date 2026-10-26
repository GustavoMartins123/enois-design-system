import { useState } from "react";

import { Trash2 } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { GameCommentsSectionProps } from "../../types/domain/games/game-comments-section-props.js";
import { Button } from "../../ui/button.js";
import { Textarea } from "../../ui/textarea.js";
import { UserAvatar } from "../avatar/user-avatar.js";

export function GameCommentsSection({
  data,
  loading,
  viewerId,
  ownerId,
  addPending = false,
  onAdd,
  onRemove,
}: GameCommentsSectionProps) {
  const messages = useMessages().gameCommentsSection;
  const [body, setBody] = useState("");

  return (
    <section className="surface-card space-y-4 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-medium">{messages.title}</h2>

        {data && <span className="text-sm text-text-subtle">{data.count}</span>}
      </div>

      {viewerId ? (
        <div className="space-y-2">
          <Textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={2}
            maxLength={2000}
            placeholder={messages.placeholder}
          />

          <Button
            size="sm"
            className="rounded-full"
            disabled={body.trim().length < 2 || addPending}
            onClick={() =>
              void onAdd(body.trim()).then(
                () => setBody(""),
                () => {},
              )
            }
          >
            {messages.submit}
          </Button>
        </div>
      ) : (
        <p className="text-sm text-text-subtle">{messages.login}</p>
      )}

      {loading ? (
        <p className="text-sm text-text-subtle">{messages.loading}</p>
      ) : (data?.items.length ?? 0) === 0 ? (
        <p className="text-sm text-text-subtle">{messages.empty}</p>
      ) : (
        <ul className="space-y-3">
          {data!.items.map((comment) => (
            <li
              key={comment.id}
              className="flex items-start gap-3 border-t border-border-soft pt-3"
            >
              <UserAvatar
                src={comment.avatar}
                alt={comment.name ?? ""}
                className="h-8 w-8 shrink-0"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-text-strong">
                    {comment.name ?? comment.username ?? ""}
                  </span>

                  {(comment.userId === viewerId || viewerId === ownerId) && (
                    <button
                      type="button"
                      onClick={() => onRemove(comment.id)}
                      className="inline-flex items-center gap-1 text-xs text-text-subtle hover:text-destructive"
                      aria-label={messages.delete}
                    >
                      <Trash2 className="h-3 w-3" />

                      <>{messages.delete}</>
                    </button>
                  )}
                </div>

                <p className="mt-1 whitespace-pre-line break-words text-sm text-text-subtle">
                  {comment.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
