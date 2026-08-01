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
/**
 * The theme list, in the order it is offered in the card editor.
 *
 * Kept next to the CSS it names so the two cannot drift: a theme added below
 * without a matching `:host([data-theme=…])` block would silently render as
 * Classic. The same list exists in the integration (const.py THEMES), which is
 * unavoidable — the card must be able to build its editor without a round trip
 * — so any new theme has to be added in both places.
 */
export const THEME_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "", label: "Use integration default" },
  { value: "classic", label: "Classic" },
  { value: "retro", label: "Retro" },
  { value: "eighties", label: "80s" },
  { value: "spaceage", label: "Space Age" },
  { value: "transparent", label: "Transparent" },
  { value: "transparent_dark", label: "Transparent Dark" },
  { value: "ancient", label: "Ancient" },
  { value: "steampunk", label: "Steampunk" },
  { value: "tropical", label: "Tropical" },
  { value: "arctic", label: "Arctic" },
];

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

    /* --- surfaces, lines and depth -------------------------------------
       A small elevation system rather than ad-hoc shadows. Shadows are tinted
       toward the theme's own darkness instead of pure black, and the light
       source is consistently top-left, which is what makes layered depth read
       as deliberate rather than muddy. Two shadows, not five. */
    --rad-well: rgba(0, 0, 0, 0.07);
    --rad-line: rgba(0, 0, 0, 0.13);
    --rad-line-strong: rgba(0, 0, 0, 0.26);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.16),
      inset 0 -1px 0 rgba(255, 255, 255, 0.5);
    --rad-shadow-sm: 0 1px 2px rgba(16, 20, 28, 0.18);
    --rad-shadow-md: 0 2px 4px rgba(16, 20, 28, 0.14),
      0 8px 18px rgba(16, 20, 28, 0.12);
    --rad-thumb: #ffffff;
    --rad-menu-bg: #ffffff;
    --rad-menu-fg: #1d2027;
    --rad-btn-bg: rgba(var(--rad-accent-rgb), 0.14);
    --rad-btn-fg: rgb(var(--rad-accent-rgb));
    /* Text/icon colour on a SOLID accent fill (the primary play button).
       Overridden per theme wherever the accent is light enough that white
       would be unreadable on it. */
    --rad-on-accent: #ffffff;
    /* Bands reserved for themes whose artwork runs along an edge, so a motif
       never collides with a control. */
    --rad-pad-bottom: 18px;
    --rad-pad-x: 18px;
    /* The ticker is a *display*, not a label — a monospaced, letter-spaced
       stack reads as one on every theme, the way a real tuner does. */
    --rad-ticker-font: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
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
    /* Dial faces were set in geometric sans, not typewriter type — Courier
       read as "terminal", which is the wrong decade entirely. */
    --rad-font: Optima, "Gill Sans", "Trebuchet MS", sans-serif;
    --rad-title-font: Futura, "Century Gothic", "Trebuchet MS", sans-serif;
    --rad-title-transform: uppercase;
    --rad-title-spacing: 0.14em;
    --rad-title-weight: 500;
    --rad-pad-x: 28px;
    --rad-pad-bottom: 32px;
    --rad-bar-radius: 0;
    --rad-bar-period: 1100ms;
    --rad-ticker-period: 17s;
    --rad-border: 1px solid rgba(58, 44, 26, 0.25);
    --rad-btn-bg: rgba(178, 88, 34, 0.16);
  }

  /* --- 80s: neon on deep violet, fast and glowing ------------------------- */
  :host([data-theme="eighties"]) {
    --rad-pad-bottom: 34px;
    --rad-well: rgba(0,0,0,0.36);
    --rad-line: rgba(255,47,208,0.34);
    --rad-line-strong: rgba(255,47,208,0.7);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #2a0148;
    --rad-menu-fg: #ffe9ff;
    --rad-thumb: #ffe9ff;
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
    --rad-on-accent: #04121f;
    --rad-well: rgba(0,0,0,0.34);
    --rad-line: rgba(96,205,255,0.26);
    --rad-line-strong: rgba(96,205,255,0.6);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #0d1726;
    --rad-menu-fg: #d9ecff;
    --rad-thumb: #d9ecff;
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
    --rad-well: rgba(255,255,255,0.14);
    --rad-line: rgba(255,255,255,0.24);
    --rad-line-strong: rgba(255,255,255,0.5);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #1d2027;
    --rad-menu-fg: #f0f2f6;
    --rad-thumb: #ffffff;
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
    /* Accent IS white here, so the solid primary button needs dark content. */
    --rad-on-accent: #14181f;
    --rad-btn-fg: #ffffff;
    --rad-btn-bg: rgba(255, 255, 255, 0.16);
    --rad-text-shadow: 0 1px 3px rgba(0, 0, 0, 0.65);
  }

  /* --- Ancient: parchment and faded ink ---------------------------------- */
  :host([data-theme="ancient"]) {
    --rad-pad-bottom: 34px;
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
    --rad-pad-x: 30px;
    --rad-pad-bottom: 24px;
    --rad-on-accent: #2a1a08;
    --rad-well: rgba(0,0,0,0.4);
    --rad-line: rgba(205,152,72,0.34);
    --rad-line-strong: rgba(205,152,72,0.7);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #2a1c12;
    --rad-menu-fg: #e8c88a;
    --rad-thumb: #f2dcae;
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
    --rad-pad-bottom: 36px;
    --rad-on-accent: #3d2410;
    --rad-well: rgba(0,0,0,0.28);
    --rad-line: rgba(255, 233, 130, 0.28);
    --rad-line-strong: rgba(255, 233, 130, 0.6);
    --rad-inset: inset 0 1px 2px rgba(0, 0, 0, 0.42),
      inset 0 -1px 0 rgba(255, 255, 255, 0.1);
    --rad-menu-bg: #0f3340;
    --rad-menu-fg: #fff8f0;
    --rad-thumb: #fff8f0;
    /* Dusk over water rather than a hot magenta ramp: it stays dark enough for
       white text everywhere, and gives the palm silhouettes something to be a
       silhouette *against*. The sunset is a glow in the artwork layer. */
    --rad-bg: linear-gradient(
      180deg,
      #0e2c39 0%,
      #16495a 48%,
      #35757f 76%,
      #cf7350 92%,
      #ffb066 100%
    );
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
  /* Artwork is held back where the content sits and allowed to be strong at the
     edges. This is one mask instead of ten hand-tuned positions, and it is what
     stops motifs from competing with the text they sit behind — the difference
     between "illustrated" and "cluttered". Themes that ARE their background
     (the base gradient, scanlines) are unaffected: this only masks ::before. */
  ha-card::before {
    -webkit-mask-image: radial-gradient(
      115% 90% at 50% 48%,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.45) 38%,
      rgba(0, 0, 0, 0.85) 72%,
      #000 100%
    );
    mask-image: radial-gradient(
      115% 90% at 50% 48%,
      rgba(0, 0, 0, 0.22) 0%,
      rgba(0, 0, 0, 0.45) 38%,
      rgba(0, 0, 0, 0.85) 72%,
      #000 100%
    );
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

  /* ---- Retro: an actual tabletop radio ---------------------------------
     The card IS the set: wooden cabinet sides, a tuning-dial scale with major
     and minor ticks across the top, and a perforated speaker grille along the
     bottom. Both bands sit in padding reserved by --rad-pad-x/--rad-pad-bottom,
     so they read as cabinet rather than as clutter behind the controls. */
  :host([data-theme="retro"]) ha-card::before {
    background-image:
      /* major dial ticks */
      repeating-linear-gradient(
        90deg,
        rgba(58, 44, 26, 0.6) 0 1.5px,
        transparent 1.5px 44px
      ),
      /* minor dial ticks */
        repeating-linear-gradient(
          90deg,
          rgba(58, 44, 26, 0.3) 0 1px,
          transparent 1px 11px
        ),
      /* perforated speaker grille, staggered like a real one */
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='27'%3E%3Cg fill='%233a2c1a' fill-opacity='0.42'%3E%3Ccircle cx='2.2' cy='4' r='1.5'/%3E%3Ccircle cx='6.7' cy='8.5' r='1.5'/%3E%3Ccircle cx='2.2' cy='13' r='1.5'/%3E%3Ccircle cx='6.7' cy='17.5' r='1.5'/%3E%3Ccircle cx='2.2' cy='22' r='1.5'/%3E%3C/g%3E%3C/svg%3E"),
      /* cabinet sides */
        linear-gradient(
          90deg,
          #5c3a1c 0 13px,
          rgba(120, 78, 38, 0.55) 13px 20px,
          transparent 20px
        ),
      linear-gradient(
        270deg,
        #5c3a1c 0 13px,
        rgba(120, 78, 38, 0.55) 13px 20px,
        transparent 20px
      ),
      /* paper grain */
        repeating-linear-gradient(
          96deg,
          rgba(58, 44, 26, 0.05) 0 1px,
          transparent 1px 5px
        );
    background-size:
      100% 15px,
      100% 9px,
      9px 27px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      left top 7px,
      left top 7px,
      left 24px bottom 5px,
      left,
      right,
      center;
    background-repeat: no-repeat, no-repeat, repeat-x, no-repeat, no-repeat,
      repeat;
    opacity: 0.85;
  }
  /* Red tuning needle on the dial, plus glass sheen. On ::after so the needle
     stays crisp — ::before is masked back where the content sits. */
  :host([data-theme="retro"]) ha-card::after {
    background-image: linear-gradient(
        90deg,
        transparent calc(63% - 1px),
        rgba(178, 38, 30, 0.9) calc(63% - 1px) calc(63% + 1px),
        transparent calc(63% + 1px)
      ),
      linear-gradient(118deg, rgba(255, 255, 255, 0.22) 0 20%, transparent 40%);
    background-size:
      100% 21px,
      100% 100%;
    background-position:
      left top 4px,
      center;
    background-repeat: no-repeat, no-repeat;
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
      100% 44%,
      100% 44%,
      64% 40%,
      64% 40%;
    background-position:
      bottom,
      bottom,
      bottom 6px center,
      bottom 6px center;
    opacity: 0.75;
  }
  /* Synthwave is an edge composition — the horizon must stay saturated. The
     default centre-mask would mute exactly the part that carries the theme, so
     it is replaced with a top-down one: dim behind the title, full at the sun. */
  :host([data-theme="eighties"]) ha-card::before {
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0 34%,
      #000 78%
    );
    mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25) 0 34%,
      #000 78%
    );
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
      /* A tiled field of ~20 stars at mixed sizes and brightnesses. Six lone
         radial-gradients read as dust specks on the glass; a field reads as
         sky. */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='140'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='14' cy='22' r='1.1' opacity='.9'/%3E%3Ccircle cx='47' cy='9' r='.6' opacity='.55'/%3E%3Ccircle cx='78' cy='31' r='1.4' opacity='.95'/%3E%3Ccircle cx='112' cy='16' r='.7' opacity='.6'/%3E%3Ccircle cx='150' cy='27' r='1' opacity='.8'/%3E%3Ccircle cx='168' cy='55' r='.6' opacity='.5'/%3E%3Ccircle cx='131' cy='63' r='1.2' opacity='.85'/%3E%3Ccircle cx='96' cy='72' r='.6' opacity='.5'/%3E%3Ccircle cx='60' cy='58' r='.9' opacity='.7'/%3E%3Ccircle cx='24' cy='69' r='1.3' opacity='.9'/%3E%3Ccircle cx='8' cy='104' r='.7' opacity='.6'/%3E%3Ccircle cx='42' cy='118' r='1.1' opacity='.8'/%3E%3Ccircle cx='73' cy='99' r='.6' opacity='.45'/%3E%3Ccircle cx='104' cy='126' r='1' opacity='.75'/%3E%3Ccircle cx='139' cy='108' r='.7' opacity='.55'/%3E%3Ccircle cx='163' cy='131' r='1.2' opacity='.85'/%3E%3Ccircle cx='88' cy='46' r='.5' opacity='.4'/%3E%3Ccircle cx='30' cy='42' r='.5' opacity='.4'/%3E%3Ccircle cx='120' cy='88' r='.5' opacity='.4'/%3E%3Ccircle cx='55' cy='134' r='.6' opacity='.5'/%3E%3C/g%3E%3C/svg%3E"),
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
    background-size:
      180px 140px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-repeat: repeat, no-repeat, no-repeat, no-repeat;
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
      19px 19px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      bottom 7px left 6px,
      center,
      center,
      center;
    background-repeat: repeat-x, no-repeat, no-repeat, no-repeat;
    opacity: 0.55;
  }
  /* The key is a border band, not a centre motif — keep the bottom edge crisp
     and hold the mottling back behind the text instead. */
  :host([data-theme="ancient"]) ha-card::before {
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0 60%,
      #000 88%
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0 60%, #000 88%);
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
      118px 118px,
      22px 22px,
      100% 100%,
      100% 100%,
      100% 100%;
    background-position:
      right -46px bottom -40px,
      left 6px top,
      left,
      right,
      center;
    background-repeat: no-repeat, repeat-y, no-repeat, no-repeat, repeat;
    opacity: 0.7;
  }
  /* Pipes and gear are edge furniture; the leather in the middle is all that
     should show through behind the controls. */
  :host([data-theme="steampunk"]) ha-card::before {
    -webkit-mask-image: radial-gradient(
      100% 85% at 50% 50%,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 55%,
      #000 92%
    );
    mask-image: radial-gradient(
      100% 85% at 50% 50%,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 55%,
      #000 92%
    );
  }

  /* ---- Tropical: dusk over water --------------------------------------
     Two palms in near-black silhouette along the bottom edge, a low sun and
     its reflection on the right. Silhouette-against-glow is what makes this
     read as a place; the previous version painted mid-green leaves on hot
     magenta, which read as a smudge. */
  :host([data-theme="tropical"]) ha-card::before {
    background-image:
      /* palms, bottom left — trunks curve out of the corner */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='170' height='150' viewBox='0 0 170 150'%3E%3Cg fill='%2306181d'%3E%3Cpath d='M40 150c2-40 9-68 26-96l8 4c-16 27-24 55-26 92z'/%3E%3Cpath d='M74 52C60 36 38 32 22 42c17-2 34 3 45 15z'/%3E%3Cpath d='M74 52c17-14 41-11 53 4-17-7-37-7-48 1z'/%3E%3Cpath d='M74 52C68 30 49 14 28 12c17 12 32 26 39 44z'/%3E%3Cpath d='M74 52c8-21 30-33 51-29-19 5-36 14-44 32z'/%3E%3Cpath d='M74 52c-4-22 6-41 24-49-11 15-18 31-16 50z'/%3E%3Cpath d='M126 150c1-28 5-48 13-66l6 3c-8 18-11 37-12 64z'/%3E%3Cpath d='M143 82c-11-11-27-12-38-4 12-2 25 1 32 8z'/%3E%3Cpath d='M143 82c10-11 27-11 36-2-12-3-26-2-33 4z'/%3E%3Cpath d='M143 82c-2-16 5-28 17-33-8 10-13 21-12 34z'/%3E%3C/g%3E%3C/svg%3E"),
      /* shimmer, confined to the water at the very bottom */
        repeating-linear-gradient(
          0deg,
          rgba(255, 236, 200, 0.22) 0 1px,
          transparent 1px 6px
        ),
      /* low sun, sitting on the horizon */
        radial-gradient(
          circle at 76% 92%,
          rgba(255, 246, 214, 0.95) 0 5%,
          rgba(255, 196, 122, 0.7) 5.5% 11%,
          rgba(255, 150, 96, 0.3) 12% 24%,
          transparent 28%
        );
    background-size:
      168px 148px,
      100% 15%,
      100% 100%;
    background-position:
      left -14px bottom -6px,
      bottom,
      center;
    background-repeat: no-repeat, repeat-x, no-repeat;
    opacity: 0.95;
  }
  /* Everything here is horizon composition, so hold the mask back only across
     the band of sky where the title and ticker sit. */
  :host([data-theme="tropical"]) ha-card::before {
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0 42%,
      #000 80%
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0 42%, #000 80%);
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
