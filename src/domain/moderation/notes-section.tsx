import { useState } from "react";

import { Loader2, StickyNote } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { AdminPostNoteData } from "../../types/domain/moderation/admin-post-note-data.js";
import type { NoteReviewStatus } from "../../types/domain/moderation/note-review-status.js";
import type { NotesSectionProps } from "../../types/domain/moderation/notes-section-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";
import { Textarea } from "../../ui/textarea.js";

/** Fila de notas de rodapé: aprovar publica no post; negar exige motivo e pesa na credibilidade. */
export function NotesSection({ loading, notes, reviewing, onReview }: NotesSectionProps) {
  const messages = useMessages().notesSection;

  return (
    <section className="space-y-3">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-text-subtle">
          {messages.title}
        </h2>

        <p className="text-sm text-muted-foreground">{messages.description}</p>
      </div>

      {loading ? (
        <ListRowSkeletons />
      ) : notes.length === 0 ? (
        <div className="rounded-2xl border border-border-soft bg-surface-card p-6 text-center text-sm text-text-subtle">
          <StickyNote className="mx-auto mb-2 h-6 w-6 text-primary" />

          <>{messages.empty}</>
        </div>
      ) : (
        <ul className="space-y-3">
          {notes.map((note) => (
            <NoteRow
              key={note.id}
              note={note}
              pendingStatus={reviewing?.id === note.id ? reviewing.status : null}
              onReview={onReview}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function NoteRow({
  note,
  pendingStatus,
  onReview,
}: {
  note: AdminPostNoteData;
  pendingStatus: NoteReviewStatus | null;
  onReview: NotesSectionProps["onReview"];
}) {
  const messages = useMessages().notesSection;
  const [denying, setDenying] = useState(false);
  const [reason, setReason] = useState("");
  const pending = pendingStatus !== null;

  const review = async (status: NoteReviewStatus) => {
    const sent = await onReview(note, status, status === "DENIED" ? reason.trim() : undefined);
    if (sent) {
      setDenying(false);
      setReason("");
    }
  };

  return (
    <li className="space-y-3 rounded-2xl border border-border-soft bg-surface-card p-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-text-subtle">
        <span className="rounded-full bg-surface-2 px-2 py-0.5 font-medium text-text-strong">
          #{note.id.slice(-6)}
        </span>

        <span>{note.createdAtLabel}</span>

        <AppLink href={note.postHref} className="text-primary hover:underline">
          {messages.openPost}
        </AppLink>
      </div>

      <p className="break-words text-xs text-text-subtle">
        {note.authorUsername ? `@${note.authorUsername}` : (note.authorName ?? note.authorId)}
      </p>

      <p className="whitespace-pre-wrap break-words rounded-xl bg-surface-2 px-3 py-2 text-sm text-text-strong">
        {note.body}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          className="rounded-full"
          disabled={pending}
          onClick={() => void review("APPROVED")}
        >
          {pendingStatus === "APPROVED" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}

          <>{messages.approve}</>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="rounded-full"
          disabled={pending}
          onClick={() => setDenying((value) => !value)}
        >
          <>{denying ? messages.cancel : messages.reject}</>
        </Button>
      </div>

      {denying && (
        <div className="space-y-2 rounded-xl border border-border-soft bg-surface-1 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-text-subtle">
            {messages.reasonLabel}
          </p>

          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            rows={2}
            maxLength={500}
            placeholder={messages.reasonPlaceholder}
          />

          <Button
            size="sm"
            variant="destructive"
            className="rounded-full"
            disabled={pending || reason.trim().length < 5}
            onClick={() => void review("DENIED")}
          >
            {pendingStatus === "DENIED" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}

            <>{messages.confirmReject}</>
          </Button>
        </div>
      )}
    </li>
  );
}
