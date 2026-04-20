import { Task } from "@/types/task";

type TaskStatsProps = {
  tasks: Task[];
};

const getDaysLeft = (dateText: string) => {
  const now = new Date();
  const due = new Date(dateText);
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export function TaskStats({ tasks }: TaskStatsProps) {
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const dueSoon = tasks.filter((task) => {
    const daysLeft = getDaysLeft(task.dueDate);
    return !task.completed && daysLeft >= 0 && daysLeft <= 3;
  }).length;

  const cards = [
    { label: "Total", value: tasks.length, type: "neutral" },
    { label: "Done", value: completed, type: "accent" },
    { label: "Open", value: pending, type: "warning" },
    { label: "Due Soon", value: dueSoon, type: "danger" },
  ] as const;

  return (
    <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className={`card metric-card animate-rise ${
            card.type === "accent"
              ? "metric-accent"
              : card.type === "warning"
                ? "metric-warning"
                : card.type === "danger"
                  ? "metric-danger"
                  : ""
          }`}
        >
          <p className="metric-label">{card.label}</p>
          <p
            className={`metric-value ${
              card.type === "accent"
                ? "is-accent"
                : card.type === "warning"
                  ? "is-warning"
                  : card.type === "danger"
                    ? "is-danger"
                    : ""
            }`}
          >
            {card.value}
          </p>
        </article>
      ))}
    </section>
  );
}
