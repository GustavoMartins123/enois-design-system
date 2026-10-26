import { useAdapters } from "../../adapters/adapters-context.js";
import { cn } from "../../lib/utils.js";
import { useMessages } from "../../messages/messages-context.js";
import type { UserAvatarProps } from "../../types/domain/avatar/user-avatar-props.js";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar.js";

import { AvatarFrameFx } from "./avatar-frame-fx.js";
import { ANIMATED_FRAMES, isFxFrame } from "./avatar-frames.js";
import { useAvatarAnimation } from "./use-avatar-animation.js";

function getInitials(name: string, unknown: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? unknown;
  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return `${first}${last}`.toUpperCase();
}

export function UserAvatar({
  src,
  alt,
  className,
  fallback,
  fallbackClassName,
  frame,
  frameOverflow = "visible",
}: UserAvatarProps) {
  const messages = useMessages().userAvatar;
  const { resolveMediaUrl } = useAdapters();
  const label = alt ?? messages.fallbackAlt;
  const resolved = resolveMediaUrl(src);
  const fx = isFxFrame(frame);
  const animated = !!frame && ANIMATED_FRAMES.includes(frame);
  const animationRef = useAvatarAnimation(frame);
  const avatar = (
    <Avatar
      ref={!fx && animated ? animationRef : undefined}
      className={fx ? "h-full w-full" : className}
      data-avatar-frame={fx ? undefined : frame || undefined}
      data-avatar-animated={!fx && animated ? true : undefined}
    >
      {resolved && <AvatarImage src={resolved} alt={label} />}
      <AvatarFallback
        className={
          fallbackClassName ??
          // 38cqw acompanha o container do Avatar: as iniciais ficam proporcionais tanto
          // no avatar de h-6 (comentário) quanto no grande do perfil.
          "bg-violet-300 text-violet-900 font-bold text-[38cqw] leading-none tracking-normal"
        }
      >
        {fallback ?? getInitials(label, messages.unknownInitial)}
      </AvatarFallback>
    </Avatar>
  );
  if (!fx || !frame) return avatar;
  // As molduras com efeito saem do círculo e o Avatar corta tudo (overflow-hidden): o tamanho
  // e o layout de quem chamou vão para um invólucro, e o efeito fica ao lado do Avatar. Campos
  // de edição podem optar pelo corte para que a moldura nunca invada o texto.
  return (
    <span
      ref={animated ? animationRef : undefined}
      className={cn(
        "@container relative isolate flex h-10 w-10 shrink-0 rounded-full",
        frameOverflow === "hidden" && "overflow-hidden",
        className,
      )}
      data-avatar-frame={frame}
      data-avatar-animated={animated ? true : undefined}
    >
      {avatar}
      <AvatarFrameFx frame={frame} />
    </span>
  );
}
