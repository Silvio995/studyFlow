"use client";

import { TaskSort, TaskStatus } from "@/types/task";

type TaskFiltersProps = {
  subjectFilter: string;
  statusFilter: TaskStatus;
  sortBy: TaskSort;
  subjects: string[];
  onSubjectFilterChange: (value: string) => void;
  onStatusFilterChange: (value: TaskStatus) => void;
  onSortChange: (value: TaskSort) => void;
};

export function TaskFilters({
  subjectFilter,
  statusFilter,
  sortBy,
  subjects,
  onSubjectFilterChange,
  onStatusFilterChange,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <section className="card grid content-start gap-3 animate-rise">
      <h2 className="section-title">Filters</h2>

      <label className="grid gap-1.5 text-sm muted-text">
        Subject
        <select
          value={subjectFilter}
          onChange={(event) => onSubjectFilterChange(event.target.value)}
          className="field"
        >
          <option value="tutte">All subjects</option>
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-1.5 text-sm muted-text">
        Status
        <select
          value={statusFilter}
          onChange={(event) => onStatusFilterChange(event.target.value as TaskStatus)}
          className="field"
        >
          <option value="tutte">All</option>
          <option value="completato">Completed</option>
          <option value="non_completato">Open</option>
        </select>
      </label>

      <label className="grid gap-1.5 text-sm muted-text">
        Sort by
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as TaskSort)}
          className="field"
        >
          <option value="scadenza_vicina">Due date (nearest)</option>
          <option value="scadenza_lontana">Due date (latest)</option>
          <option value="priorita_alta">Priority (high to low)</option>
          <option value="piu_recenti">Newest tasks</option>
        </select>
      </label>
    </section>
  );
}
