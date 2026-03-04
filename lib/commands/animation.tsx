"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Command } from "@/lib/types";

// ── 1. STARFIELD ─────────────────────────────────────────────
function Starfield() {
  const [stars, setStars] = useState<{ x: number; y: number; z: number }[]>([]);
  useEffect(() => {
    const initialStars = Array.from({ length: 30 }, () => ({
      x: Math.random() * 40 - 20,
      y: Math.random() * 20 - 10,
      z: Math.random() * 20,
    }));
    setStars(initialStars);
    const id = setInterval(() => {
      setStars((prev) =>
        prev.map((s) => {
          let newZ = s.z - 0.5;
          if (newZ <= 0)
            return {
              x: Math.random() * 40 - 20,
              y: Math.random() * 20 - 10,
              z: 20,
            };
          return { ...s, z: newZ };
        }),
      );
    }, 50);
    return () => clearInterval(id);
  }, []);

  const render = () => {
    let grid = Array.from({ length: 15 }, () => Array(50).fill(" "));
    stars.forEach((s) => {
      const x = Math.floor(s.x / (s.z * 0.1) + 25);
      const y = Math.floor(s.y / (s.z * 0.1) + 7);
      const char = s.z < 5 ? "█" : s.z < 10 ? "*" : "·";
      if (y >= 0 && y < 15 && x >= 0 && x < 50) grid[y][x] = char;
    });
    return grid.map((r) => r.join("")).join("\n");
  };
  return (
    <pre className="text-white font-mono text-[10px] leading-tight">
      {render()}
    </pre>
  );
}

// ── 2. DONUT ─────────────────────────────────────────────────
function Torus() {
  const [frames, setFrames] = useState("");
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setA((a) => a + 0.07);
      setB((b) => b + 0.03);
      let bArr = new Array(1760).fill(" ");
      let zArr = new Array(1760).fill(0);
      for (let j = 0; j < 6.28; j += 0.07) {
        for (let i = 0; i < 6.28; i += 0.02) {
          let c = Math.sin(i),
            d = Math.cos(j),
            e = Math.sin(A),
            f = Math.sin(j),
            g = Math.cos(A),
            h = d + 2,
            D = 1 / (c * h * e + f * g + 5),
            l = Math.cos(i),
            m = Math.cos(B),
            n = Math.sin(B),
            t = c * h * g - f * e;
          let x = Math.floor(40 + 30 * D * (l * h * m - t * n));
          let y = Math.floor(12 + 15 * D * (l * h * n + t * m));
          let o = x + 80 * y;
          let N = Math.floor(
            8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n),
          );
          if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > zArr[o]) {
            zArr[o] = D;
            bArr[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }
      let res = "";
      for (let k = 0; k < 1761; k++) res += k % 80 === 0 ? "\n" : bArr[k];
      setFrames(res);
    }, 50);
    return () => clearInterval(id);
  }, [A, B]);
  return <pre className="text-white text-[7px] leading-none">{frames}</pre>;
}

// ── 3. ROTATING SATURN ───────────────────────────────────────
function Saturn() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle((a) => a + 0.1), 50);
    return () => clearInterval(id);
  }, []);

  const renderSaturn = () => {
    const width = 60;
    const height = 18;
    let grid = Array.from({ length: height }, () => Array(width).fill(" "));

    const centerX = 30;
    const centerY = 9;
    const radius = 5;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dx = (x - centerX) / 2; // Adjust for character aspect ratio
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 1. Draw Rings (Ellipse)
        // Formula: (x^2/a^2) + (y^2/b^2) = 1
        const rx = dx * Math.cos(0.2) + dy * Math.sin(0.2);
        const ry = -dx * Math.sin(0.2) + dy * Math.cos(0.2);
        const ringDist = (rx * rx) / 225 + (ry * ry) / 16;

        const isRing = ringDist > 0.8 && ringDist < 1.2;
        const ringFront = ry > 0; // Simple perspective: bottom of ellipse is "front"

        // 2. Draw Planet
        if (dist < radius) {
          // Planet Shading
          const intensity = (dx + radius) / (2 * radius);
          const chars = " .:-=+*#%@";
          grid[y][x] = chars[Math.floor(intensity * 9)];

          // Planet over back-rings
          if (isRing && !ringFront) {
            /* Planet covers it */
          }
        } else if (isRing) {
          // Draw Ring bits that aren't behind the planet
          grid[y][x] = (x + Math.floor(angle)) % 4 === 0 ? "=" : "-";
        }
      }
    }
    return grid.map((r) => r.join("")).join("\n");
  };

  return (
    <pre className="text-yellow-200 text-[10px] font-mono leading-tight">
      {renderSaturn()}
    </pre>
  );
}

// ── MAIN SELECTOR ─────────────────────────────────────────────
type AnimType = "stars" | "donut" | "saturn";

export default function AnimationSelector() {
  const [selected, setSelected] = useState<AnimType>("stars");
  const options: AnimType[] = ["stars", "donut", "saturn"];

  return (
    <div className="mt-4 flex flex-col gap-6 select-none">
      <div className="flex gap-8 border-b border-white/5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`text-xs font-mono pb-2 transition-all uppercase tracking-widest ${
              selected === opt
                ? "text-white border-b border-white"
                : "text-gray-600 hover:text-gray-400"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="h-44 flex items-center justify-start overflow-hidden">
        {selected === "stars" && <Starfield />}
        {selected === "donut" && <Torus />}
        {selected === "saturn" && <Saturn />}
      </div>
    </div>
  );
}

export const animationCommand: Command = {
  name: "animation",
  description: "High-visibility motion modules",
  execute: () => ({
    id: crypto.randomUUID(),
    content: React.createElement(AnimationSelector),
    type: "text",
  }),
};
