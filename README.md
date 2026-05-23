# Neon Exile

A browser-based cyberpunk text adventure prototype.

Open `index.html` in a browser to play. The game saves every choice to local browser storage, so refreshing the page resumes from the last saved state.

To package the game for Android, follow `MOBILE_ANDROID.md`.

Current prototype features:

- Character creation with name, class, portrait, and Guts/Wits/Charm point allocation
- Class-specific special move trees with level unlocks
- Region screens with visual choice nodes and level-locked areas
- Random text combat encounters with attack, trick, help, special, and run choices
- Street merchants for weapons, armor, accessories, healing, and loot sales
- Persistent bottom status bar with Guts, status effects, money, level, and portrait
- Local save/reset flow suitable for later mobile wrapping with Capacitor, Cordova, or a native WebView
