import Link from "next/link";

const technologies = ["Next.js", "TypeScript", "Tailwind CSS", "localStorage"];

const learnings = [
  "React state and reusable components.",
  "Frontend CRUD with local persistence.",
  "Clean responsive layout for presentation.",
];

export default function AboutPage() {
  return (
    <main className="main-shell grid gap-4 md:gap-5">
      <header className="panel animate-rise">
        <p className="chip">About</p>
        <h1 className="page-title">StudyFlow</h1>
        <p className="page-subtitle">A simple school project for tasks and subjects.</p>
      </header>

      <section className="card">
        <h2 className="section-title">Purpose</h2>
        <p className="mt-1.5 text-sm muted-text">Build a small app that is easy to explain in class.</p>
      </section>

      <section className="card">
        <h2 className="section-title">Tech Stack</h2>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {technologies.map((tech) => (
            <li key={tech} className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
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
