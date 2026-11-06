# Numon Gridiron

A football math game for a kid in grades 3–4, played as a home-screen web app on an iPad. The kid calls a run or a pass, answers a math question, and drives for a touchdown to win collectible sports cards. A parent watches progress on a read-only dashboard.

- Live game: https://tdemmer18.github.io/numon-gridiron/
- Parent dashboard: https://tdemmer18.github.io/numon-gridiron/parent.html
- Repo: https://github.com/tdemmer18/numon-gridiron (public; GitHub Pages serves `main` from the root)
- Firebase project: `numon-gridiron` (Spark free plan; Email/Password auth; Firestore)

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole game: HTML, CSS and JS in one file. This is the source of truth; edit it directly. |
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
- **GAME**: downs, yards (`BASE`, `yardsFor`), streak-based difficulty, touchdown and turnover.
- **SPORTS CARDS**: card fronts and backs (jokes in `JOKES`, NFL history in `FACTS`), binder.
- **COLORING PAGES**: black-and-white line-art export (1700×2200 PNG via the share sheet).
- **CARD SHOP**: coins, packs (each pack has one promo card), free touchdown packs, Pack of the Day.
- **PRACTICE + REPORT**: missed-question practice and the in-game progress report.
- Grown-ups menu (lock icon, behind a multiplication question): parent account sign-in, backup/restore, Pack of the Day reset, erase progress.

## Rules to keep

- No real NFL team names, logos, or real player names on cards or figures. Cities, team-style colors and made-up nicknames are fine. Real players may appear only inside factual history text.
- Don't copy any commercial toy's exact design (for example, no team nameplate on the helmet front).
- Keep the math at grades 3–4. Run every generator change through a quick check that answers are valid (integers in range, the right choice present and choices unique).
- Kid-friendly copy; the parent dashboard stays read-only.
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

GitHub Pages redeploys in about a minute. The iPad picks up the change the next time the game opens online (the service worker is network-first).
