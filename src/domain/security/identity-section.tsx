import { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

import { useAdapters } from "../../adapters/adapters-context.js";
import { useMessages } from "../../messages/messages-context.js";
import type { IdentitySectionProps } from "../../types/domain/security/identity-section-props.js";
import { Button } from "../../ui/button.js";
import { Input } from "../../ui/input.js";
import { Label } from "../../ui/label.js";
import { MAX_BADGES } from "../badges/max-badges.js";

/**
 * Nome e identidade: nome social (substitui o de cadastro para todo mundo), apelido
 * (entra entre parênteses depois do nome), pronomes (só no perfil) e até 5 emblemas
 * (o primeiro acompanha o nome por todo o app; todos aparecem no perfil). O nome de
 * cadastro continua existindo para o dono da conta e para a empresa que recebe a
 * candidatura — que vê os dois nomes, um abaixo do outro.
 */
export function IdentitySection({
  identity,
  onSave,
  savePending = false,
  badges,
  onAddBadge,
  onRemoveBadge,
  badgesPending = false,
  uploading = false,
}: IdentitySectionProps) {
  const messages = useMessages().identitySection;
  const { resolveMediaUrl } = useAdapters();
  const badgeInputRef = useRef<HTMLInputElement>(null);

  const [socialName, setSocialName] = useState("");
  const [nickname, setNickname] = useState("");
  const [pronouns, setPronouns] = useState("");

  useEffect(() => {
    if (!identity) return;
    setSocialName(identity.socialName ?? "");
    setNickname(identity.nickname ?? "");
    setPronouns(identity.pronouns ?? "");
  }, [identity]);

  return (
    <section className="surface-card space-y-3 p-4">
      <div>
        <h2 className="text-base font-medium">{messages.title}</h2>

        <p className="mt-0.5 text-sm text-muted-foreground">{messages.hint}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">{messages.socialName}</Label>

          <Input
            value={socialName}
            onChange={(event) => setSocialName(event.target.value)}
            maxLength={160}
            placeholder={messages.placeholderOptional}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">{messages.nickname}</Label>

          <Input
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            maxLength={60}
            placeholder={messages.placeholderOptional}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">{messages.pronouns}</Label>

          <Input
            value={pronouns}
            onChange={(event) => setPronouns(event.target.value)}
            maxLength={60}
            placeholder={messages.pronounsPlaceholder}
          />
        </div>
      </div>

      <Button
        variant="outline"
        className="rounded-full"
        disabled={savePending}
        onClick={() => onSave({ socialName, nickname, pronouns })}
      >
        {messages.save}
      </Button>

      {/* Emblemas: até 5 PNGs pequenos. O primeiro acompanha o nome em todo o app. */}
      <div className="space-y-2 border-t border-border-soft pt-3">
        <p className="text-xs font-medium text-text-strong">{messages.badgesTitle}</p>

        <p className="text-xs font-normal text-text-subtle">{messages.badgesHint}</p>

        {badges.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1 rounded-full bg-surface-2 py-1 pl-1 pr-2"
              >
                <img
                  src={resolveMediaUrl(badge)}
                  alt=""
                  className="h-6 w-6 rounded-full object-cover"
                />

                <button
                  type="button"
                  aria-label={`${messages.badgesRemove} ${badges.indexOf(badge) + 1}`}
                  title={`${messages.badgesRemove} ${badges.indexOf(badge) + 1}`}
                  disabled={badgesPending}
                  onClick={() => onRemoveBadge(badge)}
                  className="text-muted-foreground transition hover:text-destructive disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}

        {badges.length < MAX_BADGES && (
          <>
            <input
              ref={badgeInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) onAddBadge(file);
                event.target.value = "";
              }}
            />

            <Button
              variant="outline"
              className="rounded-full"
              disabled={uploading || badgesPending}
              onClick={() => badgeInputRef.current?.click()}
            >
              {uploading ? messages.sending : messages.badgesAdd}
            </Button>
          </>
        )}

        {badges.length >= MAX_BADGES && (
          <p className="text-xs font-normal text-text-date">{messages.badgesFull}</p>
        )}
      </div>
    </section>
  );
}
