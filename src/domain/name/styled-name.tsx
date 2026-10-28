import {
  profileNameTheme,
  profileNameThemeFontFamily,
  profileNameThemePaint,
} from "../../lib/theme/profile-name-fonts.js";
import { cn } from "../../lib/utils.js";
import type { AuthorNameStyle } from "../../types/domain/name/author-name-style.js";
import type { StyledNameProps } from "../../types/domain/name/styled-name-props.js";
import { Nameplate } from "../cosmetics/nameplate.js";
import { NAMEPLATES } from "../cosmetics/nameplates.js";

/**
 * Nome de uma pessoa com a personalização escolhida no perfil (tema, fonte e cor). É o MESMO
 * desenho da página de perfil, em todo lugar onde o nome aparece — sobre a plaquinha, quando a
 * pessoa equipou uma.
 */
export function StyledName({ name, style, className }: StyledNameProps) {
  if (!style) {
    return <>{name}</>;
  }
  // An unknown plate (removed from the catalog) keeps the plain name, without the plate box.
  if (!style.nameplate || !Object.hasOwn(NAMEPLATES, style.nameplate)) {
    return <PaintedName name={name} style={style} className={className} />;
  }
  return (
    <Nameplate plate={style.nameplate} className="cos-plate--inline">
      <PaintedName name={name} style={style} className={className} onPlate />
    </Nameplate>
  );
}

function PaintedName({
  name,
  style,
  className,
  onPlate = false,
}: StyledNameProps & { style: AuthorNameStyle; onPlate?: boolean }) {
  const theme = profileNameTheme(style.theme);
  const gradient = Boolean(theme.paint) || theme.colors.length > 1;
  // On a plate the name keeps its font and takes the plate ink: a gradient or color picked for the
  // page background can vanish on the plate (green on the green Mata plate measured 1.04:1).
  const paint = onPlate
    ? {}
    : gradient
      ? {
          backgroundImage: profileNameThemePaint(style.theme, style.color),
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }
      : { color: style.color ?? undefined };

  return (
    <span
      className={cn(theme.className, className)}
      style={{
        fontFamily: profileNameThemeFontFamily(style.theme, style.font),
        fontSize: theme.fontSize,
        ...paint,
      }}
    >
      {name}
    </span>
  );
}
