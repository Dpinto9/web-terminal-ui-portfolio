import { OutputLine } from "@/lib/types";
import { commands } from "@/lib/commands";

export function executeCommand(input: string): OutputLine | OutputLine[] {
  const [name, ...args] = input.trim().toLowerCase().split(" ");

  if (!name) {
    return { id: crypto.randomUUID(), content: "", type: "text" };
  }

  const command = commands[name];

  if (!command) {
    return {
      id: crypto.randomUUID(),
      content: `Command not found: ${name}. Type 'help' for a list of available commands.`,
      type: "error",
    };
  }

  return command.execute(args);
}
