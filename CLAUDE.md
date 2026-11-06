# Numon Gridiron

A football math game for a kid in grades 3–4, played as a home-screen web app on an iPad. The kid calls a run or a pass, answers a math question, and drives for a touchdown to win collectible sports cards. A parent watches progress on a read-only dashboard.

- Live game: https://tdemmer18.github.io/numon-gridiron/
- Parent dashboard: https://tdemmer18.github.io/numon-gridiron/parent.html
- Repo: https://github.com/tdemmer18/numon-gridiron (public; GitHub Pages serves `main` from the root)
- Firebase project: `numon-gridiron` (Spark free plan; Email/Password auth; Firestore)

## Files

| File | Purpose |
|---|---|
| `index.html` | The game: HTML, CSS and the main JS (football, cards, shop, saving). Edit it directly. |
| `hockey.js` | Hockey mode: 31 made-up teams in NHL cities, rink game (first to 5 goals), hockey figures (`hfig`), hockey promos, hockey binder. Shares the main script's globals. |
| `editions.js` | Editions: binder completion, the move-up flow (with the real-prize message for Owen), past-edition binder tabs, and trading 3 extra copies for a missing card. |
| `lessons.js` | All 40 lessons, written for ages 8–10, each with a picture (`vis`), a one-line hook and a tip. Picture helpers are the `lv*` functions. |
| `learn.js` | `lessonFor(question)` (picks the lesson for a question), the in-question **Learn how** button and the **Learn math** library. |
| `parent.html` | Read-only parent dashboard. Signs in with the parent account and live-reads the kid's save. |
| `cloud.js` | ES module. Loads the Firebase SDK (v10.12.2 from gstatic), exposes `window.FB`, fires `fb-ready`. |
| `firebase-config.js` | Firebase web config (public by design; data is protected by the rules). |
| `firestore.rules` | Copy of the rules published in the Firebase console. If you change them, publish them in the console too. |
| `sw.js` | Service worker: network-first for this site, cache fallback offline. Add any new file to `FILES` and bump `CACHE`. |
| `manifest.webmanifest`, `icon-*.png` | Home-screen install. |

## How index.html is organized

Search for the `/* ============ NAME ============ */` markers in the main `<script>`:

- **DEX / art()**: the 30 original Numon creatures (used when Settings → Player style is "Numons").
- **MATH**: Grade 3 generators (`GEN.addsub/multdiv/ftm`, tiers 0–3). **4TH GRADE MATH**: `G4[4..6]`. `makeQ(level)` picks one for levels 1–6. Visuals are stored as descriptors (`vis:[['clock',h,m]]`) and drawn by `renderVis`, so missed questions can be saved and redrawn.
- **TEAMS**: 31 made-up teams in real NFL cities and divisions, each with a 3-player roster (defender, QB, RB/WR/TE). `fig()` draws the chibi "mini player" figure. `ME` is the kid's Buffalo Blizzard team, `MEP()` the kid's customizable QB (`S.me`).
- **Promo cards**: `LEGENDS` (made-up Hall of Legends players whose backs carry true Hall of Fame facts), awards, and special appearances in `PROMOS`.
- **STATE**: `S` is saved to localStorage (`numon-gridiron-v2`) and, when a parent is signed in, to Firestore at `families/{parentUid}/kids/main` as `{json, updatedAt}`. The state is stored as one JSON string because Firestore rejects nested arrays. `migrate()` upgrades old saves. Newest `updatedAt` wins when syncing.
- **STADIUM SKY**: background canvas and weather (`WX`, `pickWeather`, `drawStageWx`).
- **GAME**: downs, yards (`BASE`, `yardsFor`), streak-based difficulty, touchdown and turnover. An **Exit game** button leaves without logging the game (timers check `G` so nothing fires after leaving).
- **Question choice** (`pickQuestion`, `record`, `qkey`): questions answered right are remembered in `S.seen` (short hashes, last 3000) and not asked again. A miss returns 2–3 plays later in the same game (`G.retry`, at most twice per game), and unlearned misses from earlier games mix in about every 4th play. A returning question answered right is marked learned; missing it again updates the same `S.missed` entry instead of adding a duplicate.
- **SPORTS CARDS**: card fronts and backs (jokes in `JOKES`, NFL history in `FACTS`), binder.
- **COLORING PAGES**: black-and-white line-art export (1700×2200 PNG via the share sheet).
- **CARD SHOP**: coins, packs (each pack has one promo card), free touchdown packs, Pack of the Day.
- **PRACTICE + REPORT**: missed-question practice and the in-game progress report.
- **Scratch pad** (`initScratch`, called from `mountQ`): a drawing canvas between the question and the keypad for showing work with a finger or Apple Pencil. Pen colors, eraser, undo, clear; cleared for every new question. After a pencil touches it, finger touches are ignored (palm rejection). Layout is question | scratch pad | keypad on a wide screen; between 641 and 900px the question spans the top with scratch pad | keypad below; one column under 640px.
- **Game screen must fit an iPad without scrolling** (landscape 1180×820 and 1024×768, portrait 820×1180). The field box (`.stage`) is field only, sized `clamp(170px,27vh,260px)`; sprite size comes from `--spr` set in `layoutField`. Check page height at those sizes after layout changes.
- Grown-ups menu (lock icon, behind a multiplication question): parent account sign-in, backup/restore, Pack of the Day reset, erase progress.

