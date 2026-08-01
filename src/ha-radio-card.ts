import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { artStyles, equalizerStyles, themeStyles } from "./themes";
import type {
  HaRadioCardConfig,
  HaRadioConfig,
  HomeAssistant,
  RadioTarget,
} from "./types";

const CARD_VERSION = "0.4.0";

// eslint-disable-next-line no-console
console.info(`%c HA-RADIO-CARD %c ${CARD_VERSION} `, "color:#fff;background:#03a9f4", "color:#03a9f4;background:#fff");

const DEFAULT_BARS = 7;

// Inline SVG rather than the ⏮ ▶ ■ ⏭ characters. Emoji-class glyphs are drawn
// by whichever font the OS picks, so they differ in size, baseline and colour
// between platforms — and on some they arrive pre-coloured, ignoring the theme.
// These inherit currentColor and have a fixed box, so buttons line up exactly.
const icon = (path: string): TemplateResult =>
  html`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d=${path} />
  </svg>`;

const PLAY_ICON = icon("M8 5.5v13l11-6.5z");
const STOP_ICON = icon("M7 7h10v10H7z");
const SKIP_BACK = icon("M7 6h2.2v12H7zm10 0v12l-8.2-6z");
const SKIP_FWD = icon("M17 6h-2.2v12H17zM7 6v12l8.2-6z");
const VOL_ICON = icon(
  "M3 10v4h3.2L11 18V6L6.2 10zm11.6 2a3.4 3.4 0 0 0-1.9-3.06v6.12A3.4 3.4 0 0 0 14.6 12z",
);
const CAST_ICON = icon(
  "M2 17.5v3h3a3 3 0 0 0-3-3zm0-4v1.8a5.2 5.2 0 0 1 5.2 5.2H9A7 7 0 0 0 2 13.5zm0-4v1.8a9.2 9.2 0 0 1 9.2 9.2H13A11 11 0 0 0 2 9.5zM20 3H4a2 2 0 0 0-2 2v2h2V5h16v14h-6v2h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z",
);

