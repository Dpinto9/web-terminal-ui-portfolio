import { Command } from "@/lib/types";
import { themeState, themes, Theme } from "@/lib/themeState";

export const themeCommand: Command = {
  name: "theme",
  description: "Change terminal color theme — usage: theme <name>",
  execute: (args) => {
    const available = Object.keys(themes) as Theme[];

    if (!args[0]) {
      return [
        { id: crypto.randomUUID(), content: "Available themes:", type: "info" },
        ...available.map((t) => ({
          id: crypto.randomUUID(),
          content: `  ${t === themeState.current ? "▶" : " "} ${t}${t === themeState.current ? "  (active)" : ""}`,
          type: "text" as const,
        })),
        {
          id: crypto.randomUUID(),
          content: "Usage: theme <name>",
          type: "info",
        },
      ];
    }

    const name = args[0].toLowerCase() as Theme;
    if (!available.includes(name)) {
      return {
        id: crypto.randomUUID(),
        content: `theme: '${name}' not found. Available: ${available.join(", ")}`,
        type: "error",
      };
    }

    themeState.set(name);
    return {
      id: crypto.randomUUID(),
      content: `Theme changed to '${name}'.`,
      type: "success",
    };
  },
};
