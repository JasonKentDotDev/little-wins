"use client";

import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { boardColumns } from "@/lib/columns";
import { BoardColumn } from "@/components/board/board-column";
import { useTaskStore } from "@/store/use-task-store";
import type { TaskStatus } from "@/types/task";

const columnIds = new Set<TaskStatus>(boardColumns.map((column) => column.id));

export function KanbanBoard() {
  const tasks = useTaskStore((state) => state.tasks);
  const hydrate = useTaskStore((state) => state.hydrate);
  const moveTask = useTaskStore((state) => state.moveTask);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    if (!activeTask) return;

    const overId = String(over.id);
    const destination = columnIds.has(overId as TaskStatus)
      ? (overId as TaskStatus)
      : tasks.find((task) => task.id === overId)?.status;

    if (destination && destination !== activeTask.status) moveTask(activeTask.id, destination);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <motion.div
        className="scrollbar-soft flex snap-x gap-4 overflow-x-auto overscroll-x-contain px-4 pb-8 pt-2 md:px-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        aria-label="Little Wins kanban board"
      >
        {boardColumns.map((column) => (
          <div key={column.id} className="snap-center">
            <BoardColumn column={column} tasks={tasks.filter((task) => task.status === column.id)} />
          </div>
        ))}
      </motion.div>
    </DndContext>
  );
}
