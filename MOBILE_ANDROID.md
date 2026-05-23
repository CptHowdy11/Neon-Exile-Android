# Android Packaging

Neon Exile is set up for Capacitor.

## One-time setup

Install Node.js and Android Studio, then run:

```powershell
npm install
npm run build
npx cap add android
```

## Open in Android Studio

```powershell
npm run cap:open:android
```

In Android Studio, plug in your phone with USB debugging enabled and press Run.

## After game changes

Run this before opening/building Android again:

```powershell
npm run cap:sync
```

The static game files are copied into `www/`, which is the folder Capacitor packages into the Android app.
