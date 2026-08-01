# HA Radio Card

Dashboard card for the [`ha_radio`](https://github.com/padlefot/ha_radio)
integration: play/stop, station selection, a volume slider, a target picker and
a themed animated equalizer.

The station name doubles as the station picker — click it to choose, or use the
skip buttons either side of play. Everything is drawn from theme tokens, so no
native form controls leak through.

The integration is **required** — the card reads its stations and targets from
it over the websocket API.

## Configuration

Almost nothing to configure, on purpose. Stations and targets come from the
integration, so the card stays a drop-in.

```yaml
type: custom:ha-radio-card
```

| Option | Default | Notes |
|---|---|---|
| `theme` | from integration | Per-card theme. Leave unset to follow the integration's default. |
| `target` | last used | Pre-select a media player, so a room dashboard opens ready to play. |
| `show_target_picker` | `true` | Set `false` on a single-room dashboard. |
| `show_equalizer` | `true` | Set `false` to hide the bars. |
| `bars` | `7` | Equalizer bar count (3–24). |

Everything is editable in the **visual editor** — no YAML required.

The theme is **per card**: pick one in the card's editor, or leave it on *Use
integration default* to follow the integration's setting. That way a dashboard
that never touches it keeps a single global look, while one view can still be
Retro and another Arctic.

## Themes

Classic, Retro, 80s, Space Age, Transparent, Transparent Dark, Ancient,
Steampunk, Tropical, Arctic. Chosen per card, defaulting to the integration's
setting.

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

# visual check: all ten themes, playing and stopped
python3 -m http.server 8765   # then open preview.html
#   preview.html?theme=retro,tropical&w=520  focuses a subset at a larger size
# editor contract check (headless-friendly)
#   open editor-test.html
```

Lit 3 + TypeScript + Rollup. The card vendors a minimal `HomeAssistant`
interface rather than depending on `custom-card-helpers`, which lags HA's types,
and avoids HA's deprecated internals (`ha-textfield`/`ha-select`, deprecated in
2026.4). The editor uses `ha-form`, which is the component every third-party
card builds on.

The editor is wired with **`static getConfigElement()`**, not `getConfigForm()`
— HA honours the latter only for its own built-in cards, and a custom card that
offers just that shows "Visual editor not supported" while compiling perfectly.
`editor-test.html` asserts that contract, including that `config-changed`
escapes the shadow root; without that the dashboard silently never saves.

`dist/` must stay a single file — HACS serves one bundle, so the editor is
imported statically rather than lazily.
