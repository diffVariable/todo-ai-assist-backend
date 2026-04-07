export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
} as const;

export type TTaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];

export interface ISubtask {
  id?: string;
  title: string;
  description: string;
  status: TTaskStatus;
}

export interface ITask {
  id?: string;
  title: string;
  description: string;
  status: TTaskStatus;
  isOverwhelming: boolean;
  subtasks?: ISubtask[];
}

export interface IBrainDump {
  id?: string;
  userRawInput: string;
  task: ITask[];
}
