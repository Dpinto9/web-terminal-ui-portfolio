"use client";

import { useState, useRef, useEffect } from "react";
import { OutputLine } from "@/lib/types";
import { executeCommand } from "@/lib/executeCommand";
import { getCurrentNode } from "@/lib/fsUtils";
import { commands } from "@/lib/commands";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import WelcomeBanner from "./WelcomeBanner";
import { terminalState } from "@/lib/terminalState";
import { themeState } from "@/lib/themeState";

export default function Terminal() {
  const [history, setHistory] = useState<OutputLine[]>([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cmdHistory = useRef<string[]>([]);
  const historyIndex = useRef<number>(-1);
  const [theme, setTheme] = useState(themeState.get());

  useEffect(() => {
    return themeState.subscribe(() => setTheme(themeState.get()));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handleSubmit() {
    if (!input.trim()) return;

    const echo: OutputLine = {
      id: crypto.randomUUID(),
      content: `❯ ${input}`,
      type: "text",
    };

    cmdHistory.current = [input, ...cmdHistory.current];
    terminalState.cmdHistory = cmdHistory.current;
    historyIndex.current = -1;
    setSuggestions([]);

    const result = executeCommand(input);
    const output = Array.isArray(result) ? result : [result];

    if (output.some((l) => l.id === "__clear__")) {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, echo, ...output]);
    }
    setInput("");
  }

  return (
    <div className="terminal-scroll h-full overflow-y-auto overflow-x-hidden">
      <div className="p-6 flex flex-col gap-2">
        <WelcomeBanner />
        <TerminalOutput lines={history} />

        {suggestions.length > 0 && (
          <div className="flex gap-3 font-mono text-sm mt-1">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  const hasArgSpace = input.includes(" ");
                  const cmd = input.trim().split(" ")[0];
                  setInput(
                    hasArgSpace && ["cat", "cd", "tree"].includes(cmd)
                      ? `${cmd} ${s}`
                      : s,
                  );
                  setSuggestions([]);
                }}
                className={`${theme.suggestion} hover:brightness-125 transition-all`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <TerminalInput
          value={input}
          onChange={(val) => {
            setInput(val);
            historyIndex.current = -1;
            setSuggestions([]);
          }}
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              if (!input.trim()) return;

              if (suggestions.length > 0) {
                const hasArgSpace = input.includes(" ");
                const cmd = input.trim().split(" ")[0];
                const current = hasArgSpace
                  ? (input.trim().split(" ").pop() ?? "")
                  : input.trim();
                const currentIndex = suggestions.indexOf(current);
                const nextIndex = (currentIndex + 1) % suggestions.length;
                const next = suggestions[nextIndex];
                setInput(
                  hasArgSpace && ["cat", "cd", "tree"].includes(cmd)
                    ? `${cmd} ${next}`
                    : next,
                );
                return;
              }

              const parts = input.trim().split(" ");
              const hasArgSpace = input.includes(" ");

              if (!hasArgSpace) {
                const matches = Object.keys(commands).filter((cmd) =>
                  cmd.startsWith(parts[0].toLowerCase()),
                );
                if (matches.length === 1) {
                  setInput(matches[0]);
                  setSuggestions([]);
                } else if (matches.length > 1) setSuggestions(matches);
                return;
              }

              const cmd = parts[0];
              const partial = parts.length > 1 ? parts[parts.length - 1] : "";

              if (["cat", "cd"].includes(cmd)) {
                const currentNode = getCurrentNode();
                if (typeof currentNode !== "object") return;

                const matches = Object.keys(currentNode).filter((name) => {
                  if (!name.startsWith(partial)) return false;
                  if (cmd === "cd")
                    return (
                      typeof (currentNode as Record<string, unknown>)[name] ===
                      "object"
                    );
                  if (cmd === "cat")
                    return (
                      typeof (currentNode as Record<string, unknown>)[name] ===
                      "string"
                    );
                  return true;
                });

                if (matches.length === 1) {
                  setInput(`${cmd} ${matches[0]}`);
                  setSuggestions([]);
                } else if (matches.length > 1) {
                  setSuggestions(matches);
                }
              }
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();
              const next = Math.min(
                historyIndex.current + 1,
                cmdHistory.current.length - 1,
              );
              historyIndex.current = next;
              setInput(cmdHistory.current[next] ?? "");
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();
              const next = Math.max(historyIndex.current - 1, -1);
              historyIndex.current = next;
              setInput(next === -1 ? "" : (cmdHistory.current[next] ?? ""));
            }
          }}
        />
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
