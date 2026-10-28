import { useEffect, useState } from "react";

import { useMessages } from "../../messages/messages-context.js";
import type { MarketplaceSellDialogProps } from "../../types/domain/marketplace/marketplace-sell-dialog-props.js";
import { Button } from "../../ui/button.js";
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
 * Vender qualquer conteúdo por faíscas: template, banner, página, post, blog ou serviço.
 * O comprador recebe o texto/HTML em "Minhas compras" e edita antes de usar.
 */
export function MarketplaceSellDialog({
  open,
  onOpenChange,
  kindOptions,
  parsePrice,
  pending = false,
  onSubmit,
}: MarketplaceSellDialogProps) {
  const messages = useMessages().marketplaceSellDialog;
  const [kind, setKind] = useState("TEMPLATE");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("50");

  useEffect(() => {
    if (!open) return;
    setKind("TEMPLATE");
    setTitle("");
    setDescription("");
    setContent("");
    setPrice("50");
  }, [open]);

  const minPrice = parsePrice("50") ?? 50_000;
  const faiscas = parsePrice(price) ?? 0;
  const valid =
    title.trim().length >= 3 &&
    faiscas >= minPrice &&
    (kind === "SERVICE" || content.trim().length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{messages.title}</DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-text-subtle">{messages.kind}</Label>

            <select
              value={kind}
              onChange={(event) => setKind(event.target.value)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none transition focus:border-primary"
            >
              {kindOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-text-subtle">{messages.titleField}</Label>

            <Input
              value={title}
              maxLength={160}
              placeholder={messages.titlePlaceholder}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-text-subtle">{messages.descriptionField}</Label>

            <Textarea
              value={description}
              rows={2}
              maxLength={500}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-text-subtle">
              {kind === "SERVICE" ? messages.serviceContent : messages.content}
            </Label>

            <Textarea
              value={content}
              rows={8}
              maxLength={200_000}
              placeholder={
                kind === "SERVICE" ? messages.servicePlaceholder : messages.contentPlaceholder
              }
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-text-subtle">{messages.price}</Label>

            <Input
              type="number"
              min={50}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />

            <p className="text-xs text-text-subtle">{messages.minPrice}</p>
          </div>

          <Button
            className="w-full rounded-full"
            disabled={!valid || pending}
            onClick={() => onSubmit({ kind, title, description, content, price })}
          >
            {pending ? messages.publishing : messages.publish}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
