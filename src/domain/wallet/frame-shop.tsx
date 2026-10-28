import { useState } from "react";

import { ArrowUpRight, Check, ChevronDown, Heart, Search, Sparkles } from "lucide-react";

import { useMessages } from "../../messages/messages-context.js";
import type { FrameShopItem } from "../../types/domain/wallet/frame-shop-item.js";
import type { FrameShopOrder } from "../../types/domain/wallet/frame-shop-order.js";
import type { FrameShopProps } from "../../types/domain/wallet/frame-shop-props.js";
import { Button } from "../../ui/button.js";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog.js";
import { LoadingState } from "../../ui/loading-state.js";
import { ANIMATED_FRAMES } from "../avatar/avatar-frames.js";
import { UserAvatar } from "../avatar/user-avatar.js";

const FRAME_SHOP_PAGE_SIZE = 12;

export function FrameShop({
  onlyOwned = false,
  items: catalog,
  loading = false,
  error = false,
  onRetry,
  user,
  order,
  onOrderChange,
  actionPending = false,
  onBuy,
  onEquip,
}: FrameShopProps) {
  const messages = useMessages().frameShop;
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(FRAME_SHOP_PAGE_SIZE);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (loading) return <LoadingState />;
  if (error || !catalog) {
    return (
      <div className="frame-shop-error" role="alert">
        <p>{messages.loadError}</p>

        <Button variant="outline" onClick={onRetry}>
          {messages.retry}
        </Button>
      </div>
    );
  }

  const items = catalog;
  const selected = items.find((item) => item.id === selectedId);
  const featured = items.slice(0, 3);
  const visibleItems = items.filter((item) => {
    if (onlyOwned && !item.owned) return false;
    if (
      !`${item.name} ${item.description}`
        .toLocaleLowerCase("pt-BR")
        .includes(search.toLocaleLowerCase("pt-BR"))
    )
      return false;
    if (filter === "animated") return ANIMATED_FRAMES.includes(item.id);
    if (filter === "simple") return !ANIMATED_FRAMES.includes(item.id);
    return true;
  });

  const action = (item: FrameShopItem) => (
    <Button
      size="sm"
      variant={item.owned ? "outline" : "default"}
      className={item.equipped ? "frame-shop-action is-equipped" : "frame-shop-action"}
      disabled={actionPending}
      onClick={() => (item.owned ? onEquip(item.equipped ? "none" : item.id) : onBuy(item.id))}
    >
      {item.equipped ? messages.unequip : item.owned ? messages.equip : messages.buy}
      {!item.owned && <ArrowUpRight className="h-3.5 w-3.5" />}
    </Button>
  );

  const changeFilter = (value: string) => {
    setFilter(value);
    setVisible(FRAME_SHOP_PAGE_SIZE);
  };

  return (
    <div className="frame-shop">
      <section className="frame-shop-hero">
        <div className="frame-shop-hero-copy">
          <span className="frame-shop-eyebrow">
            <Sparkles size={12} />
            {onlyOwned ? messages.yourCollection : messages.cosmetics}
          </span>

          <h2>{onlyOwned ? messages.ownedTitle : messages.heroTitle}</h2>

          <p>{onlyOwned ? messages.ownedDescription : messages.heroDescription}</p>
        </div>

        <div className="frame-shop-hero-art">
          <span className="frame-shop-orbit" />
          <span className="frame-shop-orbit outer" />
          <UserAvatar
            src={user?.avatar}
            alt={user?.name}
            frame={user?.avatarFrame}
            className="frame-shop-hero-avatar"
          />

          {!onlyOwned &&
            featured.map((item, index) => (
              <span className={`frame-shop-float position-${index}`} key={item.id}>
                <UserAvatar
                  src={user?.avatar}
                  alt={user?.name}
                  frame={item.id}
                  className="frame-shop-float-avatar"
                />
              </span>
            ))}
        </div>
      </section>

      <section aria-label={messages.catalog}>
        <div className="frame-shop-toolbar">
          <div>
            <h2>
              {onlyOwned ? messages.ownedTab : messages.catalog}
              <span>{visibleItems.length}</span>
            </h2>

            <p>{messages.catalogDescription}</p>
          </div>

          <label className="frame-shop-search">
            <Search size={16} />
            <input
              aria-label={messages.search}
              placeholder={messages.search}
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setVisible(FRAME_SHOP_PAGE_SIZE);
              }}
            />
          </label>
        </div>

        <div className="frame-shop-controls">
          <div className="frame-shop-filters" aria-label={messages.filterLabel}>
            {Object.entries(messages.filters).map(([key, label]) => (
              <button key={key} aria-pressed={filter === key} onClick={() => changeFilter(key)}>
                {label}
              </button>
            ))}
          </div>

          <label className="frame-shop-order">
            <span>{messages.orderLabel}</span>

            <select
              value={order}
              onChange={(event) => {
                onOrderChange(event.target.value as FrameShopOrder);
                setVisible(FRAME_SHOP_PAGE_SIZE);
              }}
            >
              <option value="oldest">{messages.oldestFirst}</option>

              <option value="newest">{messages.newestFirst}</option>
            </select>
          </label>
        </div>

        {visibleItems.length === 0 ? (
          <div className="frame-shop-empty">
            <Search size={26} />

            <h3>
              {onlyOwned && items.every((item) => !item.owned)
                ? messages.noOwned
                : messages.noResults}
            </h3>

            <p>{messages.emptyHint}</p>
          </div>
        ) : (
          <ul className="frame-shop-grid">
            {visibleItems.slice(0, visible).map((item) => (
              <li className={`frame-shop-card ${item.equipped ? "is-equipped" : ""}`} key={item.id}>
                <button
                  className="frame-shop-stage"
                  aria-label={messages.tryItem(item.name)}
                  onClick={() => setSelectedId(item.id)}
                >
                  <span className="frame-shop-badges">
                    {item.owned && (
                      <span className="frame-shop-owned" title={messages.owned}>
                        <Check size={13} />
                      </span>
                    )}
                  </span>

                  <UserAvatar
                    src={user?.avatar}
                    alt={user?.name}
                    frame={item.id}
                    className="frame-shop-card-avatar"
                  />

                  <span className="frame-shop-try">
                    {messages.try}
                    <ArrowUpRight size={12} />
                  </span>
                </button>

                <div className="frame-shop-card-body">
                  <div className="frame-shop-card-title">
                    <h3>{item.name}</h3>

                    <span className="frame-shop-price">
                      <Sparkles size={13} />
                      {item.priceLabel}
                    </span>
                  </div>

                  <p>{item.description}</p>

                  <div className="frame-shop-card-footer">
                    <span>
                      {item.equipped
                        ? messages.equipped
                        : ANIMATED_FRAMES.includes(item.id)
                          ? messages.animated
                          : messages.simple}
                    </span>
                    {action(item)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="frame-shop-pagination">
          <p>{messages.showing(Math.min(visible, visibleItems.length), visibleItems.length)}</p>

          {visible < visibleItems.length && (
            <Button
              variant="outline"
              onClick={() => setVisible((value) => value + FRAME_SHOP_PAGE_SIZE)}
            >
              {messages.showMore}
              <ChevronDown size={15} />
            </Button>
          )}
        </div>
      </section>

      <p className="frame-shop-note">
        <Heart size={14} />
        {messages.note}
      </p>

      <Dialog
        open={selected !== undefined}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        <DialogContent className="frame-shop-dialog" aria-describedby={undefined}>
          {selected && (
            <>
              <span className="frame-shop-eyebrow">{messages.preview}</span>

              <DialogTitle>{selected.name}</DialogTitle>

              <div className="frame-shop-profile">
                <div className="frame-shop-profile-cover" />
                <UserAvatar
                  src={user?.avatar}
                  alt={user?.name}
                  frame={selected.id}
                  className="frame-shop-preview-avatar"
                />

                <strong>{user?.name}</strong>

                <span>{user?.username}</span>

                <p>{user?.headline}</p>
              </div>

              <p className="frame-shop-preview-description">{selected.description}</p>

              <div className="frame-shop-preview-footer">
                <span className="frame-shop-price">
                  <Sparkles size={17} />
                  {selected.priceLabel}
                  <small>{messages.sparks}</small>
                </span>
                {action(selected)}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
