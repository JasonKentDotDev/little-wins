"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Check, Clock3, GripVertical, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTaskStore } from "@/store/use-task-store";
import type { Task } from "@/types/task";

const priorityStyles = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-200",
  high: "bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-rose-200",
};

export function TaskCard({ task }: { task: Task }) {
  const toggleChecklistItem = useTaskStore((state) => state.toggleChecklistItem);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: "task", task },
  });
  const completed = task.checklist.filter((item) => item.completed).length;
  const total = task.checklist.length || 1;
  const percent = Math.round((completed / total) * 100);

  return (
    <motion.article
      ref={setNodeRef}
      layout
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "group relative rounded-[1.65rem] border border-white/70 bg-white/90 p-4 shadow-xl shadow-slate-900/5 backdrop-blur transition dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/20",
        isDragging && "z-30 rotate-1 scale-[1.02] shadow-2xl shadow-fuchsia-500/20",
        task.status === "done" && "ring-2 ring-emerald-300/70 dark:ring-emerald-400/40",
      )}
      whileHover={{ y: -2 }}
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-100 to-cyan-100 text-xl shadow-inner dark:from-violet-500/20 dark:to-cyan-400/20">
          {task.emoji ?? "✅"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-black leading-tight text-slate-950 dark:text-white">{task.title}</h3>
            <button
              className="-mr-1 rounded-full p-1 text-slate-300 transition hover:bg-slate-100 hover:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:hover:bg-white/10"
              aria-label={`Drag ${task.title}`}
              {...attributes}
              {...listeners}
            >
              <GripVertical className="size-5" />
            </button>
          </div>
          {task.description && <p className="mt-1 text-sm leading-snug text-slate-500 dark:text-slate-300">{task.description}</p>}
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
        {task.assignedTo && <span className="rounded-full bg-cyan-100 px-2.5 py-1 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-200">{task.assignedTo}</span>}
        {task.priority && <span className={cn("rounded-full px-2.5 py-1 capitalize", priorityStyles[task.priority])}>{task.priority}</span>}
        {task.estimateMinutes && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-600 dark:bg-white/10 dark:text-slate-200">
            <Clock3 className="size-3.5" /> {task.estimateMinutes}m
          </span>
        )}
      </div>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10" aria-hidden="true">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        />
      </div>

      <div className="space-y-2" aria-label={`${task.title} checklist`}>
        {task.checklist.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex min-h-10 w-full items-center gap-3 rounded-2xl px-2 py-1.5 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 dark:hover:bg-white/5"
            onClick={() => toggleChecklistItem(task.id, item.id)}
            aria-pressed={item.completed}
          >
            <motion.span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full border-2 transition",
                item.completed
                  ? "border-transparent bg-gradient-to-br from-emerald-400 to-cyan-400 text-white shadow-lg shadow-emerald-400/25"
                  : "border-slate-200 bg-white dark:border-white/20 dark:bg-slate-950",
              )}
              whileTap={{ scale: 0.82 }}
            >
              {item.completed && <Check className="size-4" />}
            </motion.span>
            <span className={cn("text-sm font-medium text-slate-700 transition dark:text-slate-200", item.completed && "text-slate-400 line-through decoration-2 dark:text-slate-500")}>{item.text}</span>
          </button>
        ))}
      </div>

      {task.status === "done" && (
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-200">
          <Sparkles className="size-4" /> Little win complete!
        </div>
      )}
    </motion.article>
  );
}
