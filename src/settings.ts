import type { CapabilitySchema } from "@intisy-ai/core";

/** The plugin's own name, which is also its config file's basename and its deployed bundle's. */
export const PLUGIN_NAME = "stub-plugin";

/**
 * Every setting this plugin has, and the value each starts at.
 *
 * @remarks
 * Registered rather than written: `defineConfig` creates NO file, so a config file appears only
 * once a value is actually changed. `logging` is the one setting every plugin in this ecosystem
 * carries, and it defaults on.
 */
export const STUB_DEFAULTS: Record<string, unknown> = {
  logging: true,
  greeting: "hello",
};

/**
 * The settings surface a host renders.
 *
 * @remarks
 * Its field keys are the keys of {@link STUB_DEFAULTS}, because a field a host can set but the
 * plugin has no default for reads as empty until someone sets it, and a default the surface never
 * shows can never be changed.
 */
export const STUB_SETTINGS: CapabilitySchema = {
  fields: [
    { key: "logging", type: "boolean", label: "Write a log file" },
    { key: "greeting", type: "string", label: "What the greet action says" },
  ],
  actions: [{ id: "greet", label: "Say hello", description: "Answers with the configured greeting." }],
};
