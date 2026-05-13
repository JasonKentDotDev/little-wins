"use client";

import { motion } from "framer-motion";
import { CalendarHeart, HeartHandshake, RotateCcw, Sparkles } from "lucide-react";
import { KanbanBoard } from "@/components/board/kanban-board";
import { QuickAdd } from "@/components/board/quick-add";
import { ConfettiBurst } from "@/components/confetti";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";
import { useTaskStore } from "@/store/use-task-store";

export function AppShell() {
  const tasks = useTaskStore((state) => state.tasks);
  const archives = useTaskStore((state) => state.archives);
  const startNewDay = useTaskStore((state) => state.startNewDay);
  const done = tasks.filter((task) => task.status === "done").length;
  const todayTasks = tasks.filter((task) => task.status !== "backlog").length;
  const progress = todayTasks ? (done / todayTasks) * 100 : 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbf7ff] text-slate-900 dark:bg-[#071126] dark:text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-fuchsia-300/30 blur-3xl dark:bg-fuchsia-500/15" />
        <div className="absolute right-[-6rem] top-32 size-80 rounded-full bg-cyan-300/35 blur-3xl dark:bg-cyan-400/15" />
        <div className="absolute bottom-0 left-1/3 size-96 rounded-full bg-orange-200/40 blur-3xl dark:bg-orange-500/10" />
      </div>

      <ConfettiBurst />
      <section className="relative px-4 pb-3 pt-[calc(env(safe-area-inset-top)+1rem)] md:px-8">
        <nav className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-[1.2rem] bg-slate-950 shadow-xl shadow-fuchsia-500/20 dark:bg-white/10">
              <img src="/icons/icon.svg" alt="Little Wins" className="size-9" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-fuchsia-500">Little Wins</p>
              <h1 className="text-xl font-black leading-none md:text-2xl">Home sprint</h1>
            </div>
          </div>
          <ThemeToggle />
        </nav>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
          <motion.div
            className="rounded-[2rem] border border-white/60 bg-white/55 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-black text-violet-600 shadow-sm dark:bg-white/10 dark:text-violet-200">
                  <Sparkles className="size-4" /> Cozy Agile for real life
                </div>
                <h2 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl">
                  Make chores feel like tiny shared victories.
                </h2>
                <p className="mt-3 max-w-xl text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                  Pull tasks into today, move them across the board, and celebrate every checklist tap together.
                </p>
              </div>
              <ProgressRing value={progress} label="Daily sprint progress" />
            </div>
            <QuickAdd status="todo" />
          </motion.div>

          <motion.aside
            className="grid gap-3 rounded-[2rem] border border-white/60 bg-slate-950 p-4 text-white shadow-2xl shadow-slate-950/20 dark:border-white/10 dark:bg-white/[0.07]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-cyan-200">Today’s encouragement</p>
                <h3 className="text-2xl font-black">{done} little wins done</h3>
              </div>
              <HeartHandshake className="size-10 text-pink-300" />
            </div>
            <p className="rounded-[1.4rem] bg-white/10 p-3 text-sm font-medium leading-relaxed text-slate-200">
              You completed {done || "your first"} little {done === 1 ? "win" : "wins"} today. Keep it gentle, visible, and shared.
            </p>
            {archives[0] && (
              <div className="rounded-[1.4rem] bg-gradient-to-r from-fuchsia-500/25 to-cyan-400/25 p-3 text-sm">
                <div className="flex items-center gap-2 font-black"><CalendarHeart className="size-4" /> Last summary</div>
                <p className="mt-1 text-slate-200">You completed {archives[0].completedCount} little wins today.</p>
              </div>
            )}
            <Button variant="outline" onClick={startNewDay} className="w-full border-white/15 bg-white/10 text-white hover:bg-white/15">
              <RotateCcw className="size-4" /> Start New Day
            </Button>
          </motion.aside>
        </div>
      </section>

      <KanbanBoard />
    </main>
  );
}
