# iOS Packaging

Neon Exile is ready to be wrapped for iPhone and iPad with Capacitor.

## Requirements

- macOS with Xcode installed
- Node.js 20 or newer
- An Apple Developer account for device testing or App Store release

## One-time setup

Run these from the project root on the Mac:

```bash
npm install
npm run build
npx cap add ios
```

If the `ios/` folder already exists, use:

```bash
npm run cap:sync
```

## Open in Xcode

```bash
npm run cap:open:ios
```

In Xcode:

- Select the `App` target.
- Set the signing team and bundle identifier.
- Pick an iPhone simulator or connected device.
- Press Run.

## After game changes

Run this before opening or building iOS again:

```bash
npm run cap:sync
```

The static game files are copied into `www/`, which is the folder Capacitor packages into the iOS app.

