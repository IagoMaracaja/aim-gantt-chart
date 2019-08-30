import {TaskModel} from './task.models';

export class ChartOptions {
  layers?: Layer;
  highlightWeekXCoords?: number;
  startPosition?: number;
  dateStartPosition?: number;
  taskLevelOneQty?: number;
  allTasks?: TaskModel[];
  highlightMonthNameXCoords?: number;
  todayXCoords?: number;
  highlightMonthXCoords?: number;
  tasks?: any;
  svg?: SVGAElement;
  calendar?: Date[];
}

class Layer {
  grid?: SVGAElement;
  bar?: SVGAElement;
  divisor?: SVGAElement;
}
