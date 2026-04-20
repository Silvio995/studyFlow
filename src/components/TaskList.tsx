import { TaskCard } from "@/components/TaskCard";
import { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskList({ tasks, onToggleComplete, onEdit, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-panel">
        <h3 className="text-base font-semibold text-main">No tasks found</h3>
        <p className="mt-1 text-sm muted-text">Try different filters or add a new task.</p>
      </div>
    );
  }

  return (
    <section className="grid gap-2.5">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}
