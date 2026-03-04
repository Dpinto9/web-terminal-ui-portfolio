import React, { useState } from "react";
import { Command } from "@/lib/types";
import { PROTECTED_CONTENT, filesystem, FSNode } from "@/lib/filesystem";
import { terminalState } from "@/lib/terminalState";

const SUDO_PASSWORD = "admin123";

function resolvePath(path: string): FSNode | null {
  const parts = path.replace(/^~\//, "").split("/").filter(Boolean);
  let current: FSNode = filesystem;
  for (const part of parts) {
    if (typeof current !== "object") return null;
    if (!(part in current)) return null;
    current = (current as Record<string, FSNode>)[part];
  }
  return current;
}

function SudoPrompt({
  subcommand,
  args,
}: {
  subcommand: string;
  args: string[];
}) {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<
    { text: string; color: string }[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    setSubmitted(true);

    if (password !== SUDO_PASSWORD) {
      setError("sudo: incorrect password");
      return;
    }

    // sudo access — grant root session
    if (subcommand === "access") {
      terminalState.setRoot(true);
      setResult([
        { text: "Password accepted.", color: "text-green-400" },
        {
          text: "Root access granted. You are now operating as admin.",
          color: "text-green-400",
        },
        {
          text: "Type 'sudo logoff' to end the session.",
          color: "text-yellow-400",
        },
      ]);
      return;
    }

    // sudo cat
    if (subcommand === "cat") {
      const file = args[0];
      if (!file) {
        setError("Usage: sudo cat <file>");
        return;
      }

      const protectedKey = file.replace(/^~\//, "");
      if (PROTECTED_CONTENT[protectedKey]) {
        setResult(
          PROTECTED_CONTENT[protectedKey].split("\n").map((line) => ({
            text: line,
            color: "text-green-400",
          })),
        );
        return;
      }

      const node = resolvePath(file);
      if (!node) {
        setError(`sudo: cat: ${file}: No such file or directory`);
        return;
      }
      if (typeof node === "object") {
        setError(`sudo: cat: ${file}: Is a directory`);
        return;
      }

      setResult(
        node
          .split("\n")
          .map((line) => ({ text: line, color: "text-gray-200" })),
      );
      return;
    }

    setError(`sudo: ${subcommand}: command not found`);
  }

  return (
    <div className="flex flex-col gap-1 font-mono text-sm">
      {!submitted && (
        <div className="flex items-center gap-2 text-yellow-400">
          <span>[sudo] password:</span>
          <input
            autoFocus
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleSubmit}
            className="bg-transparent outline-none text-gray-200 caret-yellow-400 w-32"
          />
        </div>
      )}
      {error && <span className="text-red-400">{error}</span>}
      {result?.map((line, i) => (
        <span key={i} className={line.color}>
          {line.text}
        </span>
      ))}
    </div>
  );
}

export const sudoCommand: Command = {
  name: "sudo",
  description: "Execute a command as admin — usage: sudo <command> [args]",
  execute: (args) => {
    if (!args[0]) {
      return {
        id: crypto.randomUUID(),
        content: "Usage: sudo <command> [args]",
        type: "error",
      };
    }

    const [subcommand, ...rest] = args;

    // logoff — no password needed
    if (subcommand === "exit" || subcommand === "logoff") {
      if (!terminalState.isRoot) {
        return {
          id: crypto.randomUUID(),
          content: "sudo: no active session to log off.",
          type: "error",
        };
      }
      terminalState.setRoot(false);
      return {
        id: crypto.randomUUID(),
        content: "Root session ended. Logged off.",
        type: "info",
      };
    }

    // if already root, skip password prompt
    if (terminalState.isRoot) {
      if (subcommand === "cat") {
        const file = rest[0];
        if (!file)
          return {
            id: crypto.randomUUID(),
            content: "Usage: sudo cat <file>",
            type: "error",
          };

        const protectedKey = file.replace(/^~\//, "");
        if (PROTECTED_CONTENT[protectedKey]) {
          return PROTECTED_CONTENT[protectedKey].split("\n").map((line) => ({
            id: crypto.randomUUID(),
            content: line,
            type: "success" as const,
          }));
        }

        const node = resolvePath(file);
        if (!node)
          return {
            id: crypto.randomUUID(),
            content: `cat: ${file}: No such file or directory`,
            type: "error",
          };
        if (typeof node === "object")
          return {
            id: crypto.randomUUID(),
            content: `cat: ${file}: Is a directory`,
            type: "error",
          };
        return node.split("\n").map((line) => ({
          id: crypto.randomUUID(),
          content: line,
          type: "text" as const,
        }));
      }

      return {
        id: crypto.randomUUID(),
        content: `Already root. Running: ${subcommand}`,
        type: "info",
      };
    }

    return {
      id: crypto.randomUUID(),
      content: React.createElement(SudoPrompt, { subcommand, args: rest }),
      type: "text",
    };
  },
};
