import { useState } from "react";

import { ImagePlus } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { CompanyEditDialogProps } from "../../types/domain/jobs/company-edit-dialog-props.js";
import type { CompanyImageKind } from "../../types/domain/jobs/company-image-kind.js";
import { Button } from "../../ui/button.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";
import { Input } from "../../ui/input.js";
import { Textarea } from "../../ui/textarea.js";

/**
 * Os tetos dos campos: sao os MESMOS numeros que a coluna do banco aceita e que a API recusa
 * (a API devolve 400 dizendo o campo e o limite quando passa). Sem eles no campo, a pessoa podia
 * digitar mais e tomava 409 "conflita com o estado atual dos dados".
 */
const LIMITES_CAMPO = {
  name: 160,
  sector: 80,
  size: 40,
  location: 160,
  website: 300,
} as const;

/**
 * O painel de edição da página empresarial: os campos do cadastro + logo/capa (upload pela
 * mídia do app) e a equipe (membros com papel, para OWNER/ADMIN, num slot do app).
 */
export function CompanyEditDialog({
  company,
  open,
  onOpenChange,
  savePending,
  uploading,
  onSave,
  onUploadImage,
  teamSection,
}: CompanyEditDialogProps) {
  const messages = useMessages().companyEditDialog;

  const [form, setForm] = useState({
    name: company.name ?? "",
    description: company.description ?? "",
    sector: company.sector ?? "",
    size: company.size ?? "",
    location: company.location ?? "",
    website: company.website ?? "",
    logo: company.logo ?? "",
    cover: company.cover ?? "",
  });

  const enviarImagem = async (file: File, campo: CompanyImageKind) => {
    const uploaded = await onUploadImage(campo, file);
    if (uploaded === null) return;
    setForm((atual) => ({ ...atual, [campo]: uploaded }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <label className="block space-y-1 text-sm">
            <span className="text-xs text-text-subtle">{messages.nameLabel}</span>

            {/* O limite e o mesmo da coluna (`companies.name varchar(160)`) e da API: sem ele a
                pessoa podia digitar mais e tomar 409 "conflita com o estado atual dos dados". */}
            <Input
              value={form.name}
              maxLength={LIMITES_CAMPO.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            {(["logo", "cover"] as const).map((campo) => (
              <div key={campo} className="flex flex-col items-center gap-1">
                <label className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-soft p-3 text-xs text-text-subtle transition hover:border-primary hover:text-primary">
                  {form[campo] ? (
                    <img
                      src={form[campo]}
                      alt=""
                      className={
                        campo === "logo"
                          ? "h-16 w-16 rounded-xl object-cover"
                          : "h-16 w-full rounded-lg object-cover"
                      }
                    />
                  ) : (
                    <ImagePlus className="h-5 w-5" />
                  )}
                  <span>{campo === "logo" ? messages.logo : messages.cover}</span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void enviarImagem(file, campo);
                      e.target.value = "";
                    }}
                  />
                  {form[campo] && (
                    <button
                      type="button"
                      aria-label={campo === "logo" ? messages.removeLogo : messages.removeCover}
                      className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-destructive/90 text-white transition hover:bg-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setForm((atual) => ({ ...atual, [campo]: "" }));
                      }}
                    >
                      ×
                    </button>
                  )}
                </label>
              </div>
            ))}
          </div>

          <label className="block space-y-1 text-sm">
            <span className="text-xs text-text-subtle">{messages.descriptionLabel}</span>

            <Textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              maxLength={4000}
            />
          </label>

          <div className="grid gap-2 sm:grid-cols-2">
            {(
              [
                ["sector", messages.sector],
                ["size", messages.size],
                ["location", messages.location],
                ["website", messages.website],
              ] as const
            ).map(([campo, label]) => (
              <label key={campo} className="block space-y-1 text-sm">
                <span className="text-xs text-text-subtle">{label}</span>

                <Input
                  value={form[campo]}
                  maxLength={LIMITES_CAMPO[campo]}
                  onChange={(e) => setForm({ ...form, [campo]: e.target.value })}
                />
              </label>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>
              {messages.cancel}
            </Button>

            <Button
              className="rounded-full"
              disabled={savePending || uploading}
              onClick={() => onSave(form)}
            >
              {savePending ? messages.saving : messages.save}
            </Button>
          </div>

          {teamSection}
        </div>
      </DialogContent>
    </Dialog>
  );
}
