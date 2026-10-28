import { useState } from "react";

import { FolderKanban, Globe } from "lucide-react";

import { safeHref } from "../../lib/safe-href.js";
import { useMessages } from "../../messages/messages-context.js";
import { ListRowSkeletons } from "../../patterns/skeletons/list-row-skeletons.js";
import type { ProjectsReviewSectionProps } from "../../types/domain/moderation/projects-review-section-props.js";
import { Button } from "../../ui/button.js";
import { EmptyState } from "../../ui/empty-state.js";
import { Input } from "../../ui/input.js";

/** Fila de projetos enviados pela comunidade: mesma revisão dos jogos, em espaço próprio. */
export function ProjectsReviewSection({
  loading,
  error,
  projects: items,
  approvePending,
  rejectPending,
  onApprove,
  onReject,
}: ProjectsReviewSectionProps) {
  const messages = useMessages().projectsReviewSection;
  const [notes, setNotes] = useState<Record<string, string>>({});

  if (loading) return <ListRowSkeletons />;
  if (error) return <p className="text-sm text-destructive">{messages.error}</p>;

  return (
    <section className="space-y-4">
      <div className="surface-card space-y-1 p-4">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <FolderKanban className="h-5 w-5 text-primary" />

          <>{messages.title}</>
        </h2>

        <p className="text-sm text-text-subtle">{messages.description}</p>
      </div>

      {items.length === 0 ? (
        <div className="surface-card">
          <EmptyState icon={FolderKanban} title={messages.empty} />
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((project) => (
            <li key={project.id} className="surface-card space-y-3 p-4">
              <div className="space-y-1">
                <h3 className="font-semibold text-text-strong">{project.title}</h3>

                <p className="break-words text-xs text-text-subtle">
                  @{project.username} · {project.category ?? messages.noCategory}
                </p>

                {project.shortDescription && (
                  <p className="text-sm text-text-subtle">{project.shortDescription}</p>
                )}

                <div className="flex flex-wrap gap-3 pt-1 text-xs">
                  {project.url && (
                    <a
                      href={safeHref(project.url) ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" />

                      <>{messages.openProject}</>
                    </a>
                  )}

                  {project.repoUrl && (
                    <a
                      href={safeHref(project.repoUrl) ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {messages.openRepo}
                    </a>
                  )}
                </div>
              </div>

              <Input
                value={notes[project.id] ?? ""}
                onChange={(event) =>
                  setNotes((current) => ({ ...current, [project.id]: event.target.value }))
                }
                placeholder={messages.notePlaceholder}
                maxLength={500}
              />

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="w-auto rounded-full"
                  disabled={approvePending}
                  onClick={() => onApprove(project.id, notes[project.id])}
                >
                  {messages.approve}
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-auto rounded-full"
                  disabled={rejectPending || (notes[project.id] ?? "").trim().length < 3}
                  onClick={() => onReject(project.id, notes[project.id])}
                >
                  {messages.reject}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
