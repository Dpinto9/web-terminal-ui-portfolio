import { Command } from "@/lib/types";

export const clearCommand: Command = {
  name: "clear",
  description: "Clear the content of the terminal",
  execute: (_args: string[]) => ({
    id: "__clear__",
    content: "",
    type: "info",
  }),
};
