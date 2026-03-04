# 🖥️ Web Terminal

An interactive browser-based terminal built as a portfolio. Simulates a real shell experience — without the danger.

## Screenshots

---

## Features

- **Floating window** — draggable, resizable, and fullscreen-capable
- **Simulated filesystem** — navigate folders with `ls`, `cd`, `cat`, `tree`
- **sudo access** — password-protected root session with `sudo access` / `sudo logoff`
- **Tab autocomplete** — completes commands and filenames, cycles through matches
- **Command history** — navigate previous commands with ↑ ↓ arrows
- **Color themes** — switch themes live with `theme <name>`
- **ASCII animations** — skull pulse, matrix rain, and globe spin via `spin`
- **Responsive** — works on mobile with native keyboard support
- **Links** — open external profiles directly from the terminal with `link`

---

## Commands

| Command        | Description                               |
| -------------- | ----------------------------------------- |
| `help`         | List all available commands               |
| `about`        | About this terminal and its author        |
| `ls`           | List files in the current directory       |
| `tree`         | Show directory tree from current location |
| `cat <file>`   | Read a file                               |
| `cd <folder>`  | Change directory                          |
| `echo <text>`  | Print text                                |
| `clear`        | Clear the terminal output                 |
| `history`      | Show previously used commands             |
| `sudo <cmd>`   | Execute a command as admin                |
| `sudo access`  | Escalate to root session                  |
| `sudo logoff`  | End the root session                      |
| `link <name>`  | Open a link in a new tab                  |
| `theme <name>` | Change the color theme                    |
| `spin`         | Show ASCII art animations                 |

---

## Themes

`green` · `blue` · `red` · `purple` · `amber`

```bash
theme purple
```

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Font:** JetBrains Mono

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Global layout
│   └── page.tsx            # Entry point
│
├── components/
│   ├── Terminal.tsx         # Core terminal — state, history, input handling
│   ├── TerminalWindow.tsx   # Floating window — drag, resize, fullscreen
│   ├── TerminalInput.tsx    # Input line with prompt and cursor
│   ├── TerminalOutput.tsx   # Renders output lines with color by type
│   └── WelcomeBanner.tsx    # ASCII banner shown on load
│
├── lib/
│   ├── commands/
│   │   ├── index.ts         # Registers all commands
│   │   ├── about.ts
│   │   ├── cat.ts
│   │   ├── cd.ts
│   │   ├── clear.ts
│   │   ├── echo.ts
│   │   ├── help.ts
│   │   ├── history.ts
│   │   ├── link.ts
│   │   ├── ls.ts
│   │   ├── spin.tsx
│   │   ├── sudo.tsx
│   │   ├── theme.ts
│   │   └── tree.ts
│   │
│   ├── filesystem.ts        # Simulated filesystem with files and folders
│   ├── fsUtils.ts           # Path resolution helpers (cwd-aware)
│   ├── executeCommand.ts    # Command parser and router
│   ├── terminalState.ts     # Global state — cwd, root session, history
│   ├── themeState.ts        # Global theme state with subscriber pattern
│   └── types.ts             # Shared types — Command, OutputLine, etc.
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Dpinto9/web-terminal.git
cd web-terminal
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start typing.

---

## Easter Eggs

There are a few hidden things in the filesystem. Try:

```bash
sudo access
cd secret
cat passwords.txt
```

Password hint: check `config/.env`

_Built with Next.js · TypeScript · Tailwind CSS_
