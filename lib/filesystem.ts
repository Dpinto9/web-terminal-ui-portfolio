// lib/filesystem.ts

export type FileContent = string;
export interface Directory {
  [key: string]: FSNode;
}
export type FSNode = FileContent | Directory;

export const filesystem: Record<string, FSNode> = {
  "README.md": `# web-terminal — Diogo Pinto
An interactive terminal portfolio built with Next.js.
Type 'help' to see available commands.
Type 'ls' to explore the filesystem.`,

  "about.txt": `Name:       Diogo Pinto
Role:       Full-Stack Developer
Location:   Portugal
Status:     Available to Work

I'm a Computer Science graduate passionate about creating
efficient, user-focused applications. With experience in
software development, systems analysis, and project management,
I transform technical knowledge into practical solutions
that drive innovation and make technology truly useful.

Education:
  Bachelor's in Computer Science
  Instituto Politécnico de Santarém (2022 - 2025)`,

  "skills.txt": `Languages:
  TypeScript  ████████░░  80%
  JavaScript  ████████░░  80%
  Python      ███████░░░  70%
  PHP         ██████░░░░  60%
  C#          █████░░░░░  50%
  C++         ███░░░░░░░  30%

Frameworks & Libraries:
  NextJS       Angular     React       Node.js     Flask

Databases:
  MySQL       SQL

Tools & Platforms:
  Git         GitHub      Figma       Canva

Design:
  HTML5       CSS3        Responsive UI`,

  "experience.txt": `[1] Full-Stack Developer — BaneTech (2025)
    Built a full-stack enterprise monitoring system.
    Stack: Angular, Node.js, TypeScript, MySQL
    Highlights:
      - Responsive dashboards with real-time data visualization
      - Performance optimization via load testing
      - Database tuning and scalability improvements
      - Agile environment, secure and well-documented delivery

[2] Web Developer & Graphic Designer — Freelancer (2025)
    Designed brand identities and built purpose-driven websites.
    Stack: Flask, Python, Figma, Canva
    Highlights:
      - Cohesive brand identities and marketing materials
      - Digital posters and visual assets
      - Lightweight websites complementing business operations

[3] Brand Promoter — Valor Pneu (2024)
    Enhanced brand visibility through targeted marketing
    campaigns and direct customer engagement.`,

  "contacts.txt": `Email:     diogo.a.p.pinto@hotmail.com
GitHub:    github.com/Dpinto9
LinkedIn:  linkedin.com/in/dpinto9
Portfolio: dpinto9.github.io/WebPortfolio

Type 'link github'   to open GitHub
Type 'link linkedin' to open LinkedIn
Type 'link portfolio' to open Portfolio`,

  projects: {
    "web-terminal.txt": `Name:    Web Terminal Portfolio
Repo:    github.com/Dpinto9/web-terminal
Status:  Active — you're looking at it
Stack:   Next.js, TypeScript, Tailwind CSS
Type:    Full Stack

desc:    An interactive browser-based terminal built as
         a portfolio. Features a floating window, filesystem
         simulation, sudo access, themes, tab completion,
         command history, and ASCII art.`,

    "portfolio.txt": `Name:    Web Portfolio
Repo:    github.com/Dpinto9/WebPortfolio
Live:    dpinto9.github.io/WebPortfolio
Status:  Live
Stack:   HTML, CSS, JavaScript
Type:    Frontend

desc:    Personal portfolio website showcasing projects,
         skills, and experience. Features smooth animations,
         category filtering, and a responsive layout.`,

    "banetech-monitor.txt": `Name:    Enterprise Monitoring System
Status:  Private / Professional
Stack:   Angular, Node.js, TypeScript, MySQL
Type:    Full Stack

desc:    Full-stack enterprise monitoring system featuring
         responsive dashboards, real-time data visualization,
         load testing, and database tuning. Delivered in an
         Agile environment with a focus on security and
         documentation.`,

    "freelance-sites.txt": `Name:    Freelance Web & Design Projects
Status:  Delivered
Stack:   Flask, Python, Figma, Canva
Type:    Frontend + Design

desc:    Collection of client projects including brand
         identities, digital marketing materials, and
         lightweight business websites. Focus on visual
         consistency and brand accessibility.`,
  },

  docs: {
    "setup.txt": `# Setup Guide — web-terminal
1. Clone the repo
   git clone github.com/Dpinto9/web-terminal

2. Install dependencies
   npm install

3. Run the dev server
   npm run dev

4. Open http://localhost:3000

5. Type 'help' and enjoy`,

    "commands.txt": `Available commands:
  help       List all commands
  about      About Diogo Pinto
  ls         List files in current directory
  tree       Show directory tree
  cat        Read a file
  cd         Change directory
  echo       Print text
  clear      Clear the terminal
  history    Show command history
  sudo       Escalate privileges
  link       Open a link in new tab
  theme      Change color theme
  spin       ASCII art animation`,

    "contributing.txt": `# Contributing
Pull requests welcome.
Please do not break anything.
We mean it.
Last contributor broke prod on a Friday.
They are no longer with us.`,
  },

  config: {
    "settings.json": `{
  "theme": "green",
  "font": "JetBrains Mono",
  "fontSize": 14,
  "cursorBlink": true,
  "soundEffects": false,
  "rickrollProtection": true,
  "sudoPassword": "try harder"
}`,

    ".env": `# DO NOT COMMIT THIS FILE
# (too late, it's on GitHub)
API_KEY=sk-totally-not-a-real-key-abc123
DB_PASSWORD=password123
SECRET=shhhhhhh
NODE_ENV=production
SEND_HELP=true
COFFEE_LEVEL=critical
SUDO=admin123`,

    "aliases.sh": `alias gs="git status"
alias gc="git commit -m 'fix stuff'"
alias yolo="git push --force"
alias please="sudo"
alias cls="clear"
alias work="open linkedin.com/in/dpinto9"`,
  },

  logs: {
    "access.log": `[2025-01-01 00:00:01] INFO  Terminal started
[2025-01-01 00:00:02] INFO  Filesystem mounted
[2025-01-01 00:04:13] WARN  Suspicious activity — user typed 'rm -rf /'
[2025-01-01 00:04:14] INFO  Command not found: rm
[2025-01-01 00:04:15] INFO  User tried 'sudo access'. Password prompt shown.
[2025-01-01 00:04:16] WARN  Wrong password attempt #1
[2025-01-01 00:04:17] WARN  Wrong password attempt #2
[2025-01-01 00:04:18] INFO  Correct password. Root access granted.
[2025-01-01 00:04:19] INFO  User is now dangerous.`,

    "error.log": `[CRITICAL] Something went wrong
[CRITICAL] We don't know what
[CRITICAL] We don't know why
[CRITICAL] Have you tried turning it off and on again?
[ERROR]    undefined is not a function (classic)
[ERROR]    Cannot read property 'map' of undefined
[ERROR]    404 - Developer motivation not found (temporary)
[WARN]     Low coffee levels detected
[INFO]     Ignoring all of the above`,

    "deploy.log": `Deploying to production...
Running tests... done (1 skipped, 0 failed, 0 written)
Building... done
Pushing to GitHub Pages...
Deploy complete.

Wait.

Something is on fire.

Rolling back...
Rollback complete.

Everything is fine. This is fine.
(It was a missing semicolon.)`,
  },

  secret: {
    "classified.txt": "__protected__",
    "passwords.txt": "__protected__",
    "masterplan.txt": "__protected__",
  },
};

