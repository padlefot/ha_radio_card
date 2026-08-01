import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { THEME_OPTIONS } from "./themes";
import type { HaRadioCardConfig, HomeAssistant } from "./types";

/**
 * Visual editor for the card.
 *
 * `static getConfigForm()` on the card class is NOT enough: HA only honours it
 * for its own built-in cards. A custom card that offers nothing but
 * getConfigForm gets "Visual editor not supported" in the UI. The supported
 * route for custom cards is `static getConfigElement()` returning an element
 * that implements `setConfig` and fires `config-changed`.
 *
 * That element still renders HA's own `ha-form` rather than hand-built
 * controls — `ha-form` is what every third-party card uses and it takes the
 * same schema, so the editor keeps working when HA restyles its internals.
 * (`ha-textfield` / `ha-select`, deprecated in 2026.4, are deliberately not
 * touched.)
 */

const SCHEMA = [
  {
    name: "theme",
    selector: { select: { mode: "dropdown", options: THEME_OPTIONS } },
  },
  { name: "target", selector: { entity: { domain: "media_player" } } },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "show_equalizer", selector: { boolean: {} } },
      { name: "show_ticker", selector: { boolean: {} } },
      { name: "show_target_picker", selector: { boolean: {} } },
      {
        name: "bars",
        selector: { number: { min: 3, max: 24, mode: "slider" } },
      },
    ],
  },
];

const LABELS: Record<string, string> = {
  theme: "Theme",
  target: "Default speaker",
  show_equalizer: "Show equalizer",
  show_ticker: "Show ticker",
  show_target_picker: "Show speaker picker",
  bars: "Equalizer bars",
};

// ha-form and ha-entity-picker are only defined once HA has opened one of its
// own card editors. Opening this card's editor first would otherwise render an
// empty box. Poking a built-in card's getConfigElement forces the chunk to
// load — the established workaround among custom cards.
export const loadHaComponents = (): void => {
  if (!customElements.get("ha-form")) {
    (
      customElements.get("hui-button-card") as unknown as {
        getConfigElement?: () => void;
      }
    )?.getConfigElement?.();
  }
  if (!customElements.get("ha-entity-picker")) {
    (
      customElements.get("hui-entities-card") as unknown as {
        getConfigElement?: () => void;
      }
    )?.getConfigElement?.();
  }
};

@customElement("ha-radio-card-editor")
export class HaRadioCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HaRadioCardConfig;

  public setConfig(config: HaRadioCardConfig): void {
    this._config = config;
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    loadHaComponents();
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <p class="hint">
        Leave <b>Theme</b> on “Use integration default” to follow the theme set
        in the HA Radio integration.
      </p>
    `;
  }

  private _valueChanged(ev: CustomEvent<{ value: HaRadioCardConfig }>): void {
    // ha-form hands back the whole data object with the edited key replaced, so
    // keys outside the schema (type, and anything hand-written in YAML) survive.
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: ev.detail.value },
        bubbles: true,
        composed: true,
      }),
    );
  }

  public static override styles = css`
    .hint {
      margin: 12px 4px 0;
      font-size: 0.8rem;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ha-radio-card-editor": HaRadioCardEditor;
  }
}
