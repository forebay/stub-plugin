import type { Plugin, PluginContext } from "@intisy-ai/api";
import type { ActionResult, SettingsCapability } from "@intisy-ai/core";
import { STUB_SETTINGS } from "./settings.js";

const PLUGIN_ID = "stub-plugin";

/**
 * This plugin's `settings` capability: the fields `./settings.js` declares, and one action that
 * proves an action reaches the plugin and can answer.
 *
 * @remarks
 * The capability is reached through {@link PluginContext.capability} by NAME rather than by
 * importing a key from the library that mints it. That is what keeps this module's only runtime
 * import the api itself, which `plugin-linkage-check` holds every plugin to: `SettingsCapability`
 * above is a TYPE-only import and erases at build time.
 */
export function stubSettings(): SettingsCapability {
  return {
    schema: () => STUB_SETTINGS,
    run: async (actionId: string): Promise<ActionResult> => (actionId === "greet"
      ? { ok: true, message: `${PLUGIN_ID} says hello` }
      : { ok: false, message: `${PLUGIN_ID} declares no action "${actionId}"` }),
  };
}

const plugin: Plugin = {
  activate(context: PluginContext) {
    context.provide(context.capability<SettingsCapability>("settings"), stubSettings());
  },
  deactivate() {},
};

/**
 * What an in-process host loads.
 *
 * @remarks
 * `activate` is the whole contract. A host calls it once, under its own deadline, and everything
 * the plugin offers is registered through the context it is handed rather than exported.
 *
 * The comment sits HERE rather than on the const above, because `export default plugin` is itself
 * an exported declaration and is what a reader of the surface lands on. A doc comment on a private
 * const does not reach it, which is what `guardDocumentation` reports.
 */
export default plugin;
