import { Archive, Download, GitFork, Loader2, Star } from "lucide-react";

import { safeHref } from "../../lib/safe-href.js";
import { useMessages } from "../../messages/messages-context.js";
import type { GithubImportDialogProps } from "../../types/domain/profile/github-import-dialog-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Button } from "../../ui/button.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog.js";
import { GithubIcon } from "../../ui/github-icon.js";

/**
 * Importação do GitHub para o perfil: os repositórios públicos viram cards de projeto (com o
 * link apontando para o repositório) e o README do perfil vira a bio em HTML. A seleção é do app,
 * que a limpa depois de importar.
 */
export function GithubImportDialog({
  open,
  onOpenChange,
  notLinked,
  securityHref,
  repos,
  selected,
  onToggle,
  onSelectAll,
  onClear,
  importing,
  onImport,
  readme,
  usingReadme,
  onUseReadme,
  renderHtmlFrame,
}: GithubImportDialogProps) {
  const messages = useMessages().githubImportDialog;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GithubIcon className="h-5 w-5" />
            {messages.title}
          </DialogTitle>
        </DialogHeader>

        <p className="text-xs font-normal leading-relaxed text-text-subtle">
          {messages.description}
        </p>

        {notLinked ? (
          <p className="rounded-xl border border-border-soft bg-surface-1 px-4 py-3 text-sm text-text-subtle">
            {messages.notLinked}{" "}
            <AppLink href={securityHref} className="font-medium text-primary hover:underline">
              {messages.goToSecurity}
            </AppLink>
          </p>
        ) : (
          <>
            <section className="space-y-3 border-t border-border-soft pt-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-text-strong">{messages.reposTitle}</h3>

                <p className="text-xs text-text-subtle">{messages.reposHint}</p>
              </div>

              {repos.loading ? (
                <p className="flex items-center gap-2 text-sm text-text-subtle">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {messages.loading}
                </p>
              ) : repos.error ? (
                <p className="text-sm text-destructive">{messages.error}</p>
              ) : repos.rows.length === 0 ? (
                <p className="text-sm text-text-subtle">{messages.empty}</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={onSelectAll}
                    >
                      {messages.selectAll}
                    </Button>

                    <Button size="sm" variant="ghost" className="rounded-full" onClick={onClear}>
                      {messages.clear}
                    </Button>
                  </div>

                  <ul className="space-y-2">
                    {repos.rows.map((repo) => {
                      const checked = selected.includes(repo.fullName);

                      return (
                        <li key={repo.fullName}>
                          <label
                            className={
                              checked
                                ? "flex cursor-pointer items-start gap-3 rounded-xl border border-primary bg-primary-soft/40 p-3"
                                : "flex cursor-pointer items-start gap-3 rounded-xl border border-border-soft p-3 hover:border-primary/50"
                            }
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => onToggle(repo.fullName)}
                              className="mt-1 h-4 w-4 shrink-0 rounded border-input accent-primary"
                            />

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-sm font-medium text-text-strong">{repo.name}</p>

                                {repo.fork && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-text-subtle">
                                    <GitFork className="h-3 w-3" aria-hidden />
                                    {messages.fork}
                                  </span>
                                )}

                                {repo.archived && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-text-subtle">
                                    <Archive className="h-3 w-3" aria-hidden />
                                    {messages.archived}
                                  </span>
                                )}
                              </div>

                              {repo.description && (
                                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                                  {repo.description}
                                </p>
                              )}

                              <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-text-subtle">
                                {repo.language && <span>{repo.language}</span>}

                                <span className="inline-flex items-center gap-1">
                                  <Star className="h-3 w-3" aria-hidden />
                                  {repo.stars}
                                </span>

                                <span className="inline-flex items-center gap-1">
                                  <GitFork className="h-3 w-3" aria-hidden />
                                  {repo.forks}
                                </span>

                                {repo.updatedAtLabel && <span>{repo.updatedAtLabel}</span>}

                                <a
                                  href={safeHref(repo.url) ?? undefined}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline"
                                >
                                  {messages.open}
                                </a>
                              </p>
                            </div>
                          </label>
                        </li>
                      );
                    })}
                  </ul>

                  <Button
                    className="rounded-full gap-1.5"
                    disabled={selected.length === 0 || importing}
                    onClick={onImport}
                  >
                    {importing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {messages.importing}
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        {messages.import(selected.length)}
                      </>
                    )}
                  </Button>
                </>
              )}
            </section>

            <section className="space-y-3 border-t border-border-soft pt-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-text-strong">{messages.readmeTitle}</h3>

                <p className="text-xs text-text-subtle">{messages.readmeHint}</p>
              </div>

              {readme.loading ? (
                <p className="flex items-center gap-2 text-sm text-text-subtle">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {messages.loading}
                </p>
              ) : readme.missing ? (
                <p className="text-sm text-text-subtle">{messages.readmeMissing}</p>
              ) : readme.data ? (
                <>
                  {renderHtmlFrame({
                    html: readme.data.html,
                    title: messages.readmeTitle,
                    className: "w-full rounded-xl border border-border-soft",
                    maxHeight: 420,
                  })}

                  <div className="flex flex-wrap items-center gap-3">
                    <Button
                      className="rounded-full gap-1.5"
                      disabled={usingReadme}
                      onClick={onUseReadme}
                    >
                      {usingReadme ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {messages.readmeUsing}
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          {messages.readmeUse}
                        </>
                      )}
                    </Button>

                    <a
                      href={safeHref(readme.data.repoUrl) ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline"
                    >
                      {messages.openReadme}
                    </a>
                  </div>
                </>
              ) : (
                readme.error && <p className="text-sm text-destructive">{messages.readmeError}</p>
              )}
            </section>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
