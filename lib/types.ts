export type OutputType = "text" | "error" | "success" | "info";

export interface OutputLine {
  id: string;
  content: string | React.ReactNode;
  type: OutputType;
}

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => OutputLine | OutputLine[];
}
