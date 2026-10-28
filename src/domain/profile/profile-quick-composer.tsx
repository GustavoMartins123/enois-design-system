import { useState } from "react";

import { FilePenLine, Image, Send, Video } from "lucide-react";

import { useAdapters } from "../../adapters/adapters-context.js";
import { useMessages } from "../../messages/messages-context.js";
import type { ProfileQuickComposerProps } from "../../types/domain/profile/profile-quick-composer-props.js";
import { Button } from "../../ui/button.js";
import { Textarea } from "../../ui/textarea.js";
import { UserAvatar } from "../avatar/user-avatar.js";

export function ProfileQuickComposer({
  profile,
  publishPending = false,
  onPublish,
}: ProfileQuickComposerProps) {
  const messages = useMessages().profileQuickComposer;
  const { resolveMediaUrl } = useAdapters();
  const [content, setContent] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  const publish = async () => {
    if (await onPublish(content.trim())) setContent("");
  };

  return (
    <section className="rounded-2xl border border-primary/20 bg-surface-card p-4 shadow-[0_20px_60px_-44px_color-mix(in_oklab,var(--primary)_95%,transparent)] sm:p-5">
      {!isComposerOpen ? (
        <>
          <div className="flex items-center gap-3">
            <UserAvatar
              frame={profile.avatarFrame}
              src={resolveMediaUrl(profile.avatar)}
              alt={profile.name}
              className="h-10 w-10 shrink-0"
            />

            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="flex h-11 flex-1 items-center rounded-full border border-border-soft bg-surface-1 px-5 text-left text-sm font-medium text-text-subtle transition hover:border-primary/40 hover:bg-surface-2 hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {messages.start}
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 divide-x divide-border-soft border-t border-border-soft pt-3">
            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-subtle transition hover:bg-surface-2 hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Video className="h-4 w-4 text-primary" />
              {messages.video}
            </button>

            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-subtle transition hover:bg-surface-2 hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Image className="h-4 w-4 text-primary" />
              {messages.photo}
            </button>

            <button
              type="button"
              onClick={() => setIsComposerOpen(true)}
              className="flex items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-subtle transition hover:bg-surface-2 hover:text-text-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <FilePenLine className="h-4 w-4 text-primary" />
              {messages.article}
            </button>
          </div>
        </>
      ) : (
        <>
          <Textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={messages.placeholder}
            rows={3}
            maxLength={1000}
            autoFocus
            className="min-h-[7rem] resize-none border-border-soft bg-surface-1 text-sm leading-relaxed shadow-inner"
          />

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border-soft pt-3">
            <p className="text-xs text-text-subtle">{messages.hint}</p>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="rounded-full"
                onClick={() => {
                  setContent("");
                  setIsComposerOpen(false);
                }}
              >
                {messages.cancel}
              </Button>

              <Button
                size="sm"
                className="shrink-0 gap-1.5 rounded-full"
                onClick={() => void publish()}
                disabled={!content.trim() || publishPending}
              >
                <Send className="h-3.5 w-3.5" />

                <>{publishPending ? messages.sending : messages.action}</>
              </Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
