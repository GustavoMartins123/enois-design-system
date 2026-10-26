import { useState } from "react";

import { Boxes, CheckCircle2, Flame, Gamepad2, Map, Sparkles, Trophy, Type } from "lucide-react";

import { useMessages } from "../../../messages/messages-context.js";
import type { DailyGamesPanelProps } from "../../../types/domain/games/daily-games-panel-props.js";
import type { GameTab } from "../../../types/domain/games/game-tab.js";
import { AppLink } from "../../../ui/app-link.js";

/**
 * Os jogos diários (palavras, labirinto e blocos) como uma CATEGORIA dentro de "Jogos da
 * comunidade".
 *
 * <p>Até aqui era uma página à parte (/jogos-diarios) e um item à parte no menu. Agora o painel
 * mora dentro de /games: a pessoa troca de categoria no mesmo lugar, e o endereço antigo continua
 * funcionando (a rota redireciona para cá).
 */
export function DailyGamesPanel({
  wordsStatus,
  mazeStatus,
  blocksStatus,
  prizes,
  communityHref,
  words,
  maze,
  blocks,
}: DailyGamesPanelProps) {
  const messages = useMessages().dailyGamesPanel;
  const [activeTab, setActiveTab] = useState<GameTab>("words");

  const wordsWon = wordsStatus === "WON";
  const mazeWon = mazeStatus === "WON";
  const blocksWon = blocksStatus === "WON";

  const completedCount = (wordsWon ? 1 : 0) + (mazeWon ? 1 : 0) + (blocksWon ? 1 : 0);

  function getStatusBadge(status?: string) {
    if (status === "WON") {
      return (
        <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-3 w-3" /> {messages.done}
        </span>
      );
    }
    if (status === "IN_PROGRESS" || status === "PLAYING") {
      return <span className="text-[11px] font-medium text-amber-500">{messages.inProgress}</span>;
    }
    return (
      <span className="text-[11px] font-medium text-muted-foreground">{messages.available}</span>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho do Hub */}
      <header className="surface-card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-semibold">
              <Gamepad2 className="h-6 w-6 text-primary" /> {messages.title}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">{messages.subtitle}</p>
          </div>

          <AppLink
            href={communityHref}
            className="text-xs sm:text-sm font-medium text-primary underline shrink-0"
          >
            {messages.explore}
          </AppLink>
        </div>

        {/* Barra de Progresso do Dia */}
        <div className="mt-5 rounded-lg border border-border/60 bg-muted/30 p-3 sm:p-4">
          <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-500" />
              {messages.completedToday}
            </span>

            <span className="flex items-center gap-1 font-semibold text-foreground">
              {completedCount === 3 && (
                <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
              )}
              {messages.completedCount(completedCount)}
            </span>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(completedCount / 3) * 100}%` }}
            />
          </div>
        </div>
        {/* Prêmios em faísca do dia */}
        {prizes && prizes.length > 0 && (
          <div className="mt-3 rounded-lg border border-border/60 bg-muted/30 p-3 sm:p-4">
            <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
              <Sparkles className="h-4 w-4 text-primary" />
              {messages.prizesTitle}
            </div>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
              {prizes.map((tier) => (
                <span key={tier.label} className="text-xs text-muted-foreground">
                  {tier.label}:{" "}
                  <span className="font-semibold text-foreground">{tier.amountLabel}</span>
                </span>
              ))}
            </div>

            <p className="mt-2 text-[11px] text-muted-foreground">{messages.prizesNotice}</p>
          </div>
        )}
      </header>

      {/* Seletor de Abas dos Jogos */}
      <nav
        className="grid grid-cols-3 gap-2 p-1 bg-muted/40 rounded-xl border border-border/50"
        aria-label={messages.tabsLabel}
      >
        <button
          type="button"
          onClick={() => setActiveTab("words")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-150 touch-manipulation ${
            activeTab === "words"
              ? "bg-card text-foreground shadow-sm border border-border/60"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Type className="h-4 w-4 text-emerald-500" />

            <span>{messages.words}</span>
          </div>
          {getStatusBadge(wordsStatus)}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("maze")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-150 touch-manipulation ${
            activeTab === "maze"
              ? "bg-card text-foreground shadow-sm border border-border/60"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Map className="h-4 w-4 text-blue-500" />

            <span>{messages.maze}</span>
          </div>
          {getStatusBadge(mazeStatus)}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("blocks")}
          className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-150 touch-manipulation ${
            activeTab === "blocks"
              ? "bg-card text-foreground shadow-sm border border-border/60"
              : "text-muted-foreground hover:text-foreground hover:bg-card/50"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Boxes className="h-4 w-4 text-purple-500" />

            <span>{messages.blocks}</span>
          </div>
          {getStatusBadge(blocksStatus)}
        </button>
      </nav>

      {/* Conteúdo da Aba Ativa */}
      <div>
        {activeTab === "words" && words}
        {activeTab === "maze" && maze}
        {activeTab === "blocks" && blocks}
      </div>
    </div>
  );
}
