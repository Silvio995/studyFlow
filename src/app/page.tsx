import Link from "next/link";

const quickCards = [
  {
    title: "Plan",
    text: "Build tasks by subject in seconds.",
  },
  {
    title: "Track",
    text: "See priorities and deadlines clearly.",
  },
  {
    title: "Complete",
    text: "Close tasks and keep momentum.",
  },
];

const overview = [
  { label: "Flow", value: "Focused" },
  { label: "Mode", value: "Dashboard" },
  { label: "Sync", value: "Local" },
];

export default function HomePage() {
  return (
    <main className="main-shell grid gap-4 md:gap-5">
      <section className="hero-panel animate-rise">
        <p className="chip">StudyFlow Pulse</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-main md:text-5xl">Study Dashboard</h1>
        <p className="page-subtitle mt-2">Organize tasks with a fast and clean workflow.</p>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {overview.map((item) => (
            <article key={item.label} className="rounded-xl border border-[var(--border)] bg-[color:var(--surface)] px-3 py-2.5">
              <p className="metric-label">{item.label}</p>
              <p className="mt-1 text-base font-bold text-main">{item.value}</p>
            </article>
          ))}
        </div>

        <div className="mt-3.5 flex flex-wrap gap-2">
          <Link href="/tasks" className="button-primary">
            Open Tasks
          </Link>
          <Link href="/subjects" className="button-secondary">
            Open Subjects
          </Link>
        </div>
      </section>

      <section className="grid gap-2.5 md:grid-cols-3">
        {quickCards.map((item) => (
          <article key={item.title} className="card animate-rise p-3">
            <p className="chip">{item.title}</p>
            <p className="mt-2 text-sm font-medium muted-text">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
