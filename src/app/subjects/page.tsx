"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  getInitialSubjects,
  getInitialTasks,
  mergeSubjectNames,
  normalizeSubjectName,
  saveSubjects,
} from "@/lib/storage";
import { Task } from "@/types/task";

type SubjectSummary = {
  subject: string;
  total: number;
  completed: number;
  pending: number;
};

type Notice = {
  tone: "error" | "success";
  text: string;
};

const createSubjectSummary = (tasks: Task[], subjects: string[]): SubjectSummary[] => {
  const map = new Map<string, SubjectSummary>();

  subjects.forEach((subject) => {
    const normalized = normalizeSubjectName(subject);
    if (!normalized) {
      return;
    }

    map.set(normalized.toLocaleLowerCase("en"), {
      subject: normalized,
      total: 0,
      completed: 0,
      pending: 0,
    });
  });

  tasks.forEach((task) => {
    const normalized = normalizeSubjectName(task.subject);
    if (!normalized) {
      return;
    }

    const key = normalized.toLocaleLowerCase("en");
    const current = map.get(key) ?? {
      subject: normalized,
      total: 0,
      completed: 0,
      pending: 0,
    };

    current.total += 1;
    if (task.completed) {
      current.completed += 1;
    } else {
      current.pending += 1;
    }

    map.set(key, current);
  });

  return Array.from(map.values()).sort((a, b) => a.subject.localeCompare(b.subject, "en"));
};

export default function SubjectsPage() {
  const [tasks] = useState<Task[]>(() => getInitialTasks());
  const [subjects, setSubjects] = useState<string[]>(() => getInitialSubjects(tasks));
  const [draftSubject, setDraftSubject] = useState("");
  const [notice, setNotice] = useState<Notice | null>(null);

  const mergedSubjects = useMemo(
    () => mergeSubjectNames(subjects, tasks.map((task) => task.subject)),
    [subjects, tasks]
  );

  const summaries = useMemo(() => createSubjectSummary(tasks, mergedSubjects), [tasks, mergedSubjects]);

  const onAddSubject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const candidate = normalizeSubjectName(draftSubject);
    if (!candidate) {
      setNotice({ tone: "error", text: "Enter a valid subject name." });
      return;
    }

    const nextSubjects = mergeSubjectNames(subjects, [candidate]);
    if (nextSubjects.length === subjects.length) {
      setNotice({ tone: "error", text: "Subject already exists." });
      return;
    }

    setSubjects(nextSubjects);
    saveSubjects(nextSubjects);
    setDraftSubject("");
    setNotice({ tone: "success", text: "Subject added." });
  };

  const onDeleteSubject = (subject: string, tasksCount: number) => {
    if (tasksCount > 0) {
      setNotice({
        tone: "error",
        text: "This subject has tasks. Delete or edit those tasks first.",
      });
      return;
    }

    const target = subject.toLocaleLowerCase("en");
    const nextSubjects = subjects.filter((item) => item.toLocaleLowerCase("en") !== target);

    setSubjects(nextSubjects);
    saveSubjects(nextSubjects);
    setNotice({ tone: "success", text: "Subject deleted." });
  };

  return (
    <main className="main-shell grid gap-4 md:gap-5">
      <header className="panel animate-rise">
        <p className="chip">Subjects</p>
        <h1 className="page-title">Subjects Overview</h1>
        <p className="page-subtitle">Add subjects and check progress quickly.</p>
      </header>

      <section className="card animate-rise">
        <h2 className="section-title">Add Subject</h2>
        <form onSubmit={onAddSubject} className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
          <input
            value={draftSubject}
            onChange={(event) => {
              setDraftSubject(event.target.value);
              if (notice) {
                setNotice(null);
              }
            }}
            placeholder="e.g. Philosophy"
            className="field"
          />
          <button type="submit" className="button-primary text-sm">
            Add
          </button>
        </form>
        {notice ? (
          <p className={`mt-2 text-xs font-medium ${notice.tone === "error" ? "text-rose-700" : "text-emerald-700"}`}>
            {notice.text}
          </p>
        ) : null}
      </section>

      {summaries.length === 0 ? (
        <section className="empty-panel">
          <h2 className="text-lg font-semibold text-main">No subjects yet</h2>
          <p className="mt-1 text-sm muted-text">Add your first subject or create a task.</p>
          <Link href="/tasks" className="button-secondary mt-4 inline-flex">
            Go to Tasks
          </Link>
        </section>
      ) : (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {summaries.map((item) => {
            const progress = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;

            return (
              <article key={item.subject} className="card animate-rise p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-main">{item.subject}</h2>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700">
                    {progress}%
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
                  <div className="rounded-lg bg-slate-50 p-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide muted-text">Total</p>
                    <p className="mt-1 text-lg font-bold text-main">{item.total}</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">Done</p>
                    <p className="mt-1 text-lg font-bold text-emerald-700">{item.completed}</p>
                  </div>
                  <div className="rounded-lg bg-amber-50 p-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-700">Open</p>
                    <p className="mt-1 text-lg font-bold text-amber-700">{item.pending}</p>
                  </div>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${progress}%` }}
                    aria-label={`${item.subject} progress: ${progress}%`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteSubject(item.subject, item.total)}
                  className="danger-btn mt-3 w-full text-sm"
                >
                  Delete Subject
                </button>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
