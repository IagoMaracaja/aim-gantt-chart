interface Task {
  name: string;
  start: string;
  end: string;
  level: number;
  progress: number;
  overdue: boolean;
  taskList: TaskList[];
}

interface TaskList {
  start: string;
  end: string;
  name: string;
  id: string;
  progress: number;
  level: number;
  overdue: boolean;
}
