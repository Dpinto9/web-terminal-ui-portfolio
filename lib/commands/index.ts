import { Command } from "@/lib/types";
import { helpCommand } from "./help";
import { aboutCommand } from "./about";
import { clearCommand } from "./clear";
import { animationCommand } from "./animation";
import { treeCommand } from "./tree";
import { catCommand } from "./cat";
import { lsCommand } from "./ls";
import { sudoCommand } from "./sudo";
import { linkCommand } from "./link";
import { cdCommand } from "./cd";
import { echoCommand } from "./echo";
import { historyCommand } from "./history";
import { themeCommand } from "./theme";

export const commands: Record<string, Command> = {
  help: helpCommand,
  about: aboutCommand,
  clear: clearCommand,
  cls: clearCommand,
  animation: animationCommand,
  tree: treeCommand,
  cat: catCommand,
  ls: lsCommand,
  sudo: sudoCommand,
  link: linkCommand,
  cd: cdCommand,
  echo: echoCommand,
  history: historyCommand,
  theme: themeCommand,
};
