import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";

import { useMessages } from "../../../messages/messages-context.js";
import type { GifPickerDialogProps } from "../../../types/domain/post/gif-picker-dialog-props.js";
import { Button } from "../../../ui/button.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog.js";
import { Input } from "../../../ui/input.js";

import { isGifUrl } from "./gif-url.js";

const SEARCH_DEBOUNCE_MS = 350;

/**
 * Seletor de GIF do comentário.
 *
 * Busca por assunto (o provedor — Tenor ou GIPHY — é o que estiver configurado no servidor) e, sem
 * termo digitado, mostra o que está em alta: abrir o seletor já mostra GIF, sem obrigar a digitar.
 * O link colado continua existindo como alternativa, porque sem chave configurada no servidor a
 * busca fica indisponível e ela não pode ser a única porta. A busca é do app: o diálogo avisa o
 * termo (`onTermChange`, já com a pausa da digitação) e recebe o resultado.
 */
export function GifPickerDialog({
  open,
  onOpenChange,
  onSelect,
  onTermChange,
  data,
  isFetching,
  isError,
}: GifPickerDialogProps) {
  const messages = useMessages().gifPickerDialog;
  const [query, setQuery] = useState("");
  const [term, setTerm] = useState("");
  const [pasteMode, setPasteMode] = useState(false);
  const [pasted, setPasted] = useState("");
  const [pasteError, setPasteError] = useState(false);

  // Digitar não pode virar uma requisição por tecla: espera a pausa e busca o termo.
  useEffect(() => {
    const timer = setTimeout(() => setTerm(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    onTermChange(term);
  }, [onTermChange, term]);

  const reset = () => {
    setQuery("");
    setPasted("");
    setPasteError(false);
    setPasteMode(false);
  };

  const pick = (url: string) => {
    onSelect(url);
    onOpenChange(false);
    reset();
  };

  const submitPasted = () => {
    const value = pasted.trim();
    if (!isGifUrl(value)) {
      setPasteError(true);
      return;
    }
    pick(value);
  };

  const items = data?.items ?? [];

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        onOpenChange(next);
        if (!next) reset();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>
        </DialogHeader>

        {pasteMode ? (
          <div className="space-y-3 pt-1">
            <p className="text-sm font-normal text-text-subtle">{messages.hint}</p>

            <Input
              value={pasted}
              onChange={(event) => {
                setPasted(event.target.value);
                setPasteError(false);
              }}
              placeholder={messages.placeholder}
              aria-label={messages.placeholder}
            />

            {pasteError && <p className="text-xs text-destructive">{messages.invalid}</p>}

            <Button
              className="w-full rounded-full"
              onClick={submitPasted}
              disabled={!pasted.trim()}
            >
              {messages.action}
            </Button>
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={messages.searchPlaceholder}
              aria-label={messages.searchPlaceholder}
            />

            {isFetching && items.length === 0 ? (
              <div className="flex h-40 items-center justify-center text-text-subtle">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            ) : isError ? (
              <p className="py-8 text-center text-sm font-normal text-text-subtle">
                {messages.searchError}
              </p>
            ) : data && !data.available ? (
              <p className="py-8 text-center text-sm font-normal text-text-subtle">
                {messages.unavailable}
              </p>
            ) : items.length === 0 ? (
              <p className="py-8 text-center text-sm font-normal text-text-subtle">
                {term ? messages.searchEmpty(term) : messages.searchNothing}
              </p>
            ) : (
              <div className="space-y-2">
                {!term && (
                  <p className="text-xs font-semibold uppercase tracking-widest text-text-subtle">
                    {messages.trending}
                  </p>
                )}

                <div className="grid max-h-[45vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
                  {items.map((gif) => (
                    <button
                      key={gif.id}
                      type="button"
                      onClick={() => pick(gif.url)}
                      aria-label={gif.description ?? messages.gif}
                      className="group overflow-hidden rounded-lg border border-border-soft bg-surface-1"
                    >
                      <img
                        src={gif.previewUrl}
                        alt=""
                        loading="lazy"
                        className="aspect-square w-full object-cover transition group-hover:opacity-80"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-border-soft pt-3 text-xs text-text-subtle">
          <span>{data?.available && data.provider ? messages.poweredBy(data.provider) : ""}</span>

          <button
            type="button"
            onClick={() => setPasteMode((current) => !current)}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {pasteMode ? messages.backToSearch : messages.pasteToggle}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
