export interface TaskModel {
  start: Date;
  end: Date;
  name: string;
  id: string;
  progress: number;
  level: number;
  overdue: boolean;
  taskList: TaskModel[];
}
