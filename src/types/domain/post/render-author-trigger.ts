import type { ReactNode } from "react";

/**
 * Turns the author's avatar or name into the app's own trigger (e.g. a mini profile card). The
 * content comes without the profile link; the app is in charge of reaching the profile.
 */
export type RenderAuthorTrigger = (content: ReactNode, part: "avatar" | "name") => ReactNode;
