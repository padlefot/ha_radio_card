import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { equalizerStyles, themeStyles } from "./themes";
import type {
  HaRadioCardConfig,
  HaRadioConfig,
  HomeAssistant,
  RadioTarget,
} from "./types";

const CARD_VERSION = "0.2.0";

// eslint-disable-next-line no-console
console.info(`%c HA-RADIO-CARD %c ${CARD_VERSION} `, "color:#fff;background:#03a9f4", "color:#03a9f4;background:#fff");

const DEFAULT_BARS = 7;

@customElement("ha-radio-card")
export class HaRadioCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HaRadioCardConfig;
  @state() private _radio?: HaRadioConfig;
  @state() private _target?: string;
  @state() private _volume = 0.35;
  @state() private _error?: string;

  private _unsub?: Promise<() => Promise<void>>;
  /** Bar phase offsets, generated once so the equalizer isn't a metronome. */
  private _phases: number[] = [];

  public static override styles = [
    themeStyles,
    equalizerStyles,
    css`
      ha-card {
        background: var(--rad-bg);
        color: var(--rad-fg);
        font-family: var(--rad-font);
        border: var(--rad-border);
        border-radius: var(--rad-radius);
        box-shadow: var(--rad-shadow);
        padding: 14px 16px;
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

      .titles {
        min-width: 0;
        flex: 1 1 auto;
      }

      .station {
        font-family: var(--rad-title-font);
        font-weight: var(--rad-title-weight);
        letter-spacing: var(--rad-title-spacing);
        text-transform: var(--rad-title-transform);
        font-size: 1.05rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sub {
        color: var(--rad-dim);
        font-size: 0.78rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* --- equalizer --- */
      .eq {
        display: flex;
        align-items: flex-end;
        gap: var(--rad-bar-gap);
        height: 30px;
        flex: 0 0 auto;
      }
      .eq i {
        display: block;
        width: 4px;
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
        background: var(--rad-surface);
        border: var(--rad-border);
        border-radius: 6px;
        padding: 5px 0;
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
        will-change: transform;
      }
      .ticker-track.run {
        animation: rad-marquee var(--rad-ticker-period, 14s) linear infinite;
      }
      /* Idle: no animation at all, and a little inset so the text isn't jammed
         against the fade. Freezing the animation mid-scroll instead would often
         leave the text visibly cut in half. */
      .ticker-track:not(.run) {
        transform: none;
        padding-left: 10px;
      }
      .ticker-track span {
        font-size: 0.82rem;
        letter-spacing: var(--rad-title-spacing);
        color: var(--rad-fg);
        /* Separator lives in the text, so the two copies are exactly equal
           width and translateX(-50%) loops without a jump. */
        padding-right: 3.5rem;
      }
      .ticker-track:not(.run) span + span {
        /* The duplicate is only needed for the seamless loop. */
        display: none;
      }

      /* --- controls --- */
      .row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      button.icon {
        border: none;
        cursor: pointer;
        background: var(--rad-btn-bg);
        color: var(--rad-btn-fg);
        border-radius: 999px;
        width: 40px;
        height: 40px;
        font-size: 1.1rem;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        transition: filter 150ms;
      }
      button.icon:hover:not(:disabled) {
        filter: brightness(1.15);
      }
      button.icon:disabled {
        opacity: 0.4;
        cursor: default;
      }
      button.icon.wide {
        width: auto;
        padding: 0 16px;
        gap: 6px;
      }

      select,
      input[type="range"] {
        font-family: inherit;
        color: inherit;
        accent-color: rgb(var(--rad-accent-rgb));
      }
      select {
        flex: 1 1 auto;
        min-width: 0;
        background: var(--rad-surface);
        color: var(--rad-fg);
        border: var(--rad-border);
        border-radius: 8px;
        padding: 8px 10px;
        font-size: 0.9rem;
      }
      input[type="range"] {
        flex: 1 1 auto;
        min-width: 0;
      }
      .vol {
        font-variant-numeric: tabular-nums;
        color: var(--rad-dim);
        font-size: 0.78rem;
        min-width: 2.5em;
        text-align: right;
      }

      .err {
        color: var(--error-color, #db4437);
        font-size: 0.8rem;
      }

      /* The bars are decoration; motion-sensitive users get a static shape.
         HA provides no reduced-motion helper, so this is handled here. */
      @media (prefers-reduced-motion: reduce) {
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
  public getGridOptions(): Record<string, unknown> {
    return { columns: 12, rows: 3, min_columns: 6, min_rows: 3 };
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
          <div class="titles">
            <div class="station">${this._stationName ?? "No stations configured"}</div>
            <div class="sub">
              ${this._targetObj
                ? `${this._targetObj.name}${this._targetObj.is_group ? " · group" : ""}`
                : "No target available"}
            </div>
          </div>
          ${this._showEqualizer ? this._renderEqualizer() : nothing}
        </div>

        ${this._config.show_ticker === false
          ? nothing
          : html`
              <div class="ticker">
                <div class=${`ticker-track${playing ? " run" : ""}`}>
                  <span>${this._tickerText}</span>
                  <span aria-hidden="true">${this._tickerText}</span>
                </div>
              </div>
            `}

        <div class="row">
          <button
            class="icon"
            title="Previous station"
            ?disabled=${!this._radio?.stations.length}
            @click=${() => this._step(-1)}
          >
            ⏮
          </button>
          <button
            class="icon wide"
            title=${playing ? "Stop" : "Play"}
            ?disabled=${!this._target || !this._station}
            @click=${playing ? this._stop : this._play}
          >
            ${playing ? "■" : "▶"}
          </button>
          <button
            class="icon"
            title="Next station"
            ?disabled=${!this._radio?.stations.length}
            @click=${() => this._step(1)}
          >
            ⏭
          </button>
          <select
            aria-label="Station"
            .value=${this._stationName ?? ""}
            @change=${(e: Event) => this._selectStation((e.target as HTMLSelectElement).value)}
          >
            ${(this._radio?.stations ?? []).map(
              (s) => html`<option value=${s.name} ?selected=${s.name === this._stationName}>${s.name}</option>`,
            )}
          </select>
        </div>

        ${this._config.show_target_picker === false
          ? nothing
          : html`
              <div class="row">
                <select
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

        <div class="row">
          <span aria-hidden="true">🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            aria-label="Volume"
            .value=${String(this._volume)}
            ?disabled=${this._targetObj ? !this._targetObj.supports_volume : false}
            @input=${this._onVolume}
          />
          <span class="vol">${Math.round(this._volume * 100)}%</span>
        </div>
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
      <div class="eq" aria-hidden="true">
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
  documentationURL: "http://192.168.2.6:3001/padlefot/ha_radio_card",
  getEntitySuggestion: (_hass, entityId) =>
    entityId === "select.ha_radio_station" ? { config: { type: "custom:ha-radio-card" } } : null,
});
