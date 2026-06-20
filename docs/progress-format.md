# Progress Format

Version 6 stores New 52 progress by canonical issue ID.

```json
{
  "version": 6,
  "issueProgress": {
    "batman-2011-001": true
  },
  "legacyProgress": {
    "pc-b0-1": 4
  },
  "essentials": [],
  "preferences": {
    "theme": "system",
    "readingMode": "curated"
  }
}
```

Older roadmap rows remain in `legacyProgress` until their eras are converted. Existing version 5 exports are accepted by the importer.
