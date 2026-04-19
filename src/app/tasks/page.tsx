"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { TaskStats } from "@/components/TaskStats";
import { getInitialSubjects, getInitialTasks, mergeSubjectNames, saveTasks } from "@/lib/storage";
import { Task, TaskSort, TaskStatus } from "@/types/task";

const priorityRank: Record<Task["priority"], number> = {
  alta: 3,
  media: 2,
  bassa: 1,
};

const sortTasks = (tasks: Task[], sortBy: TaskSort): Task[] => {
  const copy = [...tasks];

  if (sortBy === "scadenza_vicina") {
    return copy.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  if (sortBy === "scadenza_lontana") {
    return copy.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
  }

  if (sortBy === "priorita_alta") {
    return copy.sort((a, b) => {
      const byPriority = priorityRank[b.priority] - priorityRank[a.priority];
      if (byPriority !== 0) {
        return byPriority;
      }

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(() => getInitialTasks());
  const [storedSubjects] = useState<string[]>(() => getInitialSubjects(tasks));
  const [subjectFilter, setSubjectFilter] = useState<string>("tutte");
  const [statusFilter, setStatusFilter] = useState<TaskStatus>("tutte");
  const [sortBy, setSortBy] = useState<TaskSort>("scadenza_vicina");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTaskId(null);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
    }
  };

  const startEditTask = (id: string) => {
    setEditingTaskId(id);
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
  };

  const editingTask = useMemo(
    () => tasks.find((task) => task.id === editingTaskId) ?? null,
    [tasks, editingTaskId]
  );

  const availableSubjects = useMemo(
    () => mergeSubjectNames(storedSubjects, tasks.map((task) => task.subject)),
    [storedSubjects, tasks]
  );

  const visibleTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const bySubject = subjectFilter === "tutte" || task.subject === subjectFilter;
      const byStatus =
        statusFilter === "tutte" ||
        (statusFilter === "completato" ? task.completed : !task.completed);

      return bySubject && byStatus;
    });

    return sortTasks(filtered, sortBy);
  }, [tasks, subjectFilter, statusFilter, sortBy]);

  return (
    <main className="main-shell grid gap-4 md:gap-5">
      <header className="panel animate-rise">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="chip">Tasks</p>
            <h1 className="page-title">Task Dashboard</h1>
            <p className="page-subtitle">Plan, track, and complete your school work.</p>
          </div>
          <Link href="/" className="button-secondary text-sm">
            Home
          </Link>
        </div>
      </header>

      <TaskStats tasks={tasks} />

      <section className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <TaskForm
          key={editingTask?.id ?? "new-task"}
          editingTask={editingTask}
          subjects={availableSubjects}
          onCreateTask={addTask}
          onUpdateTask={updateTask}
          onCancelEdit={cancelEditTask}
        />

        <TaskFilters
          subjectFilter={subjectFilter}
          statusFilter={statusFilter}
          sortBy={sortBy}
          subjects={availableSubjects}
          onSubjectFilterChange={setSubjectFilter}
          onStatusFilterChange={setStatusFilter}
          onSortChange={setSortBy}
        />
      </section>

      <section className="grid gap-2.5">
        <div className="flex items-center justify-between">
          <h2 className="section-title text-base">Task List</h2>
          <p className="text-sm muted-text">{visibleTasks.length} items</p>
        </div>

        <TaskList
          tasks={visibleTasks}
          onToggleComplete={toggleTaskCompletion}
          onEdit={startEditTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}
