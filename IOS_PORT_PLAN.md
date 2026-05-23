# Neon Exile iOS Port Plan

## Goal

Ship Neon Exile as an iPhone and iPad build using the existing browser game and Capacitor, while keeping Android packaging working from the same shared web bundle.

## Current State

- The game is a static web app: `index.html`, `app.js`, `styles.css`, `manifest.webmanifest`, and `assets/`.
- Android is already scaffolded under `android/`.
- Capacitor is configured with `webDir` set to `www`.
- The build step now creates a fresh `www/` folder from the shared web files.

## Phase 1: Shared Mobile Baseline

- Keep all gameplay and UI changes in the shared web app.
- Use `npm run build` before mobile syncs so Android and iOS package the same files.
- Avoid platform-specific logic unless a real device issue requires it.
- Confirm browser play still works by opening `index.html` directly.

## Phase 2: iOS Project Setup

- On a Mac, run `npm install`.
- Run `npm run build`.
- Run `npx cap add ios` to generate the `ios/` project.
- Run `npm run cap:open:ios` to open the app in Xcode.
- Set signing, team, and bundle identifier in Xcode.

## Phase 3: iPhone/iPad Fit Pass

- Test portrait and landscape layouts on current iPhone simulator sizes.
- Check safe areas around notches, home indicator, and bottom status UI.
- Verify touch targets, scroll behavior, and choice buttons feel good on phone screens.
- Confirm local save/reset behavior survives app restarts.

## Phase 4: Native Polish

- Add iOS app icons and launch screen assets.
- Set display name, version, build number, and orientation rules.
- Review status bar color/visibility and WebView background color.
- Decide whether the game should support iPad multitasking.

## Phase 5: Release Readiness

- Create archive build in Xcode.
- Test on at least one physical iPhone.
- Prepare App Store metadata, screenshots, privacy answers, and age rating.
- Keep `MOBILE_IOS.md` updated with any signing or release-specific notes we discover.

## Risks And Watch Items

- This Windows workspace can prepare the shared web/Capacitor side, but generating and signing the iOS project requires macOS and Xcode.
- Capacitor iOS dependencies need to be installed on the Mac before `npx cap add ios` works.
- Large image assets should be watched for startup and memory pressure on older phones.
- Browser local storage usually maps cleanly inside Capacitor, but it should be verified on device before release.

## Next Actions

- Run `npm install` where network access is available so `@capacitor/ios` is added to the lockfile.
- Move this project to a Mac or clone it there.
- Generate the `ios/` folder with `npx cap add ios`.
- Start the iPhone fit pass and record any UI issues as they appear.
