import { Command } from "@/lib/types";
import { FSNode } from "@/lib/filesystem";
import { getCurrentNode } from "@/lib/fsUtils";
import { terminalState } from "@/lib/terminalState";

function buildTree(node: Record<string, FSNode>, prefix = ""): string[] {
  const entries = Object.entries(node);
  const lines: string[] = [];

  entries.forEach(([name, value], index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPrefix = isLast ? "\u00A0\u00A0\u00A0" : "\u200A\u200A│   ";

    const isDir =
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length > 0;

    lines.push(`${prefix}${connector}${name}${isDir ? "/" : ""}`);

    if (isDir) {
      lines.push(
        ...buildTree(value as Record<string, FSNode>, prefix + childPrefix),
      );
    }
  });

  return lines;
}

export const treeCommand: Command = {
  name: "tree",
  description: "Show directory tree from current location",
  execute: () => {
    const node = getCurrentNode();

    if (typeof node !== "object") {
      return {
        id: crypto.randomUUID(),
        content: "tree: not a directory",
        type: "error",
      };
    }

    const lines = [
      terminalState.cwd,
      ...buildTree(node as Record<string, FSNode>),
    ];
    return lines.map((line) => ({
      id: crypto.randomUUID(),
      content: line,
      type: "text" as const,
    }));
  },
};
