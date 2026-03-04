"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Terminal from "./Terminal";

interface Position {
  x: number;
  y: number;
}
interface Size {
  width: number;
  height: number;
}

export default function TerminalWindow() {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [isFullscreen, setIsFullscreen] = useState(isMobile);
  const [pos, setPos] = useState<Position>({ x: 80, y: 80 });
  const [size, setSize] = useState<Size>({ width: 720, height: 640 });

  const scrollRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const dragging = useRef(false);
  const resizing = useRef(false);

  const posRef = useRef(pos);
  const sizeRef = useRef(size);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);
  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  // =========================
  // DRAG (ULTRA SMOOTH)
  // =========================
  const onDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isFullscreen) return;

      dragging.current = true;

      const startX = e.clientX;
      const startY = e.clientY;
      const initialX = posRef.current.x;
      const initialY = posRef.current.y;

      const onMove = (e: MouseEvent) => {
        if (!dragging.current) return;

        const newX = initialX + (e.clientX - startX);
        const newY = initialY + (e.clientY - startY);

        setPos({ x: newX, y: newY });
      };

      const onUp = () => {
        dragging.current = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [isFullscreen],
  );

  // =========================
  // RESIZE (ULTRA SMOOTH)
  // =========================
  const onResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isFullscreen || !windowRef.current) return;

      resizing.current = true;

      const startX = e.clientX;
      const startY = e.clientY;
      const initialW = sizeRef.current.width;
      const initialH = sizeRef.current.height;

      const onMove = (e: MouseEvent) => {
        if (!resizing.current || !windowRef.current) return;

        const newW = Math.max(400, initialW + (e.clientX - startX));
        const newH = Math.max(260, initialH + (e.clientY - startY));

        windowRef.current.style.width = `${newW}px`;
        windowRef.current.style.height = `${newH}px`;
      };

      const onUp = (e: MouseEvent) => {
        resizing.current = false;

        const finalW = Math.max(400, initialW + (e.clientX - startX));
        const finalH = Math.max(260, initialH + (e.clientY - startY));

        setSize({ width: finalW, height: finalH });

        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [isFullscreen],
  );

  // =========================
  // WINDOW STYLE
  // =========================
  const windowStyle = isFullscreen
    ? {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        border: "none",
        transform: "none",
      }
    : {
        top: 0,
        left: 0,
        width: size.width,
        height: size.height,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 bg-gray-950" />

      {/* Scrollbar styling */}
      <style>{`
        .terminal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background: #374151;
          border-radius: 9999px;
        }
        .terminal-scroll::-webkit-scrollbar-thumb:hover {
          background: #4b5563;
        }
      `}</style>

      <div
        ref={windowRef}
        className="fixed z-50 flex flex-col bg-gray-900 border border-gray-700/80 rounded-lg shadow-2xl overflow-hidden"
        style={windowStyle}
      >
        {/* Titlebar */}
        <div
          onMouseDown={!isMobile ? onDragStart : undefined}
          className={`
            flex items-center justify-between px-4 bg-gray-800/90
            border-b border-gray-700/80 select-none
            backdrop-blur-sm
            ${isFullscreen ? "py-1 cursor-default" : "py-2 cursor-grab active:cursor-grabbing"}
          `}
        >
          <div className="flex items-center gap-2">
            <button
              title="Close — not implemented"
              className="cursor-pointer w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            />
            <button
              title="Minimize — not implemented"
              className="cursor-pointer w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
            />
            <button
              onClick={() => setIsFullscreen((f) => !f)}
              title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="cursor-pointer w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
            />
          </div>

          <span className="text-xs font-mono text-gray-500 pointer-events-none tracking-widest">
            web-terminal-dpinto9
          </span>

          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Terminal />
        </div>

        {/* Resize Handle */}
        {!isFullscreen && (
          <div
            onMouseDown={onResizeStart}
            title="Resize"
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-60 hover:opacity-100 transition-opacity"
            style={{
              background:
                "linear-gradient(135deg, transparent 50%, #6b7280 50%)",
            }}
          />
        )}
      </div>
    </>
  );
}
