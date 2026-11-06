# Numon Gridiron

A football math game for grades 3–4. Call a run or a pass, answer the math question, and drive for a touchdown to win sports cards.

- **Play:** `index.html` (installable on iPad: Safari → Share → Add to Home Screen)
- **Parent dashboard:** `parent.html` (sign in with the parent account to see progress)

## Files

| File | Purpose |
|---|---|
| `index.html` | The game |
| `parent.html` | Read-only parent dashboard |
| `cloud.js` | Firebase sign-in and progress sync |
| `firebase-config.js` | Your Firebase web config (safe to publish; data is protected by the rules) |
| `firestore.rules` | Security rules to paste into Firebase → Firestore → Rules |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | Home-screen app and offline support |

## Updating

Edit files, then:

```
git add -A
git commit -m "Describe the change"
git push
```

GitHub Pages redeploys in about a minute. The iPad picks up the new version the next time the game opens online.
