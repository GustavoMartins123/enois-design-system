import { useEffect, useState } from "react";

import { ImagePlus, Trash2, X } from "lucide-react";

import { useAdapters } from "../../adapters/adapters-context.js";
import { useMessages } from "../../messages/messages-context.js";
import type { GameEditorDialogProps } from "../../types/domain/games/game-editor-dialog-props.js";
import type { GameImageKind } from "../../types/domain/games/game-image-kind.js";
import { Button } from "../../ui/button.js";
import { ConfirmDialog } from "../../ui/confirm-dialog.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog.js";
import { Input } from "../../ui/input.js";
import { Label } from "../../ui/label.js";
import { Textarea } from "../../ui/textarea.js";

/**
 * A loja do lado do CRIADOR: editar a ficha, escolher o endereço do jogo, subir ícone e banner
 * (foto ou HTML) e tirar o jogo da loja.
 *
 * O diálogo recebe o jogo já carregado e SÓ grava no PATCH: a edição não passa pela moderação de
 * novo (corrigir a ficha não é publicar outro jogo) — jogo recusado volta para a fila pelo
 * "reenviar", que é outra ação.
 */
export function GameEditorDialog({
  game,
  open,
  onOpenChange,
  savePending = false,
  onSave,
  onUploadImage,
  deleteConfirmOpen,
  onDeleteConfirmOpenChange,
  deletePending = false,
  onDelete,
}: GameEditorDialogProps) {
  const messages = useMessages().gameEditorDialog;
  const { resolveMediaUrl } = useAdapters();

  const [title, setTitle] = useState(game.title);
  const [slug, setSlug] = useState(game.slug);
  const [url, setUrl] = useState(game.url);
  const [tags, setTags] = useState(game.tags ?? "");
  const [shortDescription, setShortDescription] = useState(game.shortDescription ?? "");
  const [description, setDescription] = useState(game.description ?? "");
  const [genres, setGenres] = useState(game.genres.join(", "));
  const [languages, setLanguages] = useState(game.languages.join(", "));
  const [controls, setControls] = useState(game.controls ?? "");
  const [requirements, setRequirements] = useState(game.requirements ?? "");
  const [contentWarnings, setContentWarnings] = useState(game.contentWarnings ?? "");
  const [stage, setStage] = useState<string>(game.stage);
  const [distribution, setDistribution] = useState<string>(game.distribution);
  const [priceCoins, setPriceCoins] = useState(String(game.priceCoins ?? 0));
  const [aspect, setAspect] = useState<string>(game.aspect);
  const [version, setVersion] = useState(game.version ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(game.websiteUrl ?? "");
  const [supportUrl, setSupportUrl] = useState(game.supportUrl ?? "");
  const [icon, setIcon] = useState<string | null>(game.icon ?? null);
  const [banner, setBanner] = useState<string | null>(game.banner ?? null);
  const [bannerHtml, setBannerHtml] = useState(game.bannerHtml ?? "");
  const [uploading, setUploading] = useState<GameImageKind | null>(null);

  // O diálogo é reaproveitado entre jogos: abrir com outro jogo precisa re-semear os campos.
  useEffect(() => {
    if (!open) return;
    setTitle(game.title);
    setSlug(game.slug);
    setUrl(game.url);
    setTags(game.tags ?? "");
    setShortDescription(game.shortDescription ?? "");
    setDescription(game.description ?? "");
    setGenres(game.genres.join(", "));
    setLanguages(game.languages.join(", "));
    setControls(game.controls ?? "");
    setRequirements(game.requirements ?? "");
    setContentWarnings(game.contentWarnings ?? "");
    setStage(game.stage);
    setDistribution(game.distribution);
    setPriceCoins(String(game.priceCoins ?? 0));
    setAspect(game.aspect);
    setVersion(game.version ?? "");
    setWebsiteUrl(game.websiteUrl ?? "");
    setSupportUrl(game.supportUrl ?? "");
    setIcon(game.icon ?? null);
    setBanner(game.banner ?? null);
    setBannerHtml(game.bannerHtml ?? "");
  }, [open, game]);

  async function uploadImage(kind: GameImageKind, file: File | null | undefined) {
    if (!file) return;
    setUploading(kind);
    try {
      const uploaded = await onUploadImage(kind, file);
      if (uploaded === null) return;
      if (kind === "icon") setIcon(uploaded);
      else setBanner(uploaded);
    } finally {
      setUploading(null);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-normal">{messages.title}</DialogTitle>

            <DialogDescription>{messages.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 pt-1">
            {/* Identidade */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-text-strong">{messages.identityTitle}</h3>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">{messages.icon}</Label>

                <div className="flex flex-wrap items-center gap-2">
                  {icon ? (
                    <span className="relative">
                      <img
                        src={resolveMediaUrl(icon)}
                        alt=""
                        className="h-12 w-12 rounded-xl object-cover"
                      />

                      <button
                        type="button"
                        aria-label={messages.removeIcon}
                        title={messages.removeIcon}
                        onClick={() => setIcon(null)}
                        className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-destructive text-destructive-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ) : (
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary-text">
                      <ImagePlus className="h-5 w-5" />
                    </span>
                  )}

                  <label className="inline-flex h-9 cursor-pointer items-center rounded-full border border-border-soft px-3 text-sm font-medium transition hover:bg-muted">
                    {uploading === "icon" ? messages.loading : messages.uploadImage}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = "";
                        void uploadImage("icon", file);
                      }}
                    />
                  </label>

                  <p className="text-xs text-text-subtle">{messages.iconHint}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">{messages.banner}</Label>

                <div className="space-y-2">
                  {banner ? (
                    <span className="relative block">
                      <img
                        src={resolveMediaUrl(banner)}
                        alt=""
                        className="h-24 w-full rounded-xl object-cover"
                      />

                      <button
                        type="button"
                        aria-label={messages.removeBanner}
                        title={messages.removeBanner}
                        onClick={() => setBanner(null)}
                        className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-destructive text-destructive-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-2">
                    <label className="inline-flex h-9 cursor-pointer items-center rounded-full border border-border-soft px-3 text-sm font-medium transition hover:bg-muted">
                      {uploading === "banner" ? messages.loading : messages.uploadPhoto}

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          event.target.value = "";
                          void uploadImage("banner", file);
                        }}
                      />
                    </label>

                    <p className="text-xs text-text-subtle">{messages.bannerHint}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">
                  {messages.bannerHtml}
                </Label>

                <Textarea
                  value={bannerHtml}
                  onChange={(event) => setBannerHtml(event.target.value)}
                  rows={3}
                  className="bg-muted font-mono text-xs"
                  placeholder={'<div style="background:linear-gradient(...)">…</div>'}
                />

                <p className="text-xs text-text-subtle">{messages.bannerHtmlHint}</p>
              </div>
            </section>

            {/* Endereço */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-text-strong">{messages.addressTitle}</h3>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-text-subtle">
                    {messages.titleField}
                  </Label>

                  <Input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    maxLength={200}
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-text-subtle">{messages.slug}</Label>

                  <Input
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    maxLength={120}
                    className="bg-muted"
                  />

                  <p className="break-all text-xs text-text-subtle">
                    /games/{game.username ?? "@"}/{slug.trim() || game.slug}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">{messages.url}</Label>

                <Input
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  className="bg-muted"
                />
              </div>
            </section>

            {/* Ficha */}
            <section className="space-y-3">
              <h3 className="text-sm font-medium text-text-strong">{messages.fichaTitle}</h3>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">
                  {messages.shortDescription}
                </Label>

                <Input
                  value={shortDescription}
                  onChange={(event) => setShortDescription(event.target.value)}
                  maxLength={300}
                  className="bg-muted"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">
                  {messages.descriptionField}
                </Label>

                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={3}
                  className="bg-muted"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label={messages.genres} value={genres} onChange={setGenres} />
                <Field label={messages.languages} value={languages} onChange={setLanguages} />
                <Field label={messages.controls} value={controls} onChange={setControls} />
                <Field
                  label={messages.requirements}
                  value={requirements}
                  onChange={setRequirements}
                />
                <Field
                  label={messages.warnings}
                  value={contentWarnings}
                  onChange={setContentWarnings}
                />
                <Field label={messages.tags} value={tags} onChange={setTags} />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SelectField
                  label={messages.stage}
                  value={stage}
                  onChange={setStage}
                  options={messages.stages}
                />
                <SelectField
                  label={messages.aspect}
                  value={aspect}
                  onChange={setAspect}
                  options={messages.aspects}
                />
                <SelectField
                  label={messages.distribution}
                  value={distribution}
                  onChange={setDistribution}
                  options={[
                    ["FREE", messages.free],
                    ["PAID", messages.paid],
                  ]}
                />

                <div className="space-y-1.5">
                  <Label className="text-xs font-normal text-text-subtle">{messages.price}</Label>

                  <Input
                    type="number"
                    min={0}
                    value={priceCoins}
                    onChange={(event) => setPriceCoins(event.target.value)}
                    className="bg-muted"
                  />
                </div>

                <Field label={messages.version} value={version} onChange={setVersion} />
                <Field label={messages.websiteUrl} value={websiteUrl} onChange={setWebsiteUrl} />
                <Field label={messages.supportUrl} value={supportUrl} onChange={setSupportUrl} />
              </div>
            </section>

            <Button
              className="w-full rounded-full"
              disabled={title.trim().length < 3 || url.trim() === "" || savePending}
              onClick={() =>
                onSave({
                  title,
                  slug,
                  url,
                  tags,
                  shortDescription,
                  description,
                  genres,
                  languages,
                  controls,
                  requirements,
                  contentWarnings,
                  stage,
                  distribution,
                  priceCoins,
                  aspect,
                  version,
                  websiteUrl,
                  supportUrl,
                  icon,
                  banner,
                  bannerHtml,
                })
              }
            >
              {savePending ? messages.saving : messages.save}
            </Button>

            {game.status !== "SUBMITTED" && (
              <Button
                variant="outline"
                className="w-full rounded-full gap-1.5 text-destructive"
                onClick={() => onDeleteConfirmOpenChange(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />

                <>{messages.delete}</>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Fora do diálogo de edição: um diálogo dentro do outro disputa o foco. */}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={onDeleteConfirmOpenChange}
        title={messages.deleteTitle}
        description={messages.deleteConfirm}
        confirmLabel={messages.delete}
        destructive
        pending={deletePending}
        onConfirm={onDelete}
      />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-normal text-text-subtle">{label}</Label>

      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="bg-muted"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly (readonly [string, string])[];
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-normal text-text-subtle">{label}</Label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex h-9 w-full rounded-md border border-transparent bg-muted px-3 py-2 text-sm font-normal text-text-strong outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </div>
  );
}
