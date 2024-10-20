export enum Status {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  DEFERRED = "DEFERRED",
}
export enum Priority {
  OPTIONAL = "OPTIONAL",
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
  ASAP = "ASAP",
}

export type Task = {
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  dueDate: Date;
};

export type ArchivedTask = {
  title: string;
  description?: string;
};

export type TaskFilters = {
  status?: Status;
  priority?: Priority;
  categoryId?: number;
};

export type SubtaskFilters = {
  status?: Status;
  priority?: Priority;
};

export type TaskSort = {
  [key: string]: "asc" | "desc";
};
