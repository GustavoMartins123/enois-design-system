import { useMessages } from "../../messages/messages-context.js";
import type { ProfileNetworkDialogProps } from "../../types/domain/profile/profile-network-dialog-props.js";
import { AppLink } from "../../ui/app-link.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog.js";
import { UserAvatar } from "../avatar/user-avatar.js";
import { StyledName } from "../name/styled-name.js";

export function ProfileNetworkDialog({
  name,
  kind,
  open,
  onOpenChange,
  people,
  pending,
  error,
}: ProfileNetworkDialogProps) {
  const messages = useMessages().profileNetworkDialog;

  const title =
    kind === "connections" ? messages.connectionsTitle(name) : messages.followersTitle(name);
  const emptyMessage = kind === "connections" ? messages.emptyConnections : messages.emptyFollowers;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-normal">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          {pending && (
            <p className="py-6 text-center text-sm text-text-subtle">{messages.loading}</p>
          )}

          {error && <p className="py-6 text-center text-sm text-text-subtle">{messages.error}</p>}

          {!pending && !error && people?.length === 0 && (
            <p className="py-6 text-center text-sm text-text-subtle">{emptyMessage}</p>
          )}

          {!pending &&
            !error &&
            people?.map((person) => (
              <AppLink
                key={person.id}
                href={person.href}
                onClick={() => onOpenChange(false)}
                className="flex items-center gap-3 rounded-xl border border-border-soft bg-surface-1 px-3 py-3 transition hover:border-primary/40 hover:bg-primary/5"
              >
                <UserAvatar
                  src={person.avatar}
                  alt={person.name}
                  frame={person.avatarFrame}
                  className="h-10 w-10 shrink-0"
                />

                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-text-strong">
                    <StyledName name={person.name} style={person.nameStyle} />
                  </span>

                  <span className="block truncate text-xs text-text-subtle">
                    @{person.username}
                    {person.headline ? ` · ${person.headline}` : ""}
                  </span>
                </span>
              </AppLink>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
