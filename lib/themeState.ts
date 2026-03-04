export type Theme = "green" | "blue" | "red" | "purple" | "amber";

export const themes: Record<
  Theme,
  {
    prompt: string;
    arrow: string;
    input: string;
    echo: string;
    success: string;
    info: string;
    error: string;
    suggestion: string;
  }
> = {
  green: {
    prompt: "text-green-400",
    arrow: "text-blue-400",
    input: "text-gray-200",
    echo: "text-green-300",
    success: "text-green-400",
    info: "text-blue-300",
    error: "text-red-400",
    suggestion: "text-blue-400",
  },
  blue: {
    prompt: "text-blue-400",
    arrow: "text-cyan-400",
    input: "text-gray-200",
    echo: "text-blue-300",
    success: "text-cyan-400",
    info: "text-blue-300",
    error: "text-red-400",
    suggestion: "text-cyan-400",
  },
  red: {
    prompt: "text-red-400",
    arrow: "text-orange-400",
    input: "text-gray-200",
    echo: "text-red-300",
    success: "text-orange-400",
    info: "text-red-300",
    error: "text-red-500",
    suggestion: "text-orange-400",
  },
  purple: {
    prompt: "text-purple-400",
    arrow: "text-pink-400",
    input: "text-gray-200",
    echo: "text-purple-300",
    success: "text-pink-400",
    info: "text-purple-300",
    error: "text-red-400",
    suggestion: "text-pink-400",
  },
  amber: {
    prompt: "text-amber-400",
    arrow: "text-yellow-300",
    input: "text-gray-200",
    echo: "text-amber-300",
    success: "text-yellow-400",
    info: "text-amber-300",
    error: "text-red-400",
    suggestion: "text-yellow-400",
  },
};

type Listener = () => void;

class ThemeState {
  current: Theme = "green";
  private listeners: Listener[] = [];

  set(theme: Theme) {
    this.current = theme;
    this.notify();
  }

  get() {
    return themes[this.current];
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

export const themeState = new ThemeState();
