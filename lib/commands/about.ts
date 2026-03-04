// lib/commands/about.ts

import { Command } from "@/lib/types";

export const aboutCommand: Command = {
  name: "about",
  description: "About this terminal and its author",
  execute: () => [
    { id: crypto.randomUUID(), content: "", type: "text" as const },
    {
      id: crypto.randomUUID(),
      content: "  An interactive terminal built as a portfolio.",
      type: "text" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "  Simulate a real shell — without the danger.",
      type: "text" as const,
    },
    { id: crypto.randomUUID(), content: "", type: "text" as const },
    {
      id: crypto.randomUUID(),
      content: "  Author   Diogo Pinto",
      type: "success" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "  Stack    Next.js · TypeScript · Tailwind CSS",
      type: "success" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "  Source   github.com/Dpinto9",
      type: "success" as const,
    },
    { id: crypto.randomUUID(), content: "", type: "text" as const },
    { id: crypto.randomUUID(), content: "  Features:", type: "info" as const },
    {
      id: crypto.randomUUID(),
      content: "    ❯ Floating resizable window",
      type: "text" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "    ❯ Simulated filesystem with ls, cd, cat, tree",
      type: "text" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "    ❯ sudo access with password protection",
      type: "text" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "    ❯ Tab autocomplete + command history",
      type: "text" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "    ❯ Color themes — try 'theme purple'",
      type: "text" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "    ❯ ASCII animations — try 'animation'",
      type: "text" as const,
    },
    { id: crypto.randomUUID(), content: "", type: "text" as const },
    {
      id: crypto.randomUUID(),
      content: "  Type 'help' to see all commands.",
      type: "info" as const,
    },
    {
      id: crypto.randomUUID(),
      content: "  Type 'link portfolio' to visit the full portfolio.",
      type: "info" as const,
    },
  ],
};
