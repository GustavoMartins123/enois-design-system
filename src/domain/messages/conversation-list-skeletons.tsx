import { useMessages } from "../../messages/messages-context.js";
import type { SkeletonListProps } from "../../types/patterns/skeleton-list-props.js";
import { Skeleton } from "../../ui/skeleton.js";

/** Mesmo desenho da linha de conversa em `mensagens` (avatar, título, última mensagem, hora). */
export function ConversationListSkeletons({ count = 6 }: SkeletonListProps) {
  const messages = useMessages().skeletonList;

  return (
    <div role="status" aria-label={messages.loading} className="divide-y divide-border-soft">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex items-center gap-3 px-4 py-3">
          <Skeleton className="h-11 w-11 shrink-0 rounded-full" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-10 shrink-0" />
            </div>

            <Skeleton className="h-3 w-3/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
