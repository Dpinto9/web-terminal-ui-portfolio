import { Command } from "@/lib/types";
import { getCurrentNode } from "@/lib/fsUtils";
import { FSNode } from "@/lib/filesystem";

export const lsCommand: Command = {
  name: "ls",
  description: "List files in the current directory",
  execute: () => {
    const node = getCurrentNode();

    if (typeof node !== "object") {
      return {
        id: crypto.randomUUID(),
        content: "ls: not a directory",
        type: "error",
      };
    }

    return Object.entries(node as Record<string, FSNode>).map(
      ([name, value]) => ({
        id: crypto.randomUUID(),
        content: typeof value === "object" ? `📁 ${name}/` : `📄 ${name}`,
        type: "text" as const,
      }),
    );
  },
};
