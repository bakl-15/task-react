export type Priority = "urgente" | "Moyenne" | "Basse";

export interface Todo {
  id: number;
  text: string;
  priority: Priority;
}

export interface Column {
  key: Priority;
  label: string;
}
