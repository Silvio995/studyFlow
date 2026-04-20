import { Task } from "@/types/task";

const TASKS_KEY = "studyflow.tasks";
const SUBJECTS_KEY = "studyflow.subjects";
const THEME_KEY = "studyflow.theme";

export type ThemeMode = "light" | "dark";

const canUseStorage = (): boolean => typeof window !== "undefined";

const hasStorageKey = (key: string): boolean => {
  if (!canUseStorage()) {
    return false;
  }

  return window.localStorage.getItem(key) !== null;
};

const sortSubjects = (subjects: string[]): string[] =>
  [...subjects].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));

export const normalizeSubjectName = (value: string): string => value.trim();

export const normalizeSubjects = (subjects: string[]): string[] => {
  const map = new Map<string, string>();

  subjects.forEach((subject) => {
    const normalized = normalizeSubjectName(subject);
    if (!normalized) {
      return;
    }

    const key = normalized.toLocaleLowerCase("en");
    if (!map.has(key)) {
      map.set(key, normalized);
    }
  });

  return sortSubjects(Array.from(map.values()));
};

export const mergeSubjectNames = (...lists: string[][]): string[] => normalizeSubjects(lists.flat());

const isThemeMode = (value: string): value is ThemeMode => value === "light" || value === "dark";

const toIsoDate = (base: Date, deltaDays: number) => {
  const date = new Date(base);
  date.setDate(date.getDate() + deltaDays);
  return date.toISOString().slice(0, 10);
};

const getDemoTasks = (): Task[] => {
  const now = new Date();
  const createdAt = now.toISOString();

  return [
    {
      id: "demo-math",
      title: "Practice quadratic equations",
      subject: "Math",
      dueDate: toIsoDate(now, 2),
      priority: "alta",
      completed: false,
      createdAt,
    },
    {
      id: "demo-history",
      title: "Review the French Revolution",
      subject: "History",
      dueDate: toIsoDate(now, 5),
      priority: "media",
      completed: false,
      createdAt,
    },
    {
      id: "demo-english",
      title: "Prepare climate change presentation",
      subject: "English",
      dueDate: toIsoDate(now, 1),
      priority: "alta",
      completed: false,
      createdAt,
    },
    {
      id: "demo-science",
      title: "Complete cell lab worksheet",
      subject: "Science",
      dueDate: toIsoDate(now, 7),
      priority: "bassa",
      completed: true,
      createdAt,
    },
  ];
};

export const getStoredTasks = (): Task[] => {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(TASKS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getStoredSubjects = (): string[] => {
  if (!canUseStorage()) {
    return [];
  }

  const raw = window.localStorage.getItem(SUBJECTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? normalizeSubjects(parsed.filter((item) => typeof item === "string"))
      : [];
  } catch {
    return [];
  }
};

export const getStoredTheme = (): ThemeMode => {
  if (!canUseStorage()) {
    return "light";
  }

  const raw = window.localStorage.getItem(THEME_KEY);
  return raw && isThemeMode(raw) ? raw : "light";
};

export const getInitialTasks = (): Task[] => {
  if (!canUseStorage()) {
    return getDemoTasks();
  }

  if (!hasStorageKey(TASKS_KEY)) {
    const demoTasks = getDemoTasks();
    saveTasks(demoTasks);
    return demoTasks;
  }

  const raw = window.localStorage.getItem(TASKS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Task[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getInitialSubjects = (tasks: Task[]): string[] => {
  if (!canUseStorage()) {
    return normalizeSubjects(tasks.map((task) => task.subject));
  }

  if (!hasStorageKey(SUBJECTS_KEY)) {
    const derived = normalizeSubjects(tasks.map((task) => task.subject));
    saveSubjects(derived);
    return derived;
  }

  const raw = window.localStorage.getItem(SUBJECTS_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? normalizeSubjects(parsed.filter((item) => typeof item === "string"))
      : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const saveSubjects = (subjects: string[]): void => {
  if (!canUseStorage()) {
    return;
  }

  const normalized = normalizeSubjects(subjects);
  window.localStorage.setItem(SUBJECTS_KEY, JSON.stringify(normalized));
};

export const saveTheme = (theme: ThemeMode): void => {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(THEME_KEY, theme);
};

export const applyTheme = (theme: ThemeMode): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.setAttribute("data-theme", theme);
};
