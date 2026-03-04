import { Command } from "@/lib/types";
import { terminalState } from "@/lib/terminalState";

export const historyCommand: Command = {
  name: "history",
  description: "Show previously used commands",
  execute: () => {
    if (terminalState.cmdHistory.length === 0) {
      return {
        id: crypto.randomUUID(),
        content: "No commands in history.",
        type: "info",
      };
    }

    return terminalState.cmdHistory.map((cmd) => ({
      id: crypto.randomUUID(),
      content: cmd,
      type: "text" as const,
    }));
  },
};
