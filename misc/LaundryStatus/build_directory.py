#!/usr/bin/env python3
"""Build a searchable directory from curated, explicitly known room IDs.

No third-party probes, ID enumeration, or network calls.
"""
import json
from datetime import datetime, timezone
from pathlib import Path

root = Path(__file__).resolve().parent
source = json.loads((root / "rooms.source.json").read_text(encoding="utf-8"))
if not isinstance(source, list) or len(source) > 500:
    raise ValueError("Expected no more than 500 curated rooms")
seen = set()
rooms = []
for entry in source:
    room_id = str(entry.get("id", ""))
    if not (room_id.isascii() and room_id.isdecimal() and 1 <= len(room_id) <= 12):
        raise ValueError(f"Invalid room ID: {room_id!r}")
    if room_id in seen:
        raise ValueError(f"Duplicate room ID: {room_id}")
    seen.add(room_id)
    name = str(entry.get("name", "")).strip()[:100]
    if not name:
        raise ValueError(f"Missing name for room {room_id}")
    room = {"id": room_id, "name": name,
            "city": str(entry.get("city", "")).strip()[:80],
            "state": str(entry.get("state", "")).strip().upper()[:2],
            "source": str(entry.get("source", ""))}
    if room["source"] and not room["source"].startswith("https://"):
        raise ValueError(f"Invalid source URL for room {room_id}")
    rooms.append(room)
rooms.sort(key=lambda room: (room["state"], room["city"].lower(), room["name"].lower(), room["id"]))
output = {"schemaVersion": 1, "generatedAt": datetime.now(timezone.utc).isoformat(), "rooms": rooms}
(root / "rooms.json").write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Built directory with {len(rooms)} curated room(s)")
