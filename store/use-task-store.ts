"use client";

import { create } from "zustand";
import { loadArchives, loadPersistedTasks, persistArchives, persistTasks } from "@/lib/persistence";
import { seededTasks } from "@/lib/seed";
import { todayKey, uid } from "@/lib/utils";
import type { DailyArchive, Task, TaskStatus } from "@/types/task";

type TaskState = {
  tasks: Task[];
  archives: DailyArchive[];
  hydrated: boolean;
  lastCelebration: number;
  hydrate: () => Promise<void>;
  addTask: (title: string, status?: TaskStatus) => void;
  moveTask: (taskId: string, status: TaskStatus) => void;
  toggleChecklistItem: (taskId: string, itemId: string) => void;
  startNewDay: () => void;
};

const saveState = (tasks: Task[], archives?: DailyArchive[]) => {
  void persistTasks(tasks);
  if (archives) void persistArchives(archives);
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: seededTasks,
  archives: [],
  hydrated: false,
  lastCelebration: 0,
  hydrate: async () => {
    const [persistedTasks, archives] = await Promise.all([loadPersistedTasks(), loadArchives()]);
    set({ tasks: persistedTasks ?? seededTasks, archives, hydrated: true });
  },
  addTask: (title, status = "backlog") => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const now = Date.now();
    const task: Task = {
      id: uid("task"),
      title: trimmed,
      description: "A fresh little win for your home sprint.",
      emoji: "🌟",
      status,
      priority: "medium",
      estimateMinutes: 10,
      checklist: [{ id: uid("check"), text: "Make the first tiny move", completed: false }],
      createdAt: now,
      updatedAt: now,
    };
    const tasks = [task, ...get().tasks];
    set({ tasks });
    saveState(tasks);
  },
  moveTask: (taskId, status) => {
    const now = Date.now();
    let celebrate = false;
    const tasks = get().tasks.map((task) => {
      if (task.id !== taskId) return task;
      celebrate = status === "done" && task.status !== "done";
      return {
        ...task,
        status,
        checklist: status === "done" ? task.checklist.map((item) => ({ ...item, completed: true })) : task.checklist,
        updatedAt: now,
      };
    });
    set({ tasks, lastCelebration: celebrate ? now : get().lastCelebration });
    saveState(tasks);
  },
  toggleChecklistItem: (taskId, itemId) => {
    const now = Date.now();
    let celebrate = false;
    const tasks = get().tasks.map((task) => {
      if (task.id !== taskId) return task;
      const checklist = task.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item,
      );
      const completed = checklist.length > 0 && checklist.every((item) => item.completed);
      celebrate = completed && task.status !== "done";
      return { ...task, checklist, status: completed ? "done" : task.status, updatedAt: now };
    });
    set({ tasks, lastCelebration: celebrate ? now : get().lastCelebration });
    saveState(tasks);
  },
  startNewDay: () => {
    const state = get();
    const completed = state.tasks.filter((task) => task.status === "done");
    const archive: DailyArchive = {
      id: uid("day"),
      date: todayKey(),
      completedCount: completed.length,
      taskTitles: completed.map((task) => task.title),
      createdAt: Date.now(),
    };
    const tasks = state.tasks
      .filter((task) => task.status !== "done")
      .map((task) => ({ ...task, status: task.status === "backlog" ? task.status : "todo", updatedAt: Date.now() }));
    const archives = [archive, ...state.archives].slice(0, 14);
    set({ tasks, archives, lastCelebration: Date.now() });
    saveState(tasks, archives);
  },
}));
