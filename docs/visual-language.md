# Visual language: "Boteco"

The default Énóis look: the community's evening after the meetup. Same identity (dark + violet +
Manrope), warm surfaces, soft corners, and shapes that mean something. Gallery themes keep their own
surfaces; these are the brand defaults in `src/styles.css` (`:root` and `.dark`).

## Surfaces

- Dark ground is a warm aubergine (`--background: #15111c`), not blue-black; cards are "table tops"
  (`--surface-card`) with `--shadow-table` (inset highlight + soft offset shadow) instead of a hard
  border. The `surface-card` utility and `PostCard` use it.
- `--lamp` is a faint amber light over the top of the page, painted by `AppLayout`. Lite mode turns
  `--lamp` and `--shadow-table` off.
- Body text is 16px (15px in dense rows), meta 13px; secondary inks are warm (`--text-subtle`,
  `--text-date`) and pass AA on the ground.

## Semantic contours

The shape tells where something came from before it is read:

| Shape | Means | Component |
|---|---|---|
| Circle | a person | `UserAvatar` |
| Squircle ("mesa") in the place's color | a community or group | `CommunityMark` |
| Ticket with side notches | an event | `EventTicket` |

## Signals

One component, `Signal`, with four shapes. None of them blink.

| Shape | Kind | Use |
|---|---|---|
| Pill with a number | `count` | things to handle: notices, connection requests |
| Balloon with a number | `messages` | unread messages |
| Dot with a soft halo | `new` | there is news there |
| Amber "hoje" tag | `today` | something happens today (an event) |

Menu entries (`NavigationItemData.signal`), dock items (`MobileDockItem.signal`), community
shortcuts (`hasNews`) and Explore rooms (`ExploreItemData.signal`) all take the same vocabulary. The
app derives them from one source (the unread notifications summary), so the menu and the bell never
disagree.

## Shell

- Phone: `MobileDock` (floating, four destinations around the publish action), `NavigationDrawer`
  as a soft floating panel, menu grouped by `NavigationSection` (`you`, `community`, `work`,
  `explore`).
- Account menu: six quick entries (profile, wallet, account page, help, theme, sign out); every
  other account, privacy and preference item lives in `AccountSettings`.
- Explore: `ExploreHub` lists every room that is not on the dock or in the menu, with a filter that
  matches names, descriptions and keywords.
- Composer at rest: `ComposerLauncher`; the full composer only opens when the person starts.
