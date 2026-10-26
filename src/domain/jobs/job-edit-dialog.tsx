import { useState } from "react";

import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { JobEditData } from "../../types/domain/jobs/job-edit-data.js";
import type { JobEditDialogProps } from "../../types/domain/jobs/job-edit-dialog-props.js";
import type { JobEditOptions } from "../../types/domain/jobs/job-edit-options.js";
import type { JobEditValues } from "../../types/domain/jobs/job-edit-values.js";
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

const SELECT_CLASS =
  "flex h-9 w-full rounded-md border border-transparent bg-muted px-3 py-2 text-sm font-normal text-text-strong outline-none focus-visible:ring-1 focus-visible:ring-ring";

/**
 * Edicao de vaga publicada por voce.
 *
 * Os campos do formulario de candidatura NAO sao editaveis aqui de proposito: o `PUT` substitui
 * o que for enviado, entao o app os reenvia como estao — senao a vaga perderia o formulario
 * que o autor montou. Quem quiser mudar isso recria a vaga.
 */
export function JobEditDialog({
  job,
  onOpenChange,
  options,
  saving,
  error,
  onSave,
}: JobEditDialogProps) {
  const messages = useMessages().jobEditDialog;

  return (
    <Dialog open={!!job} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        {job && (
          <EditForm
            key={job.id}
            job={job}
            options={options}
            saving={saving}
            error={error}
            onSave={onSave}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function EditForm({
  job,
  options,
  saving,
  error,
  onSave,
}: {
  job: JobEditData;
  options: JobEditOptions;
  saving: boolean;
  error: string | null;
  onSave: (values: JobEditValues) => void;
}) {
  const messages = useMessages().jobEditDialog;
  const fields = useMessages().jobFields;
  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [location, setLocation] = useState(job.location);
  const [type, setType] = useState(job.type);
  const [level, setLevel] = useState(job.level);
  const [salaryMin, setSalaryMin] = useState(job.salaryMin ?? "");
  const [salaryMax, setSalaryMax] = useState(job.salaryMax ?? "");
  const [salaryPeriod, setSalaryPeriod] = useState(job.salaryPeriod ?? "MONTH");
  const [currency, setCurrency] = useState(job.currency ?? "BRL");
  const [skills, setSkills] = useState(job.skills.join(", "));
  const [description, setDescription] = useState(job.description ?? "");

  // Moeda desconhecida mostra o símbolo da padrão (a primeira opção).
  const currencySymbol = (
    options.currencies.find((option) => option.code === currency.toUpperCase()) ??
    options.currencies[0]
  )?.symbol;

  const valid =
    title.trim() !== "" &&
    company.trim() !== "" &&
    description.trim() !== "" &&
    salaryMin.trim() !== "";

  return (
    <div className="space-y-4 pt-2">
      <div className="space-y-1.5">
        <Label className="text-xs font-normal text-text-subtle">{fields.title}</Label>

        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-muted" />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-normal text-text-subtle">{fields.company}</Label>

        <Input value={company} onChange={(e) => setCompany(e.target.value)} className="bg-muted" />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-xs font-normal text-text-subtle">{fields.location}</Label>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={SELECT_CLASS}
          >
            {options.locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-normal text-text-subtle">{fields.type}</Label>

          <select value={type} onChange={(e) => setType(e.target.value)} className={SELECT_CLASS}>
            {options.types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-normal text-text-subtle">{fields.level}</Label>

          <select value={level} onChange={(e) => setLevel(e.target.value)} className={SELECT_CLASS}>
            {options.levels.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-normal text-text-subtle">{fields.salaryMin}</Label>

        <div className="flex gap-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={cn(SELECT_CLASS, "w-32 shrink-0")}
            aria-label={fields.currency}
          >
            {options.currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>

          <Input
            value={salaryMin}
            onChange={(e) => setSalaryMin(e.target.value)}
            placeholder={fields.salaryMinPlaceholder}
            inputMode="decimal"
            className="bg-muted"
          />
        </div>

        <p className="text-xs font-normal text-text-subtle">
          {fields.salaryMinHint(currencySymbol ?? "")}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-xs font-normal text-text-subtle">{fields.salaryMax}</Label>

          <Input
            value={salaryMax}
            onChange={(e) => setSalaryMax(e.target.value)}
            placeholder={fields.salaryMaxPlaceholder}
            inputMode="decimal"
            className="bg-muted"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-normal text-text-subtle">{fields.salaryPeriod}</Label>

          <select
            value={salaryPeriod}
            onChange={(e) => setSalaryPeriod(e.target.value)}
            className={SELECT_CLASS}
          >
            {options.salaryPeriods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-normal text-text-subtle">{fields.skills}</Label>

        <Input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder={fields.skillsPlaceholder}
          className="bg-muted"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-normal text-text-subtle">{fields.description}</Label>

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder={fields.descriptionPlaceholder}
          className="bg-muted"
        />
      </div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        className="w-full rounded-full"
        disabled={!valid || saving}
        onClick={() =>
          onSave({
            title: title.trim(),
            company: company.trim(),
            location,
            type,
            level,
            salaryMin: salaryMin.trim(),
            salaryMax: salaryMax.trim() || undefined,
            salaryPeriod,
            description: description.trim(),
            currency,
            skills: skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
          })
        }
      >
        {saving ? messages.saving : messages.save}
      </Button>
    </div>
  );
}