@customElement("ha-radio-card")
export class HaRadioCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HaRadioCardConfig;
  @state() private _radio?: HaRadioConfig;
  @state() private _target?: string;
  @state() private _volume = 0.35;
  @state() private _error?: string;
  /** Only marquee when the text genuinely doesn't fit — see _measureTicker. */
  @state() private _tickerOverflows = false;

  private _unsub?: Promise<() => Promise<void>>;
  /** Bar phase offsets, generated once so the equalizer isn't a metronome. */
  private _phases: number[] = [];

  public static override styles = [
    themeStyles,
    equalizerStyles,
    artStyles,
    css`
      ha-card {
        background: var(--rad-bg);
        color: var(--rad-fg);
        font-family: var(--rad-font);
        border: var(--rad-border);
        border-radius: var(--rad-radius);
        /* Theme accent glow (if any) layered over a shared elevation shadow,
           rather than each theme inventing its own. */
        box-shadow: var(--rad-shadow), var(--rad-shadow-md);
        /* Bottom padding is a token: themes whose artwork runs along the bottom
           edge widen it so a motif never sits under a control. */
        padding: 16px var(--rad-pad-x, 18px) var(--rad-pad-bottom, 18px);
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow: hidden;
        text-shadow: var(--rad-text-shadow, none);
      }

      .top {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
      }

      .logo {
        width: 44px;
        height: 44px;
        border-radius: 8px;
        object-fit: cover;
        flex: 0 0 auto;
        background: var(--rad-surface);
      }

      /* --- hero: the station name doubles as the station picker ----------- */
      .pick {
        position: relative;
        min-width: 0;
        flex: 1 1 auto;
        border-radius: 8px;
        padding: 2px 4px;
        margin: -2px -4px;
        transition: background-color 140ms;
      }
      .pick:hover {
        background: var(--rad-well);
      }
      /* The real focus ring belongs on the overlay select, but the select is
         invisible — so surface its focus state on the thing the user sees. */
      .pick:has(select:focus-visible) {
        outline: 2px solid rgb(var(--rad-accent-rgb));
        outline-offset: 1px;
      }
      .station {
        display: flex;
        align-items: baseline;
        gap: 8px;
        min-width: 0;
        font-family: var(--rad-title-font);
        font-weight: var(--rad-title-weight);
        letter-spacing: var(--rad-title-spacing);
        text-transform: var(--rad-title-transform);
        font-size: 1.35rem;
        line-height: 1.2;
      }
      .station-name {
        min-width: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .caret {
        width: 10px;
        height: 6px;
        flex: 0 0 auto;
        color: var(--rad-dim);
        transition: transform 140ms;
      }
      .pick:hover .caret {
        transform: translateY(1px);
      }

      .sub {
        color: var(--rad-dim);
        font-size: 0.68rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Transparent, full-bleed native select: keeps the OS dropdown and all of
         its keyboard/touch behaviour while the visible affordance is the title
         itself. Nothing is drawn, so it can't fight the theme. */
      select.overlay {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
        border: none;
        padding: 0;
        background: none;
        box-shadow: none;
      }

      /* --- equalizer --- */
      .eq {
        display: flex;
        align-items: flex-end;
        gap: var(--rad-bar-gap);
        height: 34px;
        flex: 0 0 auto;
        /* Hidden unless playing. The element stays mounted and keeps its box,
           so starting or stopping playback doesn't reflow the header — the
           title just never jumps sideways. */
        opacity: 0;
        transition: opacity 240ms ease;
      }
      .eq.on {
        opacity: 1;
      }
      .eq i {
        display: block;
        width: 5px;
        height: 100%;
        background: rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-glow);
        border-radius: var(--rad-bar-radius);
        transform-origin: bottom;
        transform: scaleY(0.18);
        animation-name: var(--rad-eq-anim);
        animation-duration: var(--rad-bar-period);
        animation-timing-function: var(--rad-bar-ease);
        animation-iteration-count: infinite;
        animation-direction: alternate;
        /* Pausing (rather than removing the animation) keeps the bars where
           they are and costs no reflow when toggling. */
        animation-play-state: var(--rad-eq-state, paused);
      }

      /* --- ticker --- */
      .ticker {
        overflow: hidden;
        white-space: nowrap;
        /* A recessed well — inset shadow plus a top highlight — so it reads as
           a display panel rather than a disabled text input. */
        background: var(--rad-well);
        border: 1px solid var(--rad-line);
        border-radius: 8px;
        box-shadow: var(--rad-inset);
        padding: 6px 0;
        /* Fade both edges so text enters and leaves rather than being chopped. */
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 0,
          #000 5%,
          #000 95%,
          transparent 100%
        );
        mask-image: linear-gradient(
          to right,
          transparent 0,
          #000 5%,
          #000 95%,
          transparent 100%
        );
      }
      .ticker-track {
        display: flex;
        width: max-content;
      }
      .ticker-track.run {
        animation: rad-marquee var(--rad-ticker-period, 14s) linear infinite;
        /* Only while actually animating: will-change permanently allocates a
           GPU layer, which is wasteful on a card that is usually idle. */
        will-change: transform;
      }
      /* Idle: no animation at all, and a little inset so the text isn't jammed
         against the fade. Freezing the animation mid-scroll instead would often
         leave the text visibly cut in half. */
      .ticker-track:not(.run) {
        transform: none;
        padding-left: 10px;
      }
      .ticker-track span {
        font-family: var(--rad-ticker-font);
        font-size: 0.76rem;
        letter-spacing: 0.06em;
        color: var(--rad-fg);
        /* Separator lives in the text, so the two copies are exactly equal
           width and translateX(-50%) loops without a jump. */
        padding-right: 3.5rem;
      }
      .ticker-track:not(.run) span + span {
        /* The duplicate is only needed for the seamless loop. */
        display: none;
      }

      /* --- transport ------------------------------------------------------
         One control cluster: skip / play / skip, then volume on the same line.
         Wraps rather than crushing the slider on a narrow card. */
      .transport {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        row-gap: 12px;
      }
      button.icon {
        border: 1px solid transparent;
        cursor: pointer;
        background: var(--rad-btn-bg);
        color: var(--rad-btn-fg);
        border-radius: 999px;
        width: 38px;
        height: 38px;
        padding: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        transition: filter 150ms, transform 120ms, box-shadow 150ms;
      }
      button.icon svg {
        width: 20px;
        height: 20px;
      }
      /* The primary is deliberately bigger, solid and elevated — it is the one
         thing on the card you always want to hit first. */
      button.icon.primary {
        width: 52px;
        height: 52px;
        margin-right: 2px;
        background: rgb(var(--rad-accent-rgb));
        color: var(--rad-on-accent, #fff);
        box-shadow: var(--rad-shadow-md), var(--rad-glow);
      }
      button.icon.primary svg {
        width: 24px;
        height: 24px;
      }
      button.icon:hover:not(:disabled) {
        filter: brightness(1.12);
        border-color: var(--rad-line-strong);
      }
      button.icon.primary:hover:not(:disabled) {
        transform: scale(1.04);
        border-color: transparent;
      }
      button.icon:active:not(:disabled) {
        transform: scale(0.95);
      }
      button.icon:focus-visible {
        outline: 2px solid rgb(var(--rad-accent-rgb));
        outline-offset: 2px;
      }
      button.icon:disabled {
        opacity: 0.4;
        cursor: default;
      }

      .vol {
        display: flex;
        align-items: center;
        gap: 8px;
        /* Takes the rest of the transport line, but drops to its own row
           before the slider gets too short to be usable. */
        flex: 1 1 150px;
        min-width: 130px;
        margin-left: 4px;
      }
      .volicon {
        display: inline-flex;
        color: var(--rad-dim);
        flex: 0 0 auto;
      }
      .volicon svg {
        width: 18px;
        height: 18px;
      }
      .volval {
        font-size: 0.72rem;
        font-variant-numeric: tabular-nums;
        color: var(--rad-dim);
        flex: 0 0 auto;
        min-width: 2.4em;
        text-align: right;
      }

      /* --- footer: where it plays ----------------------------------------- */
      .foot {
        display: flex;
        align-items: center;
        gap: 6px;
        color: var(--rad-dim);
        margin-top: -2px;
      }
      .foot-icon {
        display: inline-flex;
        flex: 0 0 auto;
      }
      .foot-icon svg {
        width: 15px;
        height: 15px;
      }

      /* --- controls -------------------------------------------------------
         Native <select> and <input type=range> are the single biggest reason a
         themed card still reads as "an HTML form with a picture behind it":
         they bring OS chrome, a grey UA background and — on macOS — a system
         blue slider that fights every palette. Both are reset with
         appearance:none and rebuilt from theme tokens. */
      select {
        appearance: none;
        -webkit-appearance: none;
        flex: 1 1 auto;
        min-width: 0;
        font: inherit;
        font-size: 0.88rem;
        color: var(--rad-fg);
        background-color: var(--rad-well);
        /* Custom chevron, so no UA arrow. currentColor can't be used inside a
           data-URI, so it's drawn with a theme-independent stroke and tinted by
           opacity instead. */
        background-image: linear-gradient(
            45deg,
            transparent 50%,
            currentColor 50%
          ),
          linear-gradient(135deg, currentColor 50%, transparent 50%);
        background-position:
          right 15px top 52%,
          right 10px top 52%;
        background-size:
          5px 5px,
          5px 5px;
        background-repeat: no-repeat;
        border: 1px solid var(--rad-line);
        border-radius: 10px;
        padding: 9px 30px 9px 12px;
        cursor: pointer;
        box-shadow: var(--rad-inset);
        transition: border-color 140ms, box-shadow 140ms;
      }
      select:hover {
        border-color: var(--rad-line-strong);
      }
      select:focus-visible {
        outline: none;
        border-color: rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-inset), 0 0 0 3px rgba(var(--rad-accent-rgb), 0.28);
      }
      /* The dropdown list itself is OS-rendered and cannot inherit the theme,
         so give it explicit legible colours rather than leaving it to chance. */
      select option {
        background: var(--rad-menu-bg, #1d2027);
        color: var(--rad-menu-fg, #f0f2f6);
      }

      /* Footer target picker: a line of text with a caret, not a second boxed
         dropdown. Two stacked full-width selects were the main reason the card
         read as a settings form. */
      select.ghost {
        background-color: transparent;
        border-color: transparent;
        box-shadow: none;
        color: var(--rad-dim);
        font-size: 0.78rem;
        padding: 3px 20px 3px 4px;
        background-position:
          right 9px top 55%,
          right 4px top 55%;
        background-size:
          4px 4px,
          4px 4px;
        flex: 0 1 auto;
        width: auto;
        max-width: 100%;
      }
      select.ghost:hover {
        color: var(--rad-fg);
        background-color: var(--rad-well);
        border-color: transparent;
      }

      input[type="range"] {
        appearance: none;
        -webkit-appearance: none;
        flex: 1 1 auto;
        min-width: 0;
        margin: 0;
        height: 22px;
        background: transparent;
        cursor: pointer;
      }
      /* Filled portion is painted with a gradient stop driven by --rad-fill,
         set inline from the current value — a track that only fills to the
         thumb is what makes it read as a real control. */
      input[type="range"]::-webkit-slider-runnable-track {
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          rgb(var(--rad-accent-rgb)) 0 var(--rad-fill, 35%),
          var(--rad-well) var(--rad-fill, 35%) 100%
        );
        box-shadow: var(--rad-inset);
      }
      input[type="range"]::-moz-range-track {
        height: 6px;
        border-radius: 999px;
        background: linear-gradient(
          90deg,
          rgb(var(--rad-accent-rgb)) 0 var(--rad-fill, 35%),
          var(--rad-well) var(--rad-fill, 35%) 100%
        );
        box-shadow: var(--rad-inset);
      }
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        margin-top: -5px;
        border-radius: 50%;
        background: var(--rad-thumb, #fff);
        border: 2px solid rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-shadow-sm);
        transition: transform 120ms;
      }
      input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--rad-thumb, #fff);
        border: 2px solid rgb(var(--rad-accent-rgb));
        box-shadow: var(--rad-shadow-sm);
      }
      input[type="range"]:hover::-webkit-slider-thumb {
        transform: scale(1.12);
      }
      input[type="range"]:focus-visible::-webkit-slider-thumb {
        box-shadow: 0 0 0 4px rgba(var(--rad-accent-rgb), 0.3);
      }
      input[type="range"]:disabled {
        cursor: default;
        opacity: 0.45;
      }

      .err {
        color: var(--error-color, #db4437);
        font-size: 0.8rem;
      }

      /* The bars are decoration; motion-sensitive users get a static shape.
         HA provides no reduced-motion helper, so this is handled here. */
      @media (prefers-reduced-motion: reduce) {
        .eq {
          transition: none;
        }
        .eq i {
          animation: none;
          transform: scaleY(0.4);
        }
        /* Ticker text must stay readable, so stop scrolling and let it truncate
           rather than leaving it parked at an arbitrary offset. */
        .ticker-track.run {
          animation: none;
          padding-left: 10px;
        }
        .ticker-track.run span + span {
          display: none;
        }
        .ticker-track.run span {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    `,
  ];

  public setConfig(config: HaRadioCardConfig): void {
    if (!config) throw new Error("Invalid configuration");

    // Theme is owned by the integration by design (one global look, no card
    // clutter). Warn rather than silently ignoring it — an invisible no-op
    // would just generate confused bug reports.
    if ("theme" in config) {
      // eslint-disable-next-line no-console
      console.warn(
        "ha-radio-card: `theme` is not a card option. Set the theme in the HA Radio integration (Settings → Devices & Services → HA Radio → Configure); it applies to every HA Radio card.",
      );
    }

    this._config = config;
    if (config.target) this._target = config.target;
    this._phases = [];
  }

  public getCardSize(): number {
    return 3;
  }

  // getGridOptions, not the deprecated getLayoutOptions.
  //
  // rows MUST be "auto". This card's height is content-driven (title, ticker,
  // two control rows, volume) and comes to far more than a few grid rows. A
  // fixed row count under-allocates the grid cell, the card grows past it, and
  // it then overlaps whatever follows in the section — including the edit-mode
  // "add card" (+) button, and spilling over the section onto the background.
  public getGridOptions(): Record<string, unknown> {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    void this._load();
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    void this._unsub?.then((f) => f()).catch(() => undefined);
    this._unsub = undefined;
  }

  /**
   * Fetch config once, then refresh only when the integration says so.
   *
   * Deliberately NOT driven from the `hass` setter: `hass` is reassigned on
   * every state change anywhere in HA, so calling callWS there would hammer the
   * websocket.
   */
  private async _load(): Promise<void> {
    if (!this.hass || this._unsub) return;
    try {
      await this._fetch();
      this._unsub = this.hass.connection.subscribeMessage<unknown>(
        () => void this._fetch(),
        { type: "ha_radio/subscribe" },
      );
    } catch (err) {
      this._error = `Could not reach the HA Radio integration: ${err}`;
    }
  }

  /**
   * Reflect the theme onto the HOST element.
   *
   * The theme rules are `:host([data-theme="…"])`, which matches
   * <ha-radio-card> itself — NOT the inner <ha-card>. Setting the attribute on
   * the inner card (as an earlier version did) meant no theme block ever
   * matched and every theme silently rendered as Classic.
   *
   * Host is also the right place regardless: the --rad-* tokens then inherit to
   * everything in the shadow root, including the equalizer bars.
   */
  protected override willUpdate(): void {
    const theme = this._radio?.theme ?? "classic";
    if (this.getAttribute("data-theme") !== theme) {
      this.setAttribute("data-theme", theme);
    }
  }

  /**
   * Decide whether the ticker needs to scroll at all.
   *
   * A marquee whose text is *shorter* than its container shows both copies at
   * once and reads as a rendering glitch ("Norge   Playing: P4 Norge") rather
   * than a ticker. So measure one copy against the container and only animate
   * when it actually overflows.
   *
   * The separator padding is subtracted because it exists solely to space the
   * two copies during the loop — it isn't part of the visible text.
   */
  protected override updated(): void {
    this._measureTicker();
  }

  private _measureTicker(): void {
    const box = this.renderRoot.querySelector<HTMLElement>(".ticker");
    const span = this.renderRoot.querySelector<HTMLElement>(".ticker-track span");
    if (!box || !span) return;
    const sep = parseFloat(getComputedStyle(span).paddingRight) || 0;
    const overflows = span.scrollWidth - sep > box.clientWidth;
    if (overflows !== this._tickerOverflows) {
      // Guarded so this can't loop: only a genuine change re-renders.
      this._tickerOverflows = overflows;
    }
  }

  private async _fetch(): Promise<void> {
    if (!this.hass) return;
    try {
      const cfg = await this.hass.callWS<HaRadioConfig>({ type: "ha_radio/config" });
      this._radio = cfg;
      this._error = undefined;

      // Only a MAJOR difference implies an incompatible API contract. Card and
      // integration are separate HACS repos and are allowed to drift on minor
      // versions; warning on any difference just cries wolf (not least because
      // the integration's version only updates on a full HA restart, since
      // Python won't re-import a changed module on an entry reload).
      const major = (v: string): string => (v || "0").split(".")[0];
      if (major(cfg.version) !== major(CARD_VERSION)) {
        // eslint-disable-next-line no-console
        console.warn(
          `ha-radio-card: card is ${CARD_VERSION} but the integration is ${cfg.version} — major versions differ, so they may be incompatible. Update both, then hard-reload to clear the cached bundle.`,
        );
      }

      if (this._target === undefined) {
        this._target = cfg.current_target ?? cfg.targets[0]?.entity_id;
      }
      if (cfg.default_volume !== undefined && !this._touchedVolume) {
        this._volume = cfg.default_volume;
      }
    } catch (err) {
      this._error = String(err);
    }
  }

  private _touchedVolume = false;

  // --- derived state ------------------------------------------------------
  private get _stationName(): string | undefined {
    const sel = this._radio?.select_entity;
    const st = sel ? this.hass?.states[sel]?.state : undefined;
    return st ?? this._radio?.current_station ?? this._radio?.stations[0]?.name;
  }

  private get _station() {
    const name = this._stationName;
    return this._radio?.stations.find((s) => s.name === name);
  }

  private get _targetObj(): RadioTarget | undefined {
    return this._radio?.targets.find((t) => t.entity_id === this._target);
  }

  /** True only when the selected target is actually playing our stream. */
  private get _isPlaying(): boolean {
    if (!this._target || !this.hass) return false;
    const st = this.hass.states[this._target];
    if (!st) return false;
    if (st.state !== "playing" && st.state !== "buffering") return false;
    const url = this._station?.url;
    const playing = st.attributes["media_content_id"];
    return !url || typeof playing !== "string" ? st.state === "playing" : playing === url;
  }

  /**
   * Ticker text.
   *
   * Deliberately reports what the *player* is doing, rather than repeating the
   * station heading above it — so when idle the two lines differ usefully
   * (heading = what's selected, ticker = what's actually happening).
   *
   * We set media_title to the station name ourselves for cast targets, so it's
   * only worth showing when it's genuinely richer than that. Music Assistant
   * resolves real programme/track names, which is where this pays off.
   */
  private get _tickerText(): string {
    const station = this._stationName ?? "—";
    if (!this._isPlaying) return `Stopped — ${station}`;

    const attrs = this._target ? this.hass?.states[this._target]?.attributes : undefined;
    const title = attrs?.["media_title"];
    const artist = attrs?.["media_artist"];
    let detail = "";
    if (typeof title === "string" && title && title !== station) {
      detail =
        typeof artist === "string" && artist && artist !== "Live radio"
          ? ` — ${artist} · ${title}`
          : ` — ${title}`;
    }
    return `Playing: ${station}${detail}`;
  }

  // --- actions ------------------------------------------------------------
  private _call(service: string, data: Record<string, unknown> = {}): void {
    void this.hass?.callService("ha_radio", service, data);
  }

  private _play(): void {
    this._call("play", {
      station: this._stationName,
      target: this._target,
      volume: this._volume,
    });
  }

  private _stop(): void {
    this._call("stop", { target: this._target });
  }

  private _step(delta: number): void {
    const stations = this._radio?.stations ?? [];
    if (!stations.length) return;
    const i = stations.findIndex((s) => s.name === this._stationName);
    const next = stations[(Math.max(i, 0) + delta + stations.length) % stations.length];
    this._selectStation(next.name);
  }

  private _selectStation(name: string): void {
    const sel = this._radio?.select_entity;
    if (sel) {
      void this.hass?.callService("select", "select_option", {
        entity_id: sel,
        option: name,
      });
    }
    // If it's already playing, follow through so the arrows retune live.
    if (this._isPlaying) {
      this._call("play", { station: name, target: this._target, volume: this._volume });
    }
  }

  private _onVolume(ev: Event): void {
    this._touchedVolume = true;
    this._volume = Number((ev.target as HTMLInputElement).value);
    // Live-adjust only while playing, so dragging before playback just sets the
    // level that will be used (which is the point of the pre-set volume).
    if (this._isPlaying && this._targetObj?.supports_volume) {
      void this.hass?.callService("media_player", "volume_set", {
        entity_id: this._target,
        volume_level: this._volume,
      });
    }
  }

  // --- render -------------------------------------------------------------
  protected override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const playing = this._isPlaying;

    return html`
      <ha-card style=${`--rad-eq-state:${playing ? "running" : "paused"}`}>
        ${this._error ? html`<div class="err">${this._error}</div>` : nothing}
        ${this._radio && !this._radio.ready
          ? html`<div class="err">HA Radio integration is not ready yet.</div>`
          : nothing}

        <div class="top">
          ${this._station?.logo
            ? html`<img class="logo" src=${this._station.logo} alt="" />`
            : nothing}
          <!-- The station name IS the picker. A full-width <select> for
               something the card already displays in full is pure duplication;
               overlaying a transparent native select keeps the OS dropdown
               (and its keyboard/mobile behaviour) while the visible control is
               just the title with a caret. -->
          <div class="pick">
            <div class="station">
              <span class="station-name"
                >${this._stationName ?? "No stations configured"}</span
              >
              <svg class="caret" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" />
              </svg>
            </div>
            <div class="sub">${playing ? "On air" : "Ready"}</div>
            <select
              class="overlay"
              aria-label="Station"
              .value=${this._stationName ?? ""}
              @change=${(e: Event) => this._selectStation((e.target as HTMLSelectElement).value)}
            >
              ${(this._radio?.stations ?? []).map(
                (s) => html`<option value=${s.name} ?selected=${s.name === this._stationName}>${s.name}</option>`,
              )}
            </select>
          </div>
          ${this._showEqualizer ? this._renderEqualizer() : nothing}
        </div>

        ${this._config.show_ticker === false
          ? nothing
          : html`
              <div class="ticker">
                <div class=${`ticker-track${playing && this._tickerOverflows ? " run" : ""}`}>
                  <span>${this._tickerText}</span>
                  <span aria-hidden="true">${this._tickerText}</span>
                </div>
              </div>
            `}

        <!-- Transport is the anchor: a large solid primary flanked by two ghost
             skip buttons, with volume on the same line so the card reads as one
             control cluster rather than a stack of equal-weight form rows. -->
        <div class="transport">
          <button
            class="icon"
            title="Previous station"
            ?disabled=${!this._radio?.stations.length}
            @click=${() => this._step(-1)}
          >
            ${SKIP_BACK}
          </button>
          <button
            class="icon primary"
            title=${playing ? "Stop" : "Play"}
            ?disabled=${!this._target || !this._station}
            @click=${playing ? this._stop : this._play}
          >
            ${playing ? STOP_ICON : PLAY_ICON}
          </button>
          <button
            class="icon"
            title="Next station"
            ?disabled=${!this._radio?.stations.length}
            @click=${() => this._step(1)}
          >
            ${SKIP_FWD}
          </button>

          <div class="vol">
            <!-- Inline SVG rather than an emoji: renders identically everywhere
                 and occupies a known width, so the slider always lines up. -->
            <span class="volicon" aria-hidden="true">${VOL_ICON}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              aria-label="Volume"
              .value=${String(this._volume)}
              style=${`--rad-fill:${(this._volume * 100).toFixed(1)}%`}
              ?disabled=${this._targetObj ? !this._targetObj.supports_volume : false}
              @input=${this._onVolume}
            />
            <span class="volval">${Math.round(this._volume * 100)}%</span>
          </div>
        </div>

        <!-- Where it plays is a setting, not a transport control, so it sits at
             the bottom as a borderless line rather than a second full-width
             dropdown competing with the station. -->
        ${this._config.show_target_picker === false
          ? nothing
          : html`
              <div class="foot">
                <span class="foot-icon" aria-hidden="true">${CAST_ICON}</span>
                <select
                  class="ghost"
                  aria-label="Target"
                  @change=${(e: Event) => {
                    this._target = (e.target as HTMLSelectElement).value;
                  }}
                >
                  ${(this._radio?.targets ?? []).map(
                    (t) => html`<option value=${t.entity_id} ?selected=${t.entity_id === this._target}>
                      ${t.name}${t.is_group ? " (group)" : ""}
                    </option>`,
                  )}
                </select>
              </div>
            `}
      </ha-card>
    `;
  }

  private get _showEqualizer(): boolean {
    return this._config?.show_equalizer !== false;
  }

  private _renderEqualizer(): TemplateResult {
    const bars = Math.max(3, Math.min(24, this._config?.bars ?? DEFAULT_BARS));
    if (this._phases.length !== bars) {
      // Fixed pseudo-random offsets: differing delay AND duration per bar is
      // what stops it reading as a row of metronomes.
      this._phases = Array.from({ length: bars }, (_, i) => (i * 137.508) % 100);
    }
    // Amplitude tracks the volume slider, so the control visibly does something
    // even though this is decoration, not real audio analysis (impossible here:
    // the audio is decoded on the Chromecast, never in the browser).
    const amp = 0.35 + this._volume * 0.65;
    return html`
      <div class=${`eq${this._isPlaying ? " on" : ""}`} aria-hidden="true">
        ${this._phases.map(
          (p, i) => html`<i
            style=${`animation-delay:-${p * 12}ms;animation-duration:calc(var(--rad-bar-period) * ${(
              0.7 +
              ((i * 7) % 10) / 14
            ).toFixed(2)});max-height:${(amp * 100).toFixed(0)}%`}
          ></i>`,
        )}
      </div>
    `;
  }
}

// Register with the card picker. getEntitySuggestion makes the card appear in
// HA 2026.6+'s "pick an entity first" flow.
interface CustomCardEntry {
  type: string;
  name?: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
  getEntitySuggestion?: (hass: HomeAssistant, entityId: string) => unknown;
}
const w = window as unknown as { customCards?: CustomCardEntry[] };
w.customCards = w.customCards || [];
w.customCards.push({
  type: "ha-radio-card",
  name: "HA Radio",
  description: "Internet radio with themed equalizer (companion to the HA Radio integration)",
  preview: true,
  documentationURL: "https://github.com/padlefot/ha_radio_card",
  getEntitySuggestion: (_hass, entityId) =>
    entityId === "select.ha_radio_station" ? { config: { type: "custom:ha-radio-card" } } : null,
});
