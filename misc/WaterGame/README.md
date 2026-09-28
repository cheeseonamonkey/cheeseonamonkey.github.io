# WaterGame

Tiny mobile browser remake of a handheld water-ring toy.

## Play

GitHub Pages:

`/misc/WaterGame/`

- The game always presents a **landscape playfield**. If the device/browser is portrait, the whole game is rendered sideways immediately.
- **Enable tilt** maps device orientation to gravity.
- Or **drag anywhere** to steer gravity.
- Tap either yellow pump to fire a localized water jet.
- **Settings** exposes pump force, gravity strength, and ring size.

## Backgrounds

Settings also lets you choose a background image. The browser:
1. center-crops it to the current landscape game aspect ratio,
2. downsizes it before storage,
3. stores it persistently in IndexedDB on that browser.

**Use gradient** removes the saved image and restores the built-in gradient.

## Notes

There is deliberately **no scoring / ring-hooking rule yet**. Pegs are just physical obstacles for now.

The hosted build remains self-contained in `index.html`, so this folder works directly under the existing GitHub Pages repository with no build step or runtime dependencies.
