"use client";

import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/use-task-store";
import type { TaskStatus } from "@/types/task";

export function QuickAdd({ status = "backlog", compact = false }: { status?: TaskStatus; compact?: boolean }) {
  const [title, setTitle] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    addTask(title, status);
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2" aria-label="Quick add task">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={compact ? "Add win" : "Add a little win…"}
        className="min-h-11 min-w-0 flex-1 rounded-full border border-white/70 bg-white/80 px-4 text-sm font-semibold text-slate-800 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-400"
      />
      <Button type="submit" size={compact ? "icon" : "default"} variant="gradient" aria-label="Add task">
        <Plus className="size-5" />
        {!compact && <span>Add</span>}
      </Button>
    </form>
  );
}
