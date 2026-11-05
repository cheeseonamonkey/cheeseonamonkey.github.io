# Laundry Rooms

Minimal, read-only Alliance Laundry status dashboard. Based on [Zane's original Kimball Hall demo](https://github.com/zane-programs/reversing-with-claude-code/tree/master/washing-machine).

## Adding a publicly documented room

Add a record to `rooms.source.json` with a known WebSocket room ID, name, optional city/state, and public source URL. Do not confuse Speed Queen location/payment PINs with WebSocket room IDs. Avoid publishing private facility information.

The GitHub Pages workflow validates and rebuilds `rooms.json` on deployments and once per month. It **does not** enumerate unknown identifiers or query the Alliance service.

The dashboard supports searching, state filtering, favorites, adding rooms locally, JSON import/export, and read-only live machine data. Personal rooms/favorites are stored only in the browser, not uploaded to GitHub.

## Notes

An established WebSocket connection does not prove that a subscription returned useful data. The app reports **Live data** only when `MACHINE_STATUS` arrives. Machine-type classification uses the control-ID heuristic from the original demo and may be inaccurate on other models.

The official [Speed Queen location finder](https://stores.speedqueenlaundry.com/locations) does not expose verified WebSocket room identifiers.

This project is not affiliated with Alliance Laundry Systems.
