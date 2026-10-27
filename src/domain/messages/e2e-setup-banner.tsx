import { type FormEvent, useState } from "react";

import { Loader2, Lock } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { E2eSetupBannerProps } from "../../types/domain/messages/e2e-setup-banner-props.js";
import { Button } from "../../ui/button.js";
import { Input } from "../../ui/input.js";

/**
 * Banner at the top of the chat while end-to-end encryption is not set up.
 * - Accounts with a password: asks for it to restore or generate the key pair.
 * - OAuth-only accounts: asks them to define a password first.
 * The app hides the banner once a callback resolves `true`.
 */
export function E2eSetupBanner({
  hasPassword,
  onSetupWithPassword,
  onDefinePassword,
}: E2eSetupBannerProps) {
  const messages = useMessages().e2eSetupBanner;
  const [step, setStep] = useState<"idle" | "password" | "define" | "loading">("idle");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSetupWithPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setError(null);
    setStep("loading");
    if (!(await onSetupWithPassword(password))) {
      setError(messages.passwordError);
      setStep("password");
    }
  };

  const handleDefinePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError(messages.validationMinLength);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(messages.validationMismatch);
      return;
    }
    setError(null);
    setStep("loading");
    if (!(await onDefinePassword(newPassword))) {
      setError(messages.defineError);
      setStep("define");
    }
  };

  if (step === "idle") {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        <Lock className="h-4 w-4 shrink-0 text-primary" />

        <p className="flex-1 text-xs text-text-subtle">{messages.prompt}</p>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setStep(hasPassword ? "password" : "define")}
          className="shrink-0 text-xs"
        >
          {messages.activate}
        </Button>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />

        <span className="text-xs text-text-subtle">{messages.loading}</span>
      </div>
    );
  }

  if (step === "password") {
    return (
      <form
        onSubmit={handleSetupWithPassword}
        className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
      >
        <p className="mb-2 text-xs text-text-subtle">{messages.passwordPrompt}</p>

        <div className="flex gap-2">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={messages.passwordPlaceholder}
            className="h-8 text-xs"
            autoFocus
          />

          <Button type="submit" size="sm" className="shrink-0 text-xs">
            {messages.activate}
          </Button>
        </div>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </form>
    );
  }

  // step === "define"
  return (
    <form
      onSubmit={handleDefinePassword}
      className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
    >
      <p className="mb-2 text-xs text-text-subtle">{messages.definePrompt}</p>

      <div className="space-y-2">
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder={messages.newPasswordPlaceholder}
          className="h-8 text-xs"
          minLength={8}
          autoFocus
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder={messages.confirmPasswordPlaceholder}
          className="h-8 text-xs"
          minLength={8}
        />

        <Button type="submit" size="sm" className="w-full text-xs">
          {messages.defineAction}
        </Button>
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </form>
  );
}
