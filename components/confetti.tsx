"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/use-task-store";

const colors = ["#22d3ee", "#f472b6", "#a78bfa", "#fb923c", "#34d399"];

export function ConfettiBurst() {
  const lastCelebration = useTaskStore((state) => state.lastCelebration);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastCelebration) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 1100);
    return () => window.clearTimeout(timer);
  }, [lastCelebration]);

  return (
    <AnimatePresence>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, index) => (
            <motion.span
              key={`${lastCelebration}-${index}`}
              className="absolute left-1/2 top-32 size-2 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
              initial={{ x: 0, y: 0, scale: 0.7, opacity: 1 }}
              animate={{
                x: (index - 14) * 16,
                y: 120 + (index % 7) * 24,
                rotate: index * 18,
                scale: [1, 1.3, 0.7],
                opacity: [1, 1, 0],
              }}
              transition={{ duration: 0.95, ease: "easeOut" }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
