import { useState } from "react";

import { ExternalLink, Lock } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { CreateExternalJobDialogProps } from "../../types/domain/jobs/create-external-job-dialog-props.js";
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
 * Cadastro de vaga EXTERNA: a pessoa cola uma vaga achada em outro site e o Énóis só lista.
 * O "Candidatar-se" do card leva direto ao link da origem — nenhuma candidatura passa por aqui.
 *
 * Mesmo gate de reputação da vaga da casa e a mesma declaração da comunidade: cadastrar vaga é
 * um ato de confiança, de qualquer origem.
 */
export function CreateExternalJobDialog({
  open,
  onOpenChange,
  gate,
  pending,
  error,
  onSubmit,
}: CreateExternalJobDialogProps) {
  const messages = useMessages().createExternalJobDialog;
  const fields = useMessages().jobFields;

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState<"HOUR" | "DAY" | "MONTH" | "YEAR">("MONTH");
  const [salaryNotInformed, setSalaryNotInformed] = useState(false);
  const [applyEmail, setApplyEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const reset = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setUrl("");
    setDescription("");
    setSalaryMin("");
    setSalaryMax("");
    setSalaryPeriod("MONTH");
    setSalaryNotInformed(false);
    setApplyEmail("");
    setAgreed(false);
  };

  const valid = title.trim() !== "" && company.trim() !== "" && url.trim() !== "" && agreed;

  const submit = () => {
    onSubmit({
      title: title.trim(),
      company: company.trim(),
      location: location.trim() || undefined,
      url: url.trim(),
      description: description.trim() || undefined,
      salaryMin: salaryMin.trim() || undefined,
      salaryMax: salaryMax.trim() || undefined,
      salaryPeriod,
      salaryNotInformed,
      applyEmail: applyEmail.trim() || undefined,
      communityAgreement: agreed,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) reset();
        onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-normal">{messages.title}</DialogTitle>

          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>

        {gate ? (
          <div className="flex items-start gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" />

            <div>
              <p className="font-medium text-foreground">{messages.gateTitle}</p>

              <p className="mt-1">
                {messages.gateRequirement(gate.minReputation)}{" "}
                {messages.gateCurrent(gate.reputation)}
              </p>

              <p className="mt-1">{messages.gateMissing(gate.missing)}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-text-subtle">{fields.title}</Label>

              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={fields.titlePlaceholder}
                className="bg-muted"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">{fields.company}</Label>

                <Input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={fields.companyPlaceholder}
                  className="bg-muted"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-normal text-text-subtle">{fields.location}</Label>

                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={messages.locationPlaceholder}
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-text-subtle">{messages.url}</Label>

              <Input
                type="url"
                inputMode="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="bg-muted"
              />

              <p className="inline-flex items-center gap-1.5 text-xs font-normal text-text-subtle">
                <ExternalLink className="h-3.5 w-3.5" />

                <>{messages.urlHint}</>
              </p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-text-subtle">{messages.activities}</Label>

              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={messages.activitiesPlaceholder}
                rows={3}
                maxLength={5000}
                className="bg-muted"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-text-subtle">{messages.salaryRange}</Label>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <Input
                  inputMode="numeric"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(e.target.value)}
                  placeholder={fields.salaryMinPlaceholder}
                  className="bg-muted"
                  disabled={salaryNotInformed}
                />
                <Input
                  inputMode="numeric"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(e.target.value)}
                  placeholder={fields.salaryMaxPlaceholder}
                  className="bg-muted"
                  disabled={salaryNotInformed}
                />

                <select
                  value={salaryPeriod}
                  onChange={(e) =>
                    setSalaryPeriod(e.target.value as "HOUR" | "DAY" | "MONTH" | "YEAR")
                  }
                  className="h-9 rounded-md border border-transparent bg-muted px-3 text-sm"
                  disabled={salaryNotInformed}
                >
                  <option value="HOUR">{fields.salaryPeriodHour}</option>

                  <option value="DAY">{fields.salaryPeriodDay}</option>

                  <option value="MONTH">{fields.salaryPeriodMonth}</option>

                  <option value="YEAR">{fields.salaryPeriodYear}</option>
                </select>
              </div>

              <label className="flex items-start gap-2 pt-1 text-xs font-normal text-text-subtle">
                <input
                  type="checkbox"
                  checked={salaryNotInformed}
                  onChange={(e) => {
                    setSalaryNotInformed(e.target.checked);
                    if (e.target.checked) {
                      setSalaryMin("");
                      setSalaryMax("");
                    }
                  }}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
                />

                <span>
                  <span className="block text-text-strong">{messages.salaryNotInformed}</span>

                  {messages.salaryNotInformedHint}
                </span>
              </label>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-normal text-text-subtle">{messages.applyEmail}</Label>

              <Input
                type="email"
                value={applyEmail}
                onChange={(e) => setApplyEmail(e.target.value)}
                placeholder="vagas@empresa.com"
                className="bg-muted"
              />

              <p className="text-xs font-normal text-text-subtle">{messages.applyEmailHint}</p>
            </div>

            <label className="flex items-start gap-2 rounded-lg bg-muted p-3 text-xs font-normal text-text-subtle">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
              />

              <span>{messages.communityAgreement}</span>
            </label>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button className="w-full rounded-full" disabled={!valid || pending} onClick={submit}>
              {pending ? messages.publishing : messages.action}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
