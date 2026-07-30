# HA Radio Card

Dashboard card for the [`ha_radio`](http://192.168.2.6:3001/padlefot/ha_radio)
integration: play/stop, station selection (dropdown plus prev/next arrows), a
volume slider, a target picker, and a themed animated equalizer.

The integration is **required** — the card reads its stations, targets and theme
from it over the websocket API.

## Configuration

Almost nothing to configure, on purpose. Stations, targets and the **theme** all
come from the integration, so the card stays a drop-in.

```yaml
type: custom:ha-radio-card
```

| Option | Default | Notes |
|---|---|---|
| `target` | last used | Pre-select a media player, so a room dashboard opens ready to play. |
| `show_target_picker` | `true` | Set `false` on a single-room dashboard. |
| `show_equalizer` | `true` | Set `false` to hide the bars. |
| `bars` | `7` | Equalizer bar count (3–24). |

There is **no `theme` option**. The theme is set once in the integration and
applies to every HA Radio card — that was a deliberate choice to keep the card
config uncluttered. Setting `theme:` here logs a console warning rather than
silently doing nothing.

## Themes

Classic, Retro, 80s, Space Age, Transparent, Transparent Dark, Ancient,
Steampunk, Tropical, Arctic. Chosen in the integration's options.

Classic inherits your HA theme, so it fits any dashboard. The Transparent pair
drops the card background entirely — Transparent Dark also forces light text plus
a shadow, so it stays readable over an unknown background rather than inheriting
`--primary-text-color` (which flips with your HA theme).

Every colour is a `--rad-*` CSS custom property with a fallback and no
`!important`, so you can still override anything with card-mod or an HA theme
file.

## About the equalizer

**It is decoration, not measurement, and it can't be anything else.** Home
Assistant hands a URL to the Chromecast; the audio is fetched and decoded on the
*device*, so neither HA nor your browser ever sees the waveform. The Cast
protocol exposes playback status but no audio levels.

The only route to real frequency data would be for the card to independently
download and decode the stream itself, which would be a second parallel download
per open dashboard, blocked by CORS on most Icecast servers, and out of sync with
what the speaker is actually playing.

So the bars are driven by what the card genuinely knows: they animate while
playing, settle when stopped, and their amplitude tracks the volume slider. Each
bar gets its own period and phase so it doesn't read as a row of metronomes.

Only `transform: scaleY()` is animated — it's GPU-composited, so there's no
layout or paint per frame. `prefers-reduced-motion` renders the bars static.

## Installation

HACS → three-dot menu → Custom repositories → add this repo as a **Dashboard**,
install, then add the card to a view.

`dist/ha_radio_card.js` is committed because HACS does not build anything — what
is in `dist/` is what gets served.

## Development

```bash
npm install
npm run lint     # tsc --noEmit
npm run build    # rollup -> dist/ha_radio_card.js
npm run watch
```

Lit 3 + TypeScript + Rollup. The card deliberately avoids HA's internal
components (`ha-textfield` and friends were deprecated in 2026.4 and are being
removed) and vendors a minimal `HomeAssistant` interface instead of depending on
`custom-card-helpers`, which lags HA's types.