## Sports

`S.sport` is `'football'` or `'hockey'` (Settings → Sport). Football cards live in `S.cards` (keys `id-slot`, promos `X-key`), hockey cards in `S.hcards` (keys `H<id>-<slot>`, promos `X-hk-...`). Coins, math stats, missed questions and the game log are shared; hockey log entries use team ids `100+id` (`teamOf()` resolves both). The kid's hockey look is separate from football: `S.meh` (pose, face, jersey, helmet, beard, stick tape, skates, number) is edited by `customizeH()` in hockey.js; only the name is shared with football (`S.me.name`). In hockey a right answer is a goal and a miss lets the other team score; first to 5 wins and earns the goalie card plus a free pack.

## Editions and grades

Each sport's binder is an edition (`S.ed[sport]`, 1–6): Standard (Grade 3), Bronze (Grade 4), Silver (Grade 5), Gold, Rainbow, Super Shiny (Grade 5, starting one level higher). The grade sets the difficulty range: Grade 3 = levels 1–3, Grade 4 = 4–6, Grade 5 = 7–9 (`lvLo`, `lvHi`, `startLv`). Grade 5 generators are `G5[7..9]` in **5TH GRADE MATH**. When every slot is filled, a banner offers **Move up**: a prize celebration shows ("You won a REAL prize! Go see Dad" plus the Mom & Dad message), the finished binder is saved to `S.arch[sport][edition]`, and the season and binder reset. Cards render with class `e<edition>` (frame, stamp and foil per edition); `window.RENDER_ED` overrides it when showing an archived binder. The grown-ups menu can move a sport up for testing.

## Rules to keep

- No real NFL team names, logos, or real player names on cards or figures. Cities, team-style colors and made-up nicknames are fine. Real players may appear only inside factual history text.
- Don't copy any commercial toy's exact design (for example, no team nameplate on the helmet front).
- Keep the math at grades 3–4. Run every generator change through a quick check that answers are valid (integers in range, the right choice present and choices unique).
- Kid-friendly copy only: no words like kill, death, hate, lose or wrong in anything the kid reads. Prefer "Good try", "Not quite", "to practice". The parent dashboard stays read-only.
- Save-format changes must keep old saves working: extend `fresh()` and `migrate()`.

## Test locally

```
python3 -m http.server 8765
```

Then open http://127.0.0.1:8765/ (game) and http://127.0.0.1:8765/parent.html. A quick syntax check of the main script:

```
sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > /tmp/check.js && node --check /tmp/check.js
```

## Publish

```
git add -A
git commit -m "Describe the change"
git push
```

Before pushing a change to any `.js` file, bump the `?v=` number on its `<script>` tag in index.html (any newer number, like the date and time) so iPads never mix old and new files. GitHub Pages redeploys in about a minute. The iPad picks up the change the next time the game opens online (the service worker is network-first).
