import { filesystem, FSNode } from "@/lib/filesystem";
import { terminalState } from "@/lib/terminalState";

export function resolvePath(path: string): FSNode | null {
  // absolute path from ~
  const parts = path.replace(/^~\/?/, "").split("/").filter(Boolean);
  let current: FSNode = filesystem;
  for (const part of parts) {
    if (typeof current !== "object") return null;
    if (!(part in current)) return null;
    current = (current as Record<string, FSNode>)[part];
  }
  return current;
}

export function getCurrentNode(): FSNode {
  return resolvePath(terminalState.cwd) ?? filesystem;
}

export function resolveFromCwd(target: string): FSNode | null {
  if (target.startsWith("~")) return resolvePath(target);
  const base =
    terminalState.cwd === "~" ? "" : terminalState.cwd.replace(/^~\/?/, "");
  const full = base ? `${base}/${target}` : target;
  return resolvePath(full);
}

export function buildFullPath(target: string): string {
  if (target.startsWith("~")) return target;
  const base =
    terminalState.cwd === "~" ? "" : terminalState.cwd.replace(/^~\/?/, "");
  return base ? `~/${base}/${target}` : `~/${target}`;
}
