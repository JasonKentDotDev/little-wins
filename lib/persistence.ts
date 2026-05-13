import { get, set } from "idb-keyval";
import type { DailyArchive, Task } from "@/types/task";

const TASKS_KEY = "little-wins:tasks";
const ARCHIVE_KEY = "little-wins:archive";

const storageAvailable = () => typeof window !== "undefined";

export async function loadPersistedTasks(): Promise<Task[] | null> {
  if (!storageAvailable()) return null;

  try {
    const tasks = await get<Task[]>(TASKS_KEY);
    if (tasks?.length) return tasks;
  } catch {
    const fallback = window.localStorage.getItem(TASKS_KEY);
    return fallback ? (JSON.parse(fallback) as Task[]) : null;
  }

  const fallback = window.localStorage.getItem(TASKS_KEY);
  return fallback ? (JSON.parse(fallback) as Task[]) : null;
}

export async function persistTasks(tasks: Task[]) {
  if (!storageAvailable()) return;

  window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  try {
    await set(TASKS_KEY, tasks);
  } catch {
    // localStorage already captured the fallback state.
  }
}

export async function loadArchives(): Promise<DailyArchive[]> {
  if (!storageAvailable()) return [];

  try {
    return (await get<DailyArchive[]>(ARCHIVE_KEY)) ?? [];
  } catch {
    const fallback = window.localStorage.getItem(ARCHIVE_KEY);
    return fallback ? (JSON.parse(fallback) as DailyArchive[]) : [];
  }
}

export async function persistArchives(archives: DailyArchive[]) {
  if (!storageAvailable()) return;

  window.localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archives));
  try {
    await set(ARCHIVE_KEY, archives);
  } catch {
    // localStorage already captured the fallback state.
  }
}
