import type { AvatarMessages } from "./avatar-messages.js";
import type { CommunitiesMessages } from "./communities-messages.js";
import type { UiMessages } from "./ui-messages.js";

/**
 * Fixed microcopy owned by the design system components (accessible labels, headings, empty
 * states, counters), keyed by component. Content and product copy never live here: they come
 * from the app through props. Each feature adds its own `<Feature>Messages` type to this union.
 */
export type Messages = UiMessages & AvatarMessages & CommunitiesMessages;
