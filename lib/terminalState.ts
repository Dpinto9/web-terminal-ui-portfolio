type Listener = () => void;

class TerminalState {
  isRoot = false;
  cwd = "~";
  cmdHistory: string[] = [];
  private listeners: Listener[] = [];

  setRoot(val: boolean) {
    this.isRoot = val;
    this.notify();
  }

  setCwd(val: string) {
    this.cwd = val;
    this.notify();
  }

  subscribe(fn: Listener) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }
}

export const terminalState = new TerminalState();
