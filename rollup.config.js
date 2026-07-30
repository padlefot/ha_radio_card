import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

// Single self-contained ESM bundle. HACS does not build anything — whatever is
// committed to dist/ is what gets served — so Lit is bundled in, not external.
export default {
  input: "src/ha-radio-card.ts",
  output: {
    file: "dist/ha_radio_card.js",
    format: "es",
    sourcemap: false,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser({ format: { comments: false } }),
  ],
};
