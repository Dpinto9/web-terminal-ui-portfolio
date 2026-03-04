"use client";

import { useEffect, useState } from "react";
import { terminalState } from "@/lib/terminalState";
import { themeState } from "@/lib/themeState";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
  onKeyDown,
}: Props) {
  const [cwd, setCwd] = useState(terminalState.cwd);
  const [isRoot, setIsRoot] = useState(terminalState.isRoot);
  const [theme, setTheme] = useState(themeState.get());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    return terminalState.subscribe(() => {
      setCwd(terminalState.cwd);
      setIsRoot(terminalState.isRoot);
    });
  }, []);

  useEffect(() => {
    return themeState.subscribe(() => setTheme(themeState.get()));
  }, []);

  return (
    <div
      className={`flex items-center gap-2 font-mono text-sm mt-2 ${theme.input}`}
    >
      {isRoot && <span className="text-red-400 text-xs">[root]</span>}
      <span className={`${theme.prompt} shrink-0 hidden sm:inline`}>{cwd}</span>
      <span className={`${isRoot ? "text-red-400" : theme.arrow} shrink-0`}>
        ❯
      </span>
      <input
        autoFocus={!isMobile}
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit();
          onKeyDown?.(e);
        }}
        className={`flex-1 bg-transparent outline-none caret-green-400 ${theme.input} min-w-0`}
      />
      {isMobile && (
        <button
          onPointerDown={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className={`shrink-0 px-3 py-1 rounded text-xs border border-gray-700 ${theme.arrow} hover:brightness-125 transition-all`}
        >
          ↵
        </button>
      )}
    </div>
  );
}
