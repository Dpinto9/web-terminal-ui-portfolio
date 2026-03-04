import { Command } from "@/lib/types";
import { terminalState } from "@/lib/terminalState";
import { resolveFromCwd, buildFullPath } from "@/lib/fsUtils";

export const cdCommand: Command = {
  name: "cd",
  description: "Change directory — usage: cd <folder>",
  execute: (args) => {
    const target = args[0];

    if (!target || target === "~") {
      terminalState.setCwd("~");
      return { id: crypto.randomUUID(), content: "", type: "text" };
    }

    if (target === "..") {
      if (terminalState.cwd === "~") {
        return {
          id: crypto.randomUUID(),
          content: "cd: already at root",
          type: "error",
        };
      }
      const parts = terminalState.cwd
        .replace(/^~\/?/, "")
        .split("/")
        .filter(Boolean);
      parts.pop();
      terminalState.setCwd(parts.length === 0 ? "~" : `~/${parts.join("/")}`);
      return { id: crypto.randomUUID(), content: "", type: "text" };
    }

    const node = resolveFromCwd(target);

    if (!node) {
      return {
        id: crypto.randomUUID(),
        content: `cd: ${target}: No such file or directory`,
        type: "error",
      };
    }

    if (typeof node !== "object") {
      return {
        id: crypto.randomUUID(),
        content: `cd: ${target}: Not a directory`,
        type: "error",
      };
    }

    const isSecret = buildFullPath(target).includes("secret");
    if (isSecret && !terminalState.isRoot) {
      return {
        id: crypto.randomUUID(),
        content: `cd: ${target}: Permission denied. Try: sudo access`,
        type: "error",
      };
    }

    terminalState.setCwd(buildFullPath(target));
    return { id: crypto.randomUUID(), content: "", type: "text" };
  },
};
