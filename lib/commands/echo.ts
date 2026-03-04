import { Command } from "@/lib/types";

export const echoCommand: Command = {
  name: "echo",
  description: "Print text — usage: echo <text>",
  execute: (args) => {
    if (!args.length) {
      return { id: crypto.randomUUID(), content: "", type: "text" };
    }
    return {
      id: crypto.randomUUID(),
      content: args.join(" "),
      type: "text",
    };
  },
};
