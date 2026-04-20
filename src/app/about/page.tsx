import Link from "next/link";

const technologies = ["Next.js", "TypeScript", "Tailwind CSS", "localStorage"];

const learnings = [
  "React state and reusable components.",
  "Frontend CRUD with local persistence.",
  "Clean responsive layout for presentation.",
];

export default function AboutPage() {
  return (
    <main className="main-shell grid gap-3.5 md:gap-4.5">
      <header className="hero-panel animate-rise">
        <p className="chip">About</p>
        <h1 className="page-title">StudyFlow</h1>
        <p className="page-subtitle">A compact school project for tasks and subjects.</p>
      </header>

      <section className="grid gap-2.5 md:grid-cols-3">
        <article className="card">
          <p className="metric-label">Focus</p>
          <p className="mt-1.5 text-sm font-medium text-main">Simple and explainable</p>
        </article>
        <article className="card">
          <p className="metric-label">Data</p>
          <p className="mt-1.5 text-sm font-medium text-main">Browser localStorage</p>
        </article>
        <article className="card">
          <p className="metric-label">Style</p>
          <p className="mt-1.5 text-sm font-medium text-main">Dashboard inspired UI</p>
        </article>
      </section>

      <section className="card">
        <h2 className="section-title">Tech Stack</h2>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {technologies.map((tech) => (
            <li key={tech} className="badge badge-neutral justify-center rounded-lg px-3 py-2 text-sm font-semibold">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="card">
        <h2 className="section-title">Learning Outcomes</h2>
        <ul className="mt-2 grid gap-1 text-sm muted-text">
          {learnings.map((item) => (
            <li key={item}>- {item}</li>
          ))}
        </ul>
        <div className="mt-3">
          <Link href="/tasks" className="button-secondary inline-flex">
            Go to Tasks
          </Link>
        </div>
      </section>
    </main>
  );
}
