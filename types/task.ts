export type TaskStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "on_hold"
  | "review"
  | "done";

export type Priority = "low" | "medium" | "high";

export type ChecklistItem = {
  id: string;
  text: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  checklist: ChecklistItem[];
  status: TaskStatus;
  assignedTo?: string;
  estimateMinutes?: number;
  priority?: Priority;
  emoji?: string;
  dueDate?: string;
  createdAt: number;
  updatedAt: number;
};

export type DailyArchive = {
  id: string;
  date: string;
  completedCount: number;
  taskTitles: string[];
  createdAt: number;
};

export type ThemePreference = "system" | "light" | "dark";
