// Bundle the entry into one ESM file, since a home deploys a plugin as a single
// plugin/<id>.js. Shared libraries stay external: the plugin manager materialises them under
// plugin/node_modules, so every plugin in a home runs one copy instead of carrying its own.
import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  outfile: "dist/index.js",
  external: ["@intisy-ai/basekit", "@intisy/bayonet"],
  logLevel: "info",
});

console.log("Bundled stub-plugin -> dist/index.js");
