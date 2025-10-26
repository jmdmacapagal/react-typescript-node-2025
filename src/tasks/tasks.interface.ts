export interface ITask {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "normal" | "high";
  dueDate: Date;
}

export interface IPartialTaskWithId extends Partial<ITask> {
  _id: string;
}
