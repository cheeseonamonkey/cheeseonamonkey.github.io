# WaterGame

Tiny mobile browser remake of a handheld water-ring toy.

## Play

GitHub Pages path:

`/misc/WaterGame/`

Controls:
- **Enable tilt** on a phone to map device orientation to gravity.
- Or **drag anywhere** in the tank to steer gravity.
- Tap the two yellow pumps to fire localized water jets.
- Hook rings around the pegs.

## Structure

The hosted build is intentionally self-contained in `index.html` so this directory can live inside the existing GitHub Pages repository with no build step or runtime dependencies.

The JavaScript still keeps explicit object boundaries: fixed-step loop, world/entities, world factory, physics engine, capture system, pump service, particle system, renderer, input adapters, game session, and app shell.

This is still an early toy-physics prototype; the next useful pass is tuning geometry and pump behavior against the physical reference toy/video.
