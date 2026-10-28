import { Fragment, useState } from "react";

import { safeHref } from "../../lib/safe-href.js";
import { useMessages } from "../../messages/messages-context.js";
import type { ProfileProjectsSectionProps } from "../../types/domain/profile/profile-projects-section-props.js";
import { Button } from "../../ui/button.js";

/** Um emblema de status do card de projeto. */
function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-normal text-text-subtle">
      {label}
    </span>
  );
}

/**
 * Seção "Projetos" do perfil, abaixo da bio: os cards do autor — estruturados
 * (título, status, stack, repositório e o diário de evolução) ou, quando o autor
 * preferiu, o HTML próprio dentro do quadro isolado. O dono gerencia por aqui.
 */
export function ProfileProjectsSection({
  projects,
  isOwner,
  onManage,
  onImport,
  renderHtmlFrame,
  manager,
}: ProfileProjectsSectionProps) {
  const messages = useMessages().profileProjectsSection;
  const [diarioAberto, setDiarioAberto] = useState<string | null>(null);

  return (
    <section className="border border-border-soft bg-surface-card">
      <div className="flex items-center justify-between px-4 pb-3 pt-4 sm:px-6 sm:pt-6">
        <h2 className="text-base font-normal text-text-strong">{messages.title}</h2>

        {isOwner && (
          <div className="flex flex-wrap gap-2">
            {onImport && (
              <Button variant="outline" size="sm" className="rounded-full" onClick={onImport}>
                {messages.importFromGithub}
              </Button>
            )}

            <Button variant="outline" size="sm" className="rounded-full" onClick={onManage}>
              {messages.manage}
            </Button>
          </div>
        )}
      </div>

      {projects.length === 0 ? (
        <p className="px-4 pb-5 text-sm font-normal text-text-subtle sm:px-6">{messages.empty}</p>
      ) : (
        <div className="space-y-4 px-4 pb-5 sm:px-6">
          {projects.map((project) =>
            project.html ? (
              <Fragment key={project.id}>
                {renderHtmlFrame({
                  html: project.html,
                  title: messages.htmlFrame,
                  className: "w-full rounded-lg border border-border-soft",
                  innerPadding: false,
                  // O card HTML respeita o tamanho do conteúdo (como o card estruturado), com teto
                  // para um HTML patológico não empurrar o perfil indefinidamente.
                  maxHeight: 1200,
                })}
              </Fragment>
            ) : (
              <article key={project.id} className="rounded-xl border border-border-soft p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-medium text-text-strong">{project.title}</h3>

                  {project.status && <Chip label={project.status} />}
                </div>

                {project.description && (
                  <p className="mt-2 text-sm leading-relaxed text-text-subtle">
                    {project.description}
                  </p>
                )}

                {project.stack.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-normal text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.repoUrl && (
                  <a
                    href={safeHref(project.repoUrl) ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-normal text-primary hover:underline"
                  >
                    {messages.repo}
                    <span aria-hidden>↗</span>
                  </a>
                )}

                {project.diary.length > 0 && (
                  <div className="mt-3 border-t border-border-soft pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        setDiarioAberto(diarioAberto === project.id ? null : project.id)
                      }
                      className="text-xs font-normal text-primary hover:underline"
                    >
                      {messages.diary} ({project.diary.length})
                    </button>

                    {(diarioAberto === project.id
                      ? [...project.diary].reverse()
                      : [...project.diary].reverse().slice(0, 2)
                    ).map((entry, index) => (
                      <div key={index} className="mt-2 text-sm">
                        <p className="text-xs font-normal text-text-date">{entry.date}</p>

                        <p className="whitespace-pre-wrap break-words font-normal text-text-subtle">
                          {entry.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ),
          )}
        </div>
      )}

      {isOwner && manager}
    </section>
  );
}
