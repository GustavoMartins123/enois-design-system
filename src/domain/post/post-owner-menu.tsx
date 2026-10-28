import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { PostOwnerMenuProps } from "../../types/domain/post/post-owner-menu-props.js";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover.js";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet.js";

const triggerClassName =
  "rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground";

/**
 * Menu de quem escreveu o post (editar / excluir).
 *
 * No desktop é um popover ancorado no cabeçalho do card. No mobile não pode ser: o mesmo
 * cabeçalho carrega selos, tipo e assunto do autor, a linha quebra quando eles não cabem, o
 * cabeçalho cresce e o popover — que vive num portal, fora do card — abria por cima do texto da
 * publicação. Parecia que o botão de editar tinha sumido. A folha de baixo não depende de
 * ancoragem nenhuma: sobe da borda da tela e ocupa a largura toda, então o menu continua
 * alcançável por mais badges que a pessoa tenha.
 */
export function PostOwnerMenu({ onEdit, onDelete }: PostOwnerMenuProps) {
  const messages = useMessages().postOwnerMenu;

  return (
    <>
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={triggerClassName}
              title={messages.actions}
              aria-label={messages.actions}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </PopoverTrigger>

          <PopoverContent align="end" className="w-40 rounded-2xl border-border p-1.5">
            <button
              onClick={onEdit}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition hover:bg-muted"
            >
              <Pencil className="h-4 w-4" />
              {messages.edit}
            </button>

            <button
              onClick={onDelete}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-destructive transition hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
              {messages.delete}
            </button>
          </PopoverContent>
        </Popover>
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button
              className={triggerClassName}
              title={messages.actions}
              aria-label={messages.actions}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="bottom"
            className="rounded-t-2xl border-border bg-surface-card pb-8 pt-5"
          >
            <SheetHeader className="text-left">
              <SheetTitle className="text-base">{messages.actions}</SheetTitle>
            </SheetHeader>

            <div className="mt-4 space-y-2">
              <button
                onClick={onEdit}
                className="flex w-full items-center gap-2.5 rounded-xl border border-border-soft px-3.5 py-3 text-sm font-medium transition hover:bg-muted"
              >
                <Pencil className="h-4 w-4" />
                {messages.edit}
              </button>

              <button
                onClick={onDelete}
                className="flex w-full items-center gap-2.5 rounded-xl border border-destructive/30 px-3.5 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
                {messages.delete}
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
