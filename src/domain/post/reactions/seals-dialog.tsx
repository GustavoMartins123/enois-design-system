import { cn } from "../../../lib/utils.js";
import { useMessages } from "../../../messages/messages-context.js";
import type { SealsDialogProps } from "../../../types/domain/post/seals-dialog-props.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog.js";
import { UserAvatar } from "../../avatar/user-avatar.js";
import { POST_SEALS, postSeal } from "../post-seals.js";

/**
 * Quem marcou o post, com o selo de cada um — o mesmo caminho do diálogo de quem reagiu.
 *
 * A lista vem uma linha por selo (quem marcou com dois aparece duas vezes) e é agrupada por pessoa
 * aqui: na tela, o que interessa é "fulano marcou importante e dica". O topo repete as contagens,
 * que é a resposta para "quantos selos o post tem".
 */
export function SealsDialog({
  open,
  onOpenChange,
  people,
  summary,
  users,
  isLoading,
  isError,
}: SealsDialogProps) {
  const messages = useMessages().sealsDialog;
  const sealLabels = useMessages().postSeals;

  // Agrupa por pessoa, na ordem em que cada uma apareceu.
  const grouped: { userId: string; seals: string[] }[] = [];
  for (const person of people) {
    const found = grouped.find((entry) => entry.userId === person.userId);
    if (found) found.seals.push(person.seal);
    else grouped.push({ userId: person.userId, seals: [person.seal] });
  }

  const total = summary.reduce((sum, item) => sum + item.count, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>
        </DialogHeader>

        {people.length === 0 ? (
          <p className="py-8 text-center text-sm font-normal text-text-subtle">
            {isError ? messages.error : isLoading ? messages.loading : messages.empty}
          </p>
        ) : (
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border-soft pb-3">
              {summary.map((item) => {
                const seal = postSeal(item.seal);
                if (!seal) return null;
                return (
                  <span
                    key={item.seal}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                      seal.className,
                    )}
                  >
                    <seal.icon className="h-3 w-3" aria-hidden />

                    <>{sealLabels[seal.labelKey]}</>

                    <span className="tabular-nums opacity-70">{item.count}</span>
                  </span>
                );
              })}

              <span className="ml-auto text-xs font-normal text-text-subtle">
                {messages.total(total)}
              </span>
            </div>

            {grouped.map((entry) => {
              const user = users?.[entry.userId];
              const avatar = user?.avatar ?? undefined;
              return (
                <div
                  key={entry.userId}
                  className="flex items-center gap-3 rounded-xl bg-surface-1 p-3"
                >
                  <UserAvatar
                    frame={user?.avatarFrame}
                    src={avatar}
                    alt={user?.name}
                    className="h-9 w-9 shrink-0"
                  />

                  <p className="min-w-0 flex-1 truncate text-sm font-normal text-text-strong">
                    {user?.name ?? messages.loading}
                  </p>

                  <div className="flex flex-wrap justify-end gap-1">
                    {entry.seals.map((id) => {
                      const seal = POST_SEALS.find((item) => item.id === id);
                      if (!seal) return null;
                      const label = sealLabels[seal.labelKey];
                      return (
                        <span
                          key={id}
                          title={label}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
                            seal.className,
                          )}
                        >
                          <seal.icon className="h-3 w-3" aria-hidden />

                          <>{label}</>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
