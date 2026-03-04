import { Command } from "@/lib/types";
import { commands } from "./index";

export const helpCommand: Command = {
  name: "help",
  description: "Displays a list of available commands and their descriptions.",
  execute: () => {
    return Object.values(commands).map((cmd) => ({
      id: crypto.randomUUID(),
      content: `${cmd.name.padEnd(10)} - ${cmd.description}`,
      type: "info" as const,
    }));
  },
};
