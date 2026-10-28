import { useMessages } from "../../messages/messages-context.js";
import type { AppBrandProps } from "../../types/domain/shell/app-brand-props.js";
import { AppLink } from "../../ui/app-link.js";

// The logo is served by the app (public/brand), not bundled: the header renders on the server too.
export function AppBrand({ href, onClick }: AppBrandProps) {
  const messages = useMessages().appBrand;

  return (
    <AppLink href={href} onClick={onClick} className="flex shrink-0 items-center gap-2">
      <img src="/brand/mark-primary.svg" alt="" className="h-9 w-9 shrink-0" />

      <span className="text-lg font-semibold tracking-tight">
        <>{messages.prefix}</>

        <span className="gradient-text">{messages.accent}</span>
      </span>
    </AppLink>
  );
}
