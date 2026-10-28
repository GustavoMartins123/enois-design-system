import type { UserBadgesProps } from "../../types/domain/badges/user-badges-props.js";

import { MAX_BADGES } from "./max-badges.js";
import { UserBadge } from "./user-badge.js";

/**
 * Emblemas (até 5 PNGs) escolhidos pela própria pessoa no editar perfil.
 * Official badges (`emblema-*` ids) from the cosmetics shop draw in SVG instead (UserBadge).
 *
 * Aparecem colados ao nome dela onde quer que o nome apareça — perfil, post, comentário, blog e
 * página do criador. `badge` é o campo antigo de um emblema só: quando a lista não veio (backend
 * ainda sem `authorBadges`), ele é a lista. Sem emblema, não renderiza nada.
 */
export function UserBadges({ badges, badge, className }: UserBadgesProps) {
  const lista = (badges?.length ? badges : badge ? [badge] : [])
    .filter((url): url is string => Boolean(url))
    .slice(0, MAX_BADGES);

  if (lista.length === 0) return null;

  return (
    <span className="inline-flex shrink-0 items-center gap-0.5">
      {lista.map((url, index) => (
        <UserBadge
          key={`${index}-${url}`}
          badge={url}
          className={`h-4 w-4 shrink-0 rounded-full object-cover ${className ?? ""}`}
        />
      ))}
    </span>
  );
}
