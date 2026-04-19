"use client";

import { FormEvent, useMemo, useState } from "react";
import { mergeSubjectNames } from "@/lib/storage";
import { Task, TaskPriority } from "@/types/task";

type TaskFormProps = {
  editingTask: Task | null;
  subjects: string[];
  onCreateTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  onCancelEdit: () => void;
};

type FormState = {
  title: string;
  subject: string;
  dueDate: string;
  priority: TaskPriority;
};

const priorityLabelMap: Record<TaskPriority, string> = {
  bassa: "Low",
  media: "Medium",
  alta: "High",
};

const initialState: FormState = {
  title: "",
  subject: "",
  dueDate: "",
  priority: "media",
};

const getInitialState = (task: Task | null): FormState => {
  if (!task) {
    return initialState;
  }

  return {
    title: task.title,
    subject: task.subject,
    dueDate: task.dueDate,
    priority: task.priority,
  };
};

export function TaskForm({
  editingTask,
  subjects,
  onCreateTask,
  onUpdateTask,
  onCancelEdit,
}: TaskFormProps) {
  const [form, setForm] = useState<FormState>(() => getInitialState(editingTask));
  const subjectOptions = useMemo(
    () => mergeSubjectNames(subjects, form.subject ? [form.subject] : []),
    [subjects, form.subject]
  );
  const hasSubjects = subjectOptions.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.title.trim() || !form.subject.trim() || !form.dueDate) {
      return;
    }

    const baseTask = {
      title: form.title.trim(),
      subject: form.subject.trim(),
      dueDate: form.dueDate,
      priority: form.priority,
    };

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        ...baseTask,
      });
      return;
    }

    onCreateTask({
      id: crypto.randomUUID(),
      ...baseTask,
      completed: false,
      createdAt: new Date().toISOString(),
    });
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="card grid gap-3 animate-rise">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="section-title">{editingTask ? "Edit Task" : "New Task"}</h2>
        {editingTask ? (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
            Editing
          </span>
        ) : null}
      </div>

      <input
        value={form.title}
        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        placeholder="Task title"
        className="field"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <select
          value={form.subject}
          onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
          disabled={!hasSubjects}
          className="field disabled:cursor-not-allowed disabled:opacity-70"
        >
          <option value="">Select subject</option>
          {subjectOptions.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={form.dueDate}
          onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
          className="field"
        />
      </div>
      {!hasSubjects ? <p className="text-xs muted-text">Add a subject first in Subjects.</p> : null}

      <select
        value={form.priority}
        onChange={(event) =>
          setForm((prev) => ({
            ...prev,
            priority: event.target.value as TaskPriority,
          }))
        }
        className="field"
      >
        {Object.entries(priorityLabelMap).map(([value, label]) => (
          <option key={value} value={value}>
            {label} priority
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2 pt-1">
        <button type="submit" className="button-primary text-sm">
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
        {editingTask ? (
          <button type="button" onClick={onCancelEdit} className="button-secondary text-sm">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
