# Neon Exile — Project Log

Active repo: `G:\CptHowdy11\Documents\GitHub\Neon-Exile-Android`
GitHub: (connect and push when ready for public/TestFlight distribution)

---

## Current Status (2026-05-25) — ✅ Android Device Tested

The game is a functioning browser-based cyberpunk text adventure wrapped in Capacitor for Android and iOS packaging.

**Android:** ✅ Successfully tested on a personal Android phone — works great. Buildable via Android Studio. See `MOBILE_ANDROID.md`.
**iOS:** Planned but not yet generated — requires a Mac with Xcode. See `IOS_PORT_PLAN.md` and `MOBILE_IOS.md`.
**Browser play:** Works by opening `index.html` directly.

The shared web bundle (`app.js`, `styles.css`, `index.html`, `assets/`) is the source of truth for both platforms. Always run `npm run build` before syncing to Android or iOS to ensure `www/` is current.

---

## Session Log

### 2026-05-23 — Initial build (originated in Codex Project folder)

- Created the browser-based prototype: character creation, class system, combat, merchant encounters, persistent local save.
- Added Guts/Wits/Charm point allocation and class-specific special move trees.
- Added region screens with visual choice nodes and level-locked areas.
- Added street merchant system (weapons, armor, accessories, healing, loot sales).
- Added persistent bottom status bar.
- Set up Capacitor scaffold for Android packaging.
- Created `MOBILE_ANDROID.md` and `MOBILE_IOS.md` build guides.
- Project was originally located at `G:\CptHowdy11\Documents\Codex Project`. Active development moved to this GitHub folder.

### 2026-05-23 — Moved to GitHub folder / Android repo setup

- Cloned/copied project into `G:\CptHowdy11\Documents\GitHub\Neon-Exile-Android`.
- Initialized `.git` repo here as the canonical location.
- Added `IOS_PORT_PLAN.md` with phased iOS port plan.
- Updated `README.md` to reference both `IOS_PORT_PLAN.md` and `MOBILE_IOS.md`.

### 2026-05-25 — Android device test passed

- Tested on personal Android phone — game works great, no blocking issues reported.
- This clears the path to Play Store prep: icons, launch screen, and store metadata are next.

### 2026-05-25 — Game and asset updates

- `app.js` grown from 86KB to 108KB — significant feature additions since original prototype.
- `styles.css` updated (44KB).
- `sw.js` (service worker) added for offline/PWA support.
- `assets/` folder updated.
- `www/` build output refreshed.
- Android project files updated under `android/`.

---

## Known Open Items

- iOS project has not been generated yet (`npx cap add ios` must run on a Mac).
- ✅ Android physical device test complete — passed.
- App icons and launch screen assets not yet created.
- App Store / Play Store metadata not yet drafted.
- Large preview PNG files in the root (`neon-exile-*-preview.png`) may be cleaned up — they appear to be development screenshots and are not needed by Capacitor.
- Local server logs (`local-server.out.log`, `local-server.err.log`) are empty — can be deleted or .gitignored.

## Next Actions (priority order)

1. ✅ Browser play-through verified.
2. ✅ Android physical device test — passed on personal Android phone (2026-05-25).
3. Create app icons and launch screen assets for Android (required for Play Store submission).
4. Draft Play Store listing metadata: title, short description, full description, category, content rating.
5. On a Mac: run `npm install`, `npm run build`, `npx cap add ios`, and begin the iOS fit pass per `IOS_PORT_PLAN.md`.
6. Draft App Store listing metadata once iOS build is confirmed.

---

## Notes for Future Sessions

- The `Codex Project` folder in Documents was the original workspace and has been deleted. This folder is the only active location.
- All game logic lives in `app.js`. It is a single-file architecture — no module bundler required.
- `npm run build` copies web files into `www/` which Capacitor then syncs into the native projects.
- Do not edit files inside `android/` directly unless resolving a native Android issue — sync from the web source instead.
