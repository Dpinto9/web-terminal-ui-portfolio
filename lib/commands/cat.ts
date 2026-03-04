import { Command } from "@/lib/types";
import { resolveFromCwd } from "@/lib/fsUtils";

export const catCommand: Command = {
  name: "cat",
  description: "Display file contents — usage: cat <file>",
  execute: (args) => {
    if (!args[0]) {
      return {
        id: crypto.randomUUID(),
        content: "Usage: cat <filename>",
        type: "error",
      };
    }

    const node = resolveFromCwd(args[0]);

    if (node === null) {
      return {
        id: crypto.randomUUID(),
        content: `cat: ${args[0]}: No such file or directory`,
        type: "error",
      };
    }

    if (typeof node === "object") {
      return {
        id: crypto.randomUUID(),
        content: `cat: ${args[0]}: Is a directory`,
        type: "error",
      };
    }

    if (node === "__protected__") {
      return {
        id: crypto.randomUUID(),
        content: `cat: ${args[0]}: Permission denied. Try: sudo cat ${args[0]}`,
        type: "error",
      };
    }

    return node.split("\n").map((line) => ({
      id: crypto.randomUUID(),
      content: line,
      type: "text" as const,
    }));
  },
};
