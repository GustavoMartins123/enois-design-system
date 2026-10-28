import { useMessages } from "../../messages/messages-context.js";
import { Skeleton } from "../../ui/skeleton.js";

/**
 * Casca de página inteira: título, subtítulo e blocos de conteúdo no lugar da rota que ainda está
 * chegando (navegação com internet lenta, loader demorado). The app renders it inside its shell so
 * the header and sidebar stay put while the route loads.
 */
export function PageSkeleton() {
  const messages = useMessages().skeletonList;

  return (
    <div role="status" aria-label={messages.loading} className="mx-auto w-full max-w-3xl space-y-6">
      <div className="space-y-3">
        <Skeleton className="h-7 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="surface-card space-y-3 p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
