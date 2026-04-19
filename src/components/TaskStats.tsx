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
    { label: "Total", value: tasks.length, tone: "text-main", bg: "bg-white" },
    { label: "Done", value: completed, tone: "text-emerald-700", bg: "bg-emerald-50" },
    { label: "Open", value: pending, tone: "text-amber-700", bg: "bg-amber-50" },
    { label: "Due Soon", value: dueSoon, tone: "text-rose-700", bg: "bg-rose-50" },
  ];

  return (
    <section className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className={`card ${card.bg} animate-rise p-3`}>
          <p className="text-[11px] font-semibold uppercase tracking-wide muted-text">{card.label}</p>
          <p className={`mt-1.5 text-2xl font-bold ${card.tone}`}>{card.value}</p>
        </article>
      ))}
    </section>
  );
}
