import { useMessages } from "../../messages/messages-context.js";
import type { PostEditDialogProps } from "../../types/domain/post/post-edit-dialog-props.js";
import { Button } from "../../ui/button.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog.js";
import { Textarea } from "../../ui/textarea.js";

/**
 * Edição do post pelo autor. A CATEGORIA tambem e editavel (pedido via suporte): o dialogo troca o
 * tipo e as regras de conteudo o acompanham (PAGE pede HTML, ARTICLE pede o corpo). Os campos de
 * texto com menção vêm do app (`contentField`, `bodyField`).
 */
export function PostEditDialog({
  postId,
  open,
  onOpenChange,
  typeOptions,
  editType,
  onTypeChange,
  draft,
  contentField,
  pageDraft,
  onPageDraftChange,
  pageMaxLength,
  bodyDraft,
  bodyField,
  pageLoading = false,
  pending = false,
  onSave,
}: PostEditDialogProps) {
  const messages = useMessages().postEditDialog;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{messages.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-normal text-text-subtle">{messages.typeLabel}:</span>

          {typeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onTypeChange(option.id)}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-normal transition ${
                editType === option.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border-soft text-text-subtle hover:border-primary hover:text-primary"
              }`}
            >
              <option.icon className="h-3 w-3" />

              <>{option.label}</>
            </button>
          ))}
        </div>

        {contentField}

        {editType === "PAGE" && (
          <div>
            <label
              htmlFor={`page-html-${postId}`}
              className="mb-1 block text-xs font-normal text-text-subtle"
            >
              {messages.pageLabel}
            </label>

            <Textarea
              id={`page-html-${postId}`}
              value={pageDraft}
              maxLength={pageMaxLength}
              onChange={(event) => onPageDraftChange(event.target.value)}
              placeholder={pageLoading ? messages.loading : messages.pagePlaceholder}
              className="min-h-[160px] font-mono text-xs"
            />
          </div>
        )}

        {editType === "ARTICLE" && (
          <div>
            <span className="mb-1 block text-xs font-normal text-text-subtle">
              {messages.bodyLabel}
            </span>

            {bodyField}
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" className="rounded-full" onClick={() => onOpenChange(false)}>
            {messages.cancel}
          </Button>

          <Button
            className="rounded-full"
            disabled={
              pending ||
              (editType !== "PAGE" && !draft.trim()) ||
              (editType === "PAGE" && !pageDraft.trim()) ||
              (editType === "ARTICLE" && !bodyDraft.trim())
            }
            onClick={onSave}
          >
            {pending ? messages.saving : messages.save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
