# CLAUDE.md

@AGENTS.md

`AGENTS.md` (imported above) is the operating contract for every AI agent in this repository. All of
its rules apply; the ones below are repeated because they are the easiest to skip:

- **Boy scout rule: every failure is fixed when found.** A broken or flaky test, build, lint or type
  error, bug or security flaw you find is fixed in the same task, even if it predates your change. If
  the fix is truly out of reach, record it (issue or backlog item) and say so in the PR. Never leave
  it silent.
- **The DS draws, the front orchestrates.** No fetching, routing or stores here; data in through
  props, actions out through callbacks, copy through `useMessages()`.
- **Before a PR:** `npm run lint && npm run typecheck && npm test && npm run build && npm run test:dist`.
