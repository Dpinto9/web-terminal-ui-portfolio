import { Command } from "@/lib/types";

const LINKS: Record<string, string> = {
  github: "https://github.com/Dpinto9",
  linkedin: "https://www.linkedin.com/in/dpinto9/",
  portfolio: "https://dpinto9.github.io/WebPortfolio/",
};

export const linkCommand: Command = {
  name: "link",
  description: "Open a link in a new tab — usage: link <name>",
  execute: (args) => {
    if (!args[0]) {
      return [
        { id: crypto.randomUUID(), content: "Available links:", type: "info" },
        ...Object.entries(LINKS).map(([name, url]) => ({
          id: crypto.randomUUID(),
          content: `  ${name.padEnd(12)} → ${url}`,
          type: "text" as const,
        })),
        {
          id: crypto.randomUUID(),
          content: "Usage: link <name>",
          type: "info",
        },
      ];
    }

    const url = LINKS[args[0].toLowerCase()];

    if (!url) {
      return {
        id: crypto.randomUUID(),
        content: `link: '${args[0]}' not found. Type 'link' to see available links.`,
        type: "error",
      };
    }

    window.open(url, "_blank", "noopener,noreferrer");

    return {
      id: crypto.randomUUID(),
      content: `Opening ${args[0]} → ${url}`,
      type: "success",
    };
  },
};
