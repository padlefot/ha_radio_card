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

/**
 * Per-theme artwork: patterns, gradients and illustration.
 *
 * Everything is inline — CSS gradients plus SVG data-URIs — so the card stays a
 * single self-contained bundle. No external image hosts means no CORS, no DNS
 * dependency, and it renders identically offline. (Relevant here: Chromecasts
 * use Google DNS and can't resolve local hostnames, and HACS serves this file
 * straight from /hacsfiles.)
 *
 * Artwork lives on `ha-card::before` (and `::after` for overlays like scanlines
 * or vignettes) rather than being driven by a single `--rad-*` token, because
 * themes differ in the *structure* of their layers — how many, at what sizes and
 * positions — not merely in colour values. Colour and animation stay tokenised.
 *
 * Both layers are `pointer-events: none` and sit at z-index 0, with content
 * lifted to z-index 1, so decoration can never intercept clicks or bury text.
 * Opacity is kept low enough that text contrast is unaffected.
 */
export const artStyles = css`
  ha-card {
    position: relative;
    isolation: isolate;
  }
  /* Content above artwork. */
  ha-card > * {
    position: relative;
    z-index: 1;
  }
  ha-card::before,
  ha-card::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-repeat: no-repeat;
  }

  /* ---- Classic: deliberately bare -------------------------------------
     It inherits the user's HA theme so it drops into any dashboard; artwork
     would defeat that. A whisper of a sheen only. */
  :host([data-theme="classic"]) ha-card::before {
    background-image: radial-gradient(
      120% 80% at 50% -20%,
      rgba(var(--rad-accent-rgb), 0.1),
      transparent 60%
    );
  }

  /* ---- Retro: a tabletop radio ----------------------------------------
     Perforated speaker grille on the left, tuning-dial scale with tick marks
     across the top, warm wood vignette. */
  :host([data-theme="retro"]) ha-card::before {
    background-image:
      /* dial ticks */
      repeating-linear-gradient(
        90deg,
        rgba(58, 44, 26, 0.55) 0 1px,
        transparent 1px 9px
      ),
      /* grille perforations */
        radial-gradient(
          circle at center,
          rgba(58, 44, 26, 0.32) 1.1px,
          transparent 1.6px
        ),
      /* warm wood edge */
        linear-gradient(
          90deg,
          rgba(92, 58, 26, 0.35),
          transparent 18%,
          transparent 82%,
          rgba(92, 58, 26, 0.35)
        );
    background-size:
      100% 12px,
      7px 7px,
      100% 100%;
    background-position:
      left 10px,
      left 34px,
      center;
    background-repeat: no-repeat, repeat, no-repeat;
    opacity: 0.55;
  }
  /* Glass reflection across the dial. */
  :host([data-theme="retro"]) ha-card::after {
    background-image: linear-gradient(
      118deg,
      rgba(255, 255, 255, 0.28) 0 22%,
      transparent 42%
    );
  }

  /* ---- 80s: synthwave sun + perspective grid + scanlines --------------- */
  :host([data-theme="eighties"]) ha-card::before {
    background-image:
      /* horizon grid */
      repeating-linear-gradient(
        90deg,
        rgba(255, 47, 208, 0.5) 0 1px,
        transparent 1px 26px
      ),
      repeating-linear-gradient(
        0deg,
        rgba(94, 234, 255, 0.42) 0 1px,
        transparent 1px 14px
      ),
      /* banded sun */
        repeating-linear-gradient(
          0deg,
          transparent 0 6px,
          rgba(26, 0, 51, 0.85) 6px 9px
        ),
      radial-gradient(
        circle at 50% 100%,
        #ffe066 0 8%,
        #ff2fd0 9% 34%,
        transparent 35%
      );
    background-size:
      100% 46%,
      100% 46%,
      70% 46%,
      70% 46%;
    background-position:
      bottom,
      bottom,
      bottom center,
      bottom center;
    opacity: 0.5;
  }
  :host([data-theme="eighties"]) ha-card::after {
    background-image: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.16) 0 1px,
      transparent 1px 3px
    );
  }

  /* ---- Space Age: starfield, nebula, planet limb ----------------------- */
  :host([data-theme="spaceage"]) ha-card::before {
    background-image:
      radial-gradient(circle at 12% 22%, #ffffff 0.9px, transparent 1.2px),
      radial-gradient(circle at 31% 66%, #ffffff 0.7px, transparent 1px),
      radial-gradient(circle at 58% 14%, #ffffff 1px, transparent 1.3px),
      radial-gradient(circle at 76% 48%, #ffffff 0.8px, transparent 1.1px),
      radial-gradient(circle at 88% 78%, #ffffff 0.9px, transparent 1.2px),
      radial-gradient(circle at 44% 88%, #ffffff 0.7px, transparent 1px),
      /* nebula */
        radial-gradient(
          60% 50% at 78% 18%,
          rgba(96, 205, 255, 0.28),
          transparent 70%
        ),
      radial-gradient(
        55% 45% at 18% 82%,
        rgba(168, 96, 255, 0.24),
        transparent 70%
      ),
      /* planet limb, bottom right */
        radial-gradient(
          circle at 118% 128%,
          rgba(96, 205, 255, 0.5) 0 22%,
          rgba(10, 20, 40, 0.9) 22.6% 30%,
          transparent 31%
        );
  }

  /* ---- Transparent pair: nothing, by definition ------------------------ */
  :host([data-theme="transparent"]) ha-card::before,
  :host([data-theme="transparent"]) ha-card::after,
  :host([data-theme="transparent_dark"]) ha-card::before,
  :host([data-theme="transparent_dark"]) ha-card::after {
    background-image: none;
  }

  /* ---- Ancient: parchment mottling + Greek key border ------------------ */
  :host([data-theme="ancient"]) ha-card::before {
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M4 34V10h26v18H14v-9h11' fill='none' stroke='%234a3a22' stroke-width='3'/%3E%3C/svg%3E"),
      radial-gradient(
        45% 40% at 20% 25%,
        rgba(140, 100, 45, 0.22),
        transparent 70%
      ),
      radial-gradient(
        50% 45% at 82% 70%,
        rgba(120, 84, 38, 0.2),
        transparent 70%
      ),
      radial-gradient(
        35% 30% at 60% 12%,
        rgba(90, 62, 28, 0.16),
        transparent 70%
      );
    background-size:
      26px 26px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      bottom left,
      center,
      center,
      center;
    background-repeat: repeat-x, no-repeat, no-repeat, no-repeat;
    opacity: 0.5;
  }

  /* ---- Steampunk: brass pipes, rivets and a gear ----------------------- */
  :host([data-theme="steampunk"]) ha-card::before {
    background-image:
      /* gear, bottom right */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23cd9848'%3E%3Crect x='45' y='1' width='10' height='16' rx='2'/%3E%3Crect x='45' y='83' width='10' height='16' rx='2'/%3E%3Crect x='1' y='45' width='16' height='10' rx='2'/%3E%3Crect x='83' y='45' width='16' height='10' rx='2'/%3E%3Crect x='45' y='1' width='10' height='16' rx='2' transform='rotate(45 50 50)'/%3E%3Crect x='45' y='83' width='10' height='16' rx='2' transform='rotate(45 50 50)'/%3E%3Crect x='1' y='45' width='16' height='10' rx='2' transform='rotate(45 50 50)'/%3E%3Crect x='83' y='45' width='16' height='10' rx='2' transform='rotate(45 50 50)'/%3E%3C/g%3E%3Ccircle cx='50' cy='50' r='33' fill='none' stroke='%23cd9848' stroke-width='8'/%3E%3Ccircle cx='50' cy='50' r='11' fill='none' stroke='%23cd9848' stroke-width='7'/%3E%3C/svg%3E"),
      /* rivets down both pipes */
        radial-gradient(
          circle,
          rgba(232, 200, 138, 0.55) 1.6px,
          transparent 2.1px
        ),
      /* left + right pipes with brass sheen */
        linear-gradient(
          90deg,
          rgba(80, 54, 28, 0.9) 0 4px,
          rgba(205, 152, 72, 0.85) 4px 9px,
          rgba(247, 222, 170, 0.9) 9px 12px,
          rgba(150, 104, 46, 0.85) 12px 18px,
          rgba(70, 46, 24, 0.9) 18px 22px,
          transparent 22px
        ),
      linear-gradient(
        270deg,
        rgba(80, 54, 28, 0.9) 0 4px,
        rgba(205, 152, 72, 0.85) 4px 9px,
        rgba(247, 222, 170, 0.9) 9px 12px,
        rgba(150, 104, 46, 0.85) 12px 18px,
        rgba(70, 46, 24, 0.9) 18px 22px,
        transparent 22px
      ),
      /* leather grain */
        repeating-linear-gradient(
          32deg,
          rgba(0, 0, 0, 0.12) 0 2px,
          transparent 2px 6px
        );
    background-size:
      92px 92px,
      22px 22px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      right -18px bottom -18px,
      left 5px top,
      left,
      right,
      center;
    background-repeat: no-repeat, repeat-y, no-repeat, no-repeat, repeat;
    opacity: 0.62;
  }

  /* ---- Tropical: sun, palms and a monstera leaf ------------------------ */
  :host([data-theme="tropical"]) ha-card::before {
    background-image:
      /* palms, bottom left */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Cg fill='%23123b2a'%3E%3Cpath d='M62 150c1-42 5-72 12-100l7 2c-8 28-12 58-13 98z'/%3E%3Cpath d='M76 48c-16-13-36-12-48 0 15-4 31-2 42 7z'/%3E%3Cpath d='M76 48c15-13 37-10 47 3-15-6-32-6-42 2z'/%3E%3Cpath d='M76 48c-10-18-29-27-46-24 15 7 29 17 37 30z'/%3E%3Cpath d='M76 48c11-17 32-22 49-15-16 2-32 8-41 20z'/%3E%3Cpath d='M76 48c-4-20 4-37 19-45-8 14-13 29-12 46z'/%3E%3Cpath d='M118 150c1-30 4-52 9-72l6 2c-6 20-9 42-10 70z'/%3E%3Cpath d='M129 80c-12-10-27-9-36 0 11-3 23-1 31 5z'/%3E%3Cpath d='M129 80c11-10 27-8 35 2-11-4-24-4-31 2z'/%3E%3Cpath d='M129 80c-3-15 3-27 14-33-6 10-10 21-9 34z'/%3E%3C/g%3E%3C/svg%3E"),
      /* monstera leaf, top right */
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cg fill='%23145c3a'%3E%3Cpath d='M60 8c30 0 52 24 52 54 0 28-22 50-52 50S8 90 8 62C8 32 30 8 60 8zm0 10c-8 12-8 26-8 44 0 18 0 32 8 44 8-12 8-26 8-44 0-18 0-32-8-44z'/%3E%3C/g%3E%3C/svg%3E"),
      /* sun */
        radial-gradient(
          circle at 82% 16%,
          rgba(255, 233, 130, 0.85) 0 6%,
          rgba(255, 233, 130, 0.35) 7% 12%,
          transparent 13%
        ),
      /* water shimmer */
        repeating-linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.1) 0 1px,
          transparent 1px 7px
        );
    background-size:
      140px 140px,
      86px 86px,
      100% 100%,
      100% 100%;
    background-position:
      left -14px bottom -10px,
      right -22px top -26px,
      center,
      bottom;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    opacity: 0.5;
  }

  /* ---- Arctic: snowflakes, frost and aurora ---------------------------- */
  :host([data-theme="arctic"]) ha-card::before {
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60' stroke='%23ffffff' stroke-width='2.4' stroke-linecap='round' fill='none'%3E%3Cpath d='M30 8v44M11 19l38 22M49 19L11 41'/%3E%3Cpath d='M30 15l-5 5m5-5l5 5m-5 30l-5-5m5 5l5-5M17 22l1 7m-1-7l-7 1m36 15l-1-7m1 7l7-1M17 38l-7-1m7 1l1 7m26-23l7 1m-7-1l-1-7'/%3E%3C/svg%3E"),
      /* aurora */
        radial-gradient(
          70% 40% at 25% -8%,
          rgba(120, 230, 200, 0.32),
          transparent 70%
        ),
      radial-gradient(
        60% 38% at 78% -4%,
        rgba(140, 180, 255, 0.3),
        transparent 70%
      ),
      /* frost at the corners */
        radial-gradient(
          40% 40% at 0% 100%,
          rgba(255, 255, 255, 0.55),
          transparent 70%
        ),
      radial-gradient(
        35% 35% at 100% 0%,
        rgba(255, 255, 255, 0.5),
        transparent 70%
      );
    background-size:
      54px 54px,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      right 12px top 10px,
      center,
      center,
      center,
      center;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;
    opacity: 0.6;
  }
`;
