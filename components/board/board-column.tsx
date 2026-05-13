"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { BoardColumn as BoardColumnType } from "@/lib/columns";
import { TaskCard } from "@/components/cards/task-card";
import { QuickAdd } from "@/components/board/quick-add";
import type { Task } from "@/types/task";

export function BoardColumn({ column, tasks }: { column: BoardColumnType; tasks: Task[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id, data: { type: "column", status: column.id } });

  return (
    <section
      ref={setNodeRef}
      className={cn(
        "flex h-[68vh] min-h-[620px] w-[86vw] max-w-[23rem] shrink-0 flex-col rounded-[2rem] border border-white/60 bg-white/45 p-3 shadow-2xl shadow-slate-900/5 backdrop-blur-xl transition dark:border-white/10 dark:bg-white/[0.06] md:w-[23rem]",
        isOver && "scale-[1.01] border-cyan-300 bg-cyan-50/60 shadow-cyan-300/20 dark:border-cyan-300/50 dark:bg-cyan-400/10",
      )}
      aria-label={`${column.title} column with ${tasks.length} tasks`}
    >
      <header className="mb-3 rounded-[1.5rem] bg-white/75 p-3 shadow-inner dark:bg-slate-950/45">
        <div className={cn("mb-2 h-1.5 rounded-full bg-gradient-to-r", column.accent)} />
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">{column.eyebrow}</p>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">{column.title}</h2>
          </div>
          <span className="grid size-9 place-items-center rounded-full bg-slate-100 text-sm font-black text-slate-600 dark:bg-white/10 dark:text-slate-200">{tasks.length}</span>
        </div>
      </header>

      <div className="mb-3">
        <QuickAdd status={column.id} compact />
      </div>

      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="scrollbar-soft flex-1 space-y-3 overflow-y-auto overscroll-contain pr-1 pb-2">
          <AnimatePresence initial={false}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </AnimatePresence>
          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid min-h-40 place-items-center rounded-[1.5rem] border border-dashed border-slate-200 bg-white/45 p-5 text-center text-sm font-semibold text-slate-400 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-500"
            >
              {column.emptyState}
            </motion.div>
          )}
        </div>
      </SortableContext>
    </section>
  );
}
