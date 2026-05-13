import type { TaskStatus } from "@/types/task";

export type BoardColumn = {
  id: TaskStatus;
  title: string;
  eyebrow: string;
  accent: string;
  emptyState: string;
};

export const boardColumns: BoardColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    eyebrow: "Someday",
    accent: "from-violet-500 to-fuchsia-500",
    emptyState: "No chores hiding here. Add a little win when it pops up.",
  },
  {
    id: "todo",
    title: "To Do",
    eyebrow: "Today",
    accent: "from-cyan-400 to-blue-500",
    emptyState: "Pull in a task from backlog to start your day.",
  },
  {
    id: "in_progress",
    title: "In Progress",
    eyebrow: "Doing",
    accent: "from-amber-400 to-orange-500",
    emptyState: "Start with one tiny step. Momentum follows.",
  },
  {
    id: "on_hold",
    title: "On Hold",
    eyebrow: "Paused",
    accent: "from-slate-400 to-indigo-500",
    emptyState: "Waiting on supplies, energy, or the dishwasher cycle.",
  },
  {
    id: "review",
    title: "Spouse Review",
    eyebrow: "High five?",
    accent: "from-pink-400 to-rose-500",
    emptyState: "Drop shared tasks here for a loving second look.",
  },
  {
    id: "done",
    title: "Done",
    eyebrow: "Celebrate",
    accent: "from-emerald-400 to-teal-500",
    emptyState: "Completed little wins will glow here.",
  },
];
