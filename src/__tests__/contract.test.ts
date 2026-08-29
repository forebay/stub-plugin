// Universal plugin contract (shared across the ecosystem via basekit's test-kit): the
// /<plugin>-config CLI round-trips, the slash-commands deploy, and each action command runs
// cleanly, all in isolated temp homes that never touch the real ~/.claude or ~/.config/opencode.
import { runPluginContract } from "@intisy-ai/basekit/testing";

runPluginContract({
  name: "stub-plugin",
  entry: "dist/index.js",
  configName: "stub-plugin",
  app: "both",
  deploy: "load",
  readme: true,
});
