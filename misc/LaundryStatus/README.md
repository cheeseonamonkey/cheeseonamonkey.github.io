# Laundry Rooms

Read-only Alliance Laundry room dashboard, originally based on [Zane's live laundry dashboard](https://github.com/zane-programs/reversing-with-claude-code/tree/master/washing-machine).

## Room ID sources

- `5730` — Kimball Hall ID published by Zane (demo).
- 35 University of Warwick IDs published in [joseph-coppin/laundry-tracker](https://github.com/joseph-coppin/laundry-tracker/blob/main/src/lib/rooms.ts) and [adam-fawaz/warwick-washer-api](https://github.com/adam-fawaz/warwick-washer-api) (documented Alliance API IDs, not currently live-verified).
- `13956` — an example from [whatbeato/hackthelaundry](https://github.com/whatbeato/hackthelaundry/blob/main/test-api.js) (location unknown, unverified).

Public laundromat addresses without a numeric Alliance room ID are excluded. No Salt Lake City or Phoenix-area WebSocket room IDs have been verified.

## Updates

Edit `rooms.source.json` with sourced numeric room IDs. Run `python3 build_directory.py` locally; GitHub Pages runs it automatically on each deployment and monthly. The job validates the curated data and does **not** enumerate Alliance's service.

## Mapping room IDs to real locations

Numeric room IDs do not encode geography. Authorized Alliance API responses expose these relationships:

- `GET /rooms/{roomId}`: room name and geo-boundary relationship.
- `GET /geoBoundaries/{geoBoundaryId}`: location names and nested room IDs.
- `washAlert/machines/{roomId}`: machine roster records can contain `room.id`, `room.roomName`, and `organization.organizationName`.

Use **Import / map IDs** to load one of these JSON exports from your own authorized account. It extracts room IDs, room names, and parent location metadata in-browser; no account tokens or complete records are retained. See [squeen API](https://github.com/drakeerv/squeen/blob/main/app/src/main/kotlin/com/drakeerv/squeen/data/api/SpeedQueenApi.kt) and [mappers](https://github.com/drakeerv/squeen/blob/main/app/src/main/kotlin/com/drakeerv/squeen/data/model/Mappers.kt). The UI cannot automatically resolve arbitrary IDs without authorized API access.

Personal rooms and favorites are only saved in your browser. Account/payment controls are locked. A documented ID does not guarantee a live WebSocket subscription.

Unofficial project; not affiliated with Alliance Laundry Systems. 
