"use client";

import { useEffect, useState } from "react";
import { OutputLine } from "@/lib/types";
import { themeState } from "@/lib/themeState";

interface Props {
  lines: OutputLine[];
}

export default function TerminalOutput({ lines }: Props) {
  const [theme, setTheme] = useState(themeState.get());

  useEffect(() => {
    return themeState.subscribe(() => setTheme(themeState.get()));
  }, []);

  return (
    <div className="flex flex-col">
      {lines.map((line, i) => {
        const isEcho =
          typeof line.content === "string" &&
          (line.content as string).startsWith("❯");
        const isEmpty = line.content === "";

        const colorClass = isEcho
          ? theme.echo
          : line.type === "error"
            ? theme.error
            : line.type === "success"
              ? theme.success
              : line.type === "info"
                ? theme.info
                : theme.input;

        return (
          <div
            key={line.id}
            className={`
              font-mono text-sm ${colorClass}
              ${isEcho ? "mt-3 mb-1" : "leading-relaxed"}
              ${isEmpty ? "h-2" : ""}
            `}
          >
            {line.content}
          </div>
        );
      })}
    </div>
  );
}
