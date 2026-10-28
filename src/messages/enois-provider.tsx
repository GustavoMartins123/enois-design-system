import { useMemo } from "react";

import { AdaptersContext, defaultAdapters } from "../adapters/adapters-context.js";
import type { EnoisProviderProps } from "../types/messages/enois-provider-props.js";

import { mergeMessages } from "./merge-messages.js";
import { MessagesContext } from "./messages-context.js";

export function EnoisProvider({
  messages,
  Link,
  resolveMediaUrl,
  resolveMediaOriginalUrl,
  isOwnMediaUrl,
  children,
}: EnoisProviderProps) {
  const messagesValue = useMemo(() => mergeMessages(messages), [messages]);
  const adaptersValue = useMemo(
    () => ({
      Link: Link ?? defaultAdapters.Link,
      resolveMediaUrl: resolveMediaUrl ?? defaultAdapters.resolveMediaUrl,
      resolveMediaOriginalUrl: resolveMediaOriginalUrl ?? defaultAdapters.resolveMediaOriginalUrl,
      isOwnMediaUrl: isOwnMediaUrl ?? defaultAdapters.isOwnMediaUrl,
    }),
    [Link, resolveMediaUrl, resolveMediaOriginalUrl, isOwnMediaUrl],
  );

  return (
    <AdaptersContext.Provider value={adaptersValue}>
      <MessagesContext.Provider value={messagesValue}>{children}</MessagesContext.Provider>
    </AdaptersContext.Provider>
  );
}
