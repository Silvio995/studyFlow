export type TaskPriority = "bassa" | "media" | "alta";
export type TaskStatus = "tutte" | "completato" | "non_completato";
export type TaskSort =
  | "scadenza_vicina"
  | "scadenza_lontana"
  | "priorita_alta"
  | "piu_recenti";

export type Task = {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
  createdAt: string;
};
