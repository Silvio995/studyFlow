import { Badge } from "@/components/Badge";
import { Task } from "@/types/task";

type TaskCardProps = {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const priorityTone = {
  bassa: "neutral",
  media: "warning",
  alta: "danger",
} as const;

const priorityLabel = {
  bassa: "Low",
  media: "Medium",
  alta: "High",
} as const;

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) {
  return (
    <article className="card task-card animate-rise p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-[0.98rem] font-semibold leading-tight text-main">{task.title}</h3>
          <p className="mt-0.5 text-xs font-medium tracking-wide muted-text">{task.subject}</p>
        </div>
        <Badge tone={priorityTone[task.priority]}>{priorityLabel[task.priority]} priority</Badge>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Badge>{new Date(task.dueDate).toLocaleDateString("en-US")}</Badge>
        <Badge tone={task.completed ? "success" : "neutral"}>{task.completed ? "Completed" : "Open"}</Badge>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <button onClick={() => onToggleComplete(task.id)} className="button-primary text-xs">
          {task.completed ? "Mark Open" : "Mark Done"}
        </button>
        <button onClick={() => onEdit(task.id)} className="button-secondary text-xs">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="danger-btn text-xs">
          Delete
        </button>
      </div>
    </article>
  );
}
