import { type ChangeEvent, useEffect, useState } from "react";

import { useMessages } from "../../messages/messages-context.js";
import type { ProjectFormDialogProps } from "../../types/domain/profile/project-form-dialog-props.js";
import type { ProjectFormValues } from "../../types/domain/profile/project-form-values.js";
import { Button } from "../../ui/button.js";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog.js";
import { Input } from "../../ui/input.js";
import { Textarea } from "../../ui/textarea.js";

const EMPTY: ProjectFormValues = {
  title: "",
  shortDescription: "",
  description: "",
  url: "",
  repoUrl: "",
  tags: "",
  category: "",
  slug: "",
  cover: "",
};

/** Criar/editar projeto: mesma ficha do card e da página, sem mexer nos campos de jogo. */
export function ProjectFormDialog({
  open,
  onOpenChange,
  project,
  savePending = false,
  onSave,
}: ProjectFormDialogProps) {
  const messages = useMessages().projectFormDialog;
  const [form, setForm] = useState<ProjectFormValues>(EMPTY);

  useEffect(() => {
    if (!open) return;
    setForm(
      project
        ? {
            title: project.title,
            shortDescription: project.shortDescription ?? "",
            description: project.description ?? "",
            url: project.url ?? "",
            repoUrl: project.repoUrl ?? "",
            tags: project.tags ?? "",
            category: project.category ?? "",
            slug: project.slug,
            cover: project.cover ?? "",
          }
        : EMPTY,
    );
  }, [open, project]);

  const field = (key: keyof ProjectFormValues) => ({
    value: form[key],
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value })),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-normal">
            {project ? messages.editTitle : messages.createTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input placeholder={messages.title} maxLength={200} {...field("title")} />
          <Input
            placeholder={messages.shortDescription}
            maxLength={300}
            {...field("shortDescription")}
          />
          <Textarea
            placeholder={messages.description}
            rows={5}
            maxLength={4000}
            {...field("description")}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input placeholder={messages.url} {...field("url")} />
            <Input placeholder={messages.repoUrl} {...field("repoUrl")} />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input placeholder={messages.category} maxLength={120} {...field("category")} />
            <Input placeholder={messages.tags} maxLength={500} {...field("tags")} />
          </div>

          <Input placeholder={messages.cover} {...field("cover")} />
          <Input placeholder={messages.slug} maxLength={120} {...field("slug")} />

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="outline" className="rounded-full" onClick={() => onOpenChange(false)}>
              {messages.cancel}
            </Button>

            <Button
              className="rounded-full"
              disabled={savePending || form.title.trim().length < 3}
              onClick={() => onSave(form)}
            >
              {savePending ? messages.saving : messages.save}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
