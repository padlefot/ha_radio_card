/**
 * Minimal HA typings.
 *
 * Deliberately vendored rather than depending on `custom-card-helpers`, which
 * lags HA's own types. Only what this card actually touches is declared.
 */

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  callService(
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ): Promise<unknown>;
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(
      cb: (msg: T) => void,
      msg: Record<string, unknown>,
    ): Promise<() => Promise<void>>;
  };
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

/** Card-level options. Note `theme` is NOT here — it comes from the integration. */
export interface HaRadioCardConfig extends LovelaceCardConfig {
  /** Pre-select a target so the card opens ready to play. */
  target?: string;
  /** Number of equalizer bars. */
  bars?: number;
  /** Force the equalizer off regardless of the theme. */
  show_equalizer?: boolean;
  /** Hide the target picker (useful on a single-room dashboard). */
  show_target_picker?: boolean;
}

export interface Station {
  name: string;
  url: string;
  logo: string | null;
  mime: string;
}

export interface RadioTarget {
  entity_id: string;
  name: string;
  platform: string;
  supports_volume: boolean;
  is_group: boolean;
}

/** Payload of the `ha_radio/config` websocket command. */
export interface HaRadioConfig {
  version: string;
  ready: boolean;
  theme: string;
  default_volume?: number;
  stations: Station[];
  targets: RadioTarget[];
  current_station?: string | null;
  current_target?: string | null;
  select_entity?: string;
}
