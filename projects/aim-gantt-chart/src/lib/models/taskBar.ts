import {TaskModel} from './task.models';

export interface TaskBar {
  invalid?: boolean;
  height?: number;
  width?: number;
  x?: number;
  y?: number;
  progressWidth?: number;
  task?: TaskModel;
  duration?: number;
  cornerRadius?: number;
  actionCompleted?: boolean;
}
