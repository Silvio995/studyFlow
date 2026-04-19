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
    <article className="card animate-rise p-3.5 transition duration-200 hover:shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2.5">
        <div>
          <h3 className="text-base font-semibold text-main">{task.title}</h3>
          <p className="mt-0.5 text-sm muted-text">{task.subject}</p>
        </div>
        <Badge tone={priorityTone[task.priority]}>{priorityLabel[task.priority]} priority</Badge>
      </div>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        <Badge>{new Date(task.dueDate).toLocaleDateString("en-US")}</Badge>
        <Badge tone={task.completed ? "success" : "neutral"}>
          {task.completed ? "Completed" : "Open"}
        </Badge>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        <button onClick={() => onToggleComplete(task.id)} className="button-primary text-sm">
          {task.completed ? "Mark Open" : "Mark Done"}
        </button>
        <button onClick={() => onEdit(task.id)} className="button-secondary text-sm">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="danger-btn text-sm">
          Delete
        </button>
      </div>
    </article>
  );
}