export const PROTECTED_CONTENT: Record<string, string> = {
  "secret/classified.txt": `CLASSIFIED — EYES ONLY

Operator:  Diogo Pinto
Codename:  PHANTOM TERMINAL
Status:    Active

Mission:   Build the most impressive terminal portfolio ever.
Progress:  You found it. Mission complete.

Skills unlocked:
  - Next.js wizardry
  - Filesystem simulation
  - sudo social engineering
  - Making recruiters type commands

If you are reading this, congratulations.
You are exactly the kind of person I want to work with.

Contact: linkedin.com/in/dpinto9`,

  "secret/passwords.txt": `wifi:         correcthorsebatterystaple
netflix:      definitely-not-sharing
bank:         [REDACTED BY LEGAL]
github:       dpinto9
terminal:     admin123
sudo:         admin123
recruiter:    pleasehireme

note to self: stop storing passwords in plaintext
other note:   too late`,

  "secret/masterplan.txt": `Phase 1: Graduate Computer Science        [DONE]
Phase 2: Build a portfolio website        [DONE]
Phase 3: Build a terminal portfolio       [DONE]
Phase 4: Get hired at a great company     [IN PROGRESS]
Phase 5: Build something people love      [ ]
Phase 6: ???                              [ ]
Phase 7: World domination                 [ ]

Current blocker: phase 4
If you can help: linkedin.com/in/dpinto9`,
};

export const SECRET_CONTENT = PROTECTED_CONTENT["secret/classified.txt"];
