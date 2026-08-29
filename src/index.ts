import { defineConfig, defineReadme, makeWriteLog, maybeRunConfigCli } from "@intisy-ai/basekit";
import plugin, { stubSettings } from "./plugin.js";
import { PLUGIN_NAME, STUB_DEFAULTS } from "./settings.js";

defineReadme({
  description:
    "The reference plugin: the smallest thing that is a real plugin rather than a no-op, kept green "
    + "against every ecosystem gate so a new plugin can start from something that already passes.",
  architecture: `flowchart TD
    HOST[Any api host] -->|import dist/index.js| ENTRY[index.ts]
    ENTRY -->|default export| PLUGIN[plugin.ts: api-only]
    PLUGIN -->|ctx.provide| SETTINGS[settings capability]
    ENTRY -->|node dist/index.js config| CLI[basekit config CLI]
    CLI --> FILE["config/stub-plugin.json (written only on a change)"]`,
  structure: {
    src: [
      "`plugin.ts`: the api plugin a host loads. Its only runtime import is the api.",
      "`settings.ts`: the settings this plugin declares, and the value each starts at.",
      "`index.ts`: the entry a host imports, which also carries the config CLI.",
    ],
    dist: ["`index.js`: the esbuild bundle `plugin.json` points a host at."],
  },
  commands: [
    { name: "stub-plugin-config", description: "View and change stub-plugin configuration." },
  ],
  dependencies: ["api", "basekit"],
});

/**
 * Writes one diagnostic line, honouring this plugin's own `logging` setting.
 *
 * @remarks
 * Routed through basekit rather than hand-rolled, so this plugin's log lands where every other
 * plugin's does and the global console toggle reaches it.
 */
export const writeLog = makeWriteLog(PLUGIN_NAME);

// Registered BEFORE the CLI guard below, so `config schema` can answer even when this process
// exists only to serve that one command.
defineConfig(PLUGIN_NAME, STUB_DEFAULTS);

if (maybeRunConfigCli(PLUGIN_NAME)) {
  // The process was started to serve the config CLI, which has already answered and exited.
}

export { stubSettings };

/** The api plugin a host loads, re-exported so `plugin.json`'s entry carries it. */
export default plugin;
