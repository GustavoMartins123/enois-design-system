import { useAdapters } from "../adapters/adapters-context.js";
import type { LinkProps } from "../types/adapters/link-props.js";

/** In-app link: delegates to the app's router link so navigation stays client-side. */
export function AppLink(props: LinkProps) {
  const { Link } = useAdapters();

  return <Link {...props} />;
}
