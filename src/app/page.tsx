import Link from "next/link";

const quickCards = [
  {
    title: "Plan",
    text: "Create tasks by subject.",
  },
  {
    title: "Track",
    text: "Check priorities and due dates.",
  },
  {
    title: "Complete",
    text: "Mark progress quickly.",
  },
];

export default function HomePage() {
  return (
    <main className="main-shell grid gap-5 md:gap-6">
      <section className="hero-panel animate-rise">
        <p className="chip">Minimal Student Dashboard</p>
        <h1 className="mt-2.5 text-4xl font-black tracking-tight text-main md:text-5xl">StudyFlow</h1>
        <p className="page-subtitle mt-2.5 text-base md:text-lg">
          Organize study tasks with custom subjects.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
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
            <h2 className="section-title">{item.title}</h2>
            <p className="mt-1.5 text-sm muted-text">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
