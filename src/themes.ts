import { css } from "lit";

/**
 * All themes in ONE stylesheet.
 *
 * Lit uses constructable stylesheets, so this is parsed once per element class
 * no matter how many cards are on screen — switching theme is a single
 * attribute write, not a re-parse. Ten duplicated class blocks (or ten runtime
 * CSS fetches) would cost far more for no benefit.
 *
 * Conventions borrowed from Mushroom, which is the best-behaved card in this
 * space:
 *   - every token namespaced `--rad-*`
 *   - colours as RGB *triplets*, consumed via rgb()/rgba(), so glows, tints and
 *     disabled states all derive from one value
 *   - always `var(--rad-x, <fallback>)` and never `!important`, so a user can
 *     still override anything from card-mod or an HA theme file
 *
 * Per-theme variation goes through tokens (`--rad-eq-anim`, `--rad-bar-period`,
 * …) so there is ONE animation code path rather than ten.
 */
export const themeStyles = css`
  :host {
    /* Classic — inherits the user's HA theme so it fits any dashboard. */
    --rad-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --rad-fg: var(--primary-text-color, #212121);
    --rad-dim: var(--secondary-text-color, #727272);
    --rad-accent-rgb: var(--rgb-accent-color, 3, 169, 244);
    --rad-surface: rgba(var(--rad-accent-rgb), 0.08);
    --rad-radius: var(--ha-card-border-radius, 12px);
    --rad-font: inherit;
    --rad-title-font: inherit;
    --rad-title-weight: 600;
    --rad-title-spacing: normal;
    --rad-title-transform: none;
    --rad-glow: none;
    --rad-bar-radius: 2px;
    --rad-bar-period: 900ms;
    --rad-bar-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --rad-bar-gap: 3px;
    --rad-eq-anim: rad-bounce;
    --rad-ticker-period: 14s;
    --rad-btn-bg: rgba(var(--rad-accent-rgb), 0.14);
    --rad-btn-fg: rgb(var(--rad-accent-rgb));
    --rad-border: none;
    --rad-shadow: none;
  }

  /* --- Retro: warm paper, slab type, square bars -------------------------- */
  :host([data-theme="retro"]) {
    --rad-bg: linear-gradient(170deg, #e8d9b5 0%, #d4c19a 100%);
    --rad-fg: #3a2c1a;
    --rad-dim: #7a6647;
    --rad-accent-rgb: 178, 88, 34;
    --rad-surface: rgba(58, 44, 26, 0.08);
    --rad-font: "Courier New", Courier, monospace;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.08em;
    --rad-bar-radius: 0;
    --rad-bar-period: 1100ms;
    --rad-ticker-period: 17s;
    --rad-border: 1px solid rgba(58, 44, 26, 0.25);
    --rad-btn-bg: rgba(178, 88, 34, 0.16);
  }

  /* --- 80s: neon on deep violet, fast and glowing ------------------------- */
  :host([data-theme="eighties"]) {
    --rad-bg: linear-gradient(160deg, #1a0033 0%, #35006b 60%, #4a007d 100%);
    --rad-fg: #ffe9ff;
    --rad-dim: #c39bd8;
    --rad-accent-rgb: 255, 47, 208;
    --rad-surface: rgba(255, 47, 208, 0.12);
    --rad-glow: 0 0 6px rgba(var(--rad-accent-rgb), 0.9),
      0 0 16px rgba(var(--rad-accent-rgb), 0.45);
    --rad-bar-period: 620ms;
    --rad-ticker-period: 9s;
    --rad-bar-radius: 1px;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.12em;
    --rad-shadow: inset 0 0 40px rgba(255, 47, 208, 0.12);
  }

  /* --- Space Age: cold blue, slow drifting bars --------------------------- */
  :host([data-theme="spaceage"]) {
    --rad-bg: radial-gradient(circle at 25% 15%, #16283f 0%, #070d17 70%);
    --rad-fg: #d9ecff;
    --rad-dim: #7b93ad;
    --rad-accent-rgb: 96, 205, 255;
    --rad-surface: rgba(96, 205, 255, 0.1);
    --rad-glow: 0 0 10px rgba(var(--rad-accent-rgb), 0.7);
    --rad-bar-period: 1500ms;
    --rad-ticker-period: 20s;
    --rad-bar-ease: ease-in-out;
    --rad-bar-radius: 6px;
    --rad-eq-anim: rad-drift;
  }

  /* --- Transparent pair --------------------------------------------------- */
  /* The classic failure here is unreadable text over an unknown background, so
     the dark variant sets an EXPLICIT colour rather than inheriting
     --primary-text-color, which flips with the user's HA theme. */
  :host([data-theme="transparent"]),
  :host([data-theme="transparent_dark"]) {
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    --ha-card-border-width: 0;
    --rad-bg: transparent;
    --rad-surface: rgba(128, 128, 128, 0.12);
    --rad-shadow: none;
  }
  :host([data-theme="transparent_dark"]) {
    --rad-fg: #ffffff;
    --rad-dim: rgba(255, 255, 255, 0.72);
    --rad-accent-rgb: 255, 255, 255;
    --rad-btn-fg: #ffffff;
    --rad-btn-bg: rgba(255, 255, 255, 0.16);
    --rad-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
  }

  /* --- Ancient: parchment and faded ink ---------------------------------- */
  :host([data-theme="ancient"]) {
    --rad-bg: linear-gradient(175deg, #efe4cc 0%, #ddcdab 100%);
    --rad-fg: #4a3a22;
    --rad-dim: #8a7550;
    --rad-accent-rgb: 140, 100, 45;
    --rad-surface: rgba(74, 58, 34, 0.09);
    --rad-font: Georgia, "Times New Roman", serif;
    --rad-title-font: Georgia, "Times New Roman", serif;
    --rad-title-spacing: 0.06em;
    --rad-bar-period: 1700ms;
    --rad-ticker-period: 24s;
    --rad-bar-radius: 1px;
    --rad-border: 1px solid rgba(74, 58, 34, 0.3);
    --rad-eq-anim: rad-drift;
  }

  /* --- Steampunk: brass on leather --------------------------------------- */
  :host([data-theme="steampunk"]) {
    --rad-bg: linear-gradient(165deg, #3a2a1c 0%, #241811 100%);
    --rad-fg: #e8c88a;
    --rad-dim: #a8845a;
    --rad-accent-rgb: 205, 152, 72;
    --rad-surface: rgba(205, 152, 72, 0.12);
    --rad-font: Georgia, serif;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.1em;
    --rad-glow: 0 0 6px rgba(var(--rad-accent-rgb), 0.5);
    --rad-bar-period: 1300ms;
    --rad-bar-radius: 0;
    --rad-border: 1px solid rgba(205, 152, 72, 0.35);
    --rad-shadow: inset 0 0 30px rgba(0, 0, 0, 0.5);
  }

  /* --- Tropical: sunset coral / teal ------------------------------------- */
  :host([data-theme="tropical"]) {
    --rad-bg: linear-gradient(150deg, #ff8a5c 0%, #ff5f7e 45%, #7a4bd6 100%);
    --rad-fg: #fff8f0;
    --rad-dim: rgba(255, 248, 240, 0.78);
    --rad-accent-rgb: 255, 233, 130;
    --rad-surface: rgba(255, 255, 255, 0.16);
    --rad-glow: 0 0 8px rgba(var(--rad-accent-rgb), 0.6);
    --rad-bar-period: 750ms;
    --rad-ticker-period: 11s;
    --rad-bar-radius: 999px;
    --rad-btn-bg: rgba(255, 255, 255, 0.22);
    --rad-btn-fg: #fff8f0;
    --rad-text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  }

  /* --- Arctic: pale ice, crisp and quiet --------------------------------- */
  :host([data-theme="arctic"]) {
    --rad-bg: linear-gradient(170deg, #f2f8fc 0%, #d8e9f4 100%);
    --rad-fg: #17394f;
    --rad-dim: #5b7b90;
    --rad-accent-rgb: 60, 150, 200;
    --rad-surface: rgba(23, 57, 79, 0.07);
    --rad-bar-period: 1600ms;
    --rad-bar-ease: ease-in-out;
    --rad-bar-radius: 999px;
    --rad-border: 1px solid rgba(23, 57, 79, 0.14);
    --rad-eq-anim: rad-drift;
  }
`;

/**
 * Keyframes are separate only for readability — they end up in the same
 * constructable stylesheet.
 *
 * scaleY() is animated rather than height: transform is GPU-composited, so
 * there is no layout or paint per frame. Animating height would relayout the
 * card ~60x/sec, which is the classic way to make a Lovelace dashboard stutter.
 */
export const equalizerStyles = css`
  @keyframes rad-bounce {
    from {
      transform: scaleY(0.12);
    }
    to {
      transform: scaleY(1);
    }
  }

  /* Ticker. Translating a track that holds two identical copies of the text by
     exactly -50% loops seamlessly with no jump. transform only, so it stays
     GPU-composited like the bars. */
  @keyframes rad-marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  /* Gentler, less metronomic — used by the calmer themes. */
  @keyframes rad-drift {
    0% {
      transform: scaleY(0.25);
    }
    40% {
      transform: scaleY(0.85);
    }
    70% {
      transform: scaleY(0.45);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;
