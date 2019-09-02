import {Gantt} from '../models/gantt.models';
import {ChartOptions} from '../models/chartOptions.models';
import {GanttOptions} from '../models/ganttOptions.models';
import {TaskBar} from '../models/taskBar';
import {animateSVG, createSVG} from '../utils/svg-utils';
import {diffBetweenDates} from '../utils/date-utils';
import {Scale, ViewMode} from '../utils/enums';
import {TaskModel} from '../models/task.models';

export class Bar {
  gantt: Gantt;
  chartOptions: ChartOptions;
  options: GanttOptions;
  taskBar: TaskBar;
  private barGroup: SVGAElement;
  group: SVGAElement;
  private handleGroup: SVGAElement;

  constructor(gantt: Gantt, chartOptions: ChartOptions, options: GanttOptions, task: TaskModel) {
    this.gantt = gantt;
    this.chartOptions = chartOptions;
    this.options = options;
    this.taskBar.task = task;
  }

  createBars() {
    this.prepare();
    this.draw();
  }

  private prepare() {
    this.prepareValues();
    // this.prepareHelpers();
  }

  prepareValues() {
    this.taskBar.invalid = this.taskBar.task.invalid;
    this.taskBar.height = this.options.barHeight;
    this.taskBar.x = this.computeX() + this.chartOptions.startPosition;
    this.taskBar.y = this.computeY();
    this.taskBar.cornerRadius = this.options.barCornerRadius;
    this.taskBar.duration =
      diffBetweenDates(this.taskBar.task.end, this.taskBar.task.start, 'hour') /
      this.options.step;
    this.taskBar.width = this.options.columnWidth * this.taskBar.duration;
    this.taskBar.progressWidth =
      this.options.columnWidth *
      this.taskBar.duration *
      (this.taskBar.task.progress / 100) || 0;
    this.group = createSVG('g', {
      class: 'bar-wrapper ' /*+ (this.task.custom_class || '')*/,
      'data-id': this.taskBar.task.id
    });
    this.barGroup = createSVG('g', {
      class: 'bar-group',
      append_to: this.group
    });
    this.handleGroup = createSVG('g', {
      class: 'handle-group',
      append_to: this.group
    });
  }

  /*prepareHelpers() {
    SVGElement.prototype.getX = function() {
      return +this.getAttribute('x');
    };
    SVGElement.prototype.getY = function() {
      return +this.getAttribute('y');
    };
    SVGElement.prototype.getWidth = function() {
      return +this.getAttribute('width');
    };
    SVGElement.prototype.getHeight = function() {
      return +this.getAttribute('height');
    };
    SVGElement.prototype.getEndX = function() {
      return this.getX() + this.getWidth();
    };
  }*/

  computeX() {
    const step = this.options.step;
    const columnWidth = this.options.columnWidth;
    const taskStart = this.taskBar.task.start;
    const ganttStart = this.gantt.start;

    const diff = diffBetweenDates(taskStart, ganttStart, Scale.Hour);
    let x = diff / step * columnWidth;

    if (this.options.viewMode === ViewMode.Month) {
      // tslint:disable-next-line:no-shadowed-variable
      const diff = diffBetweenDates(taskStart, ganttStart, Scale.Day);
      x = diff * columnWidth / 30;
    }
    return x;
  }

  computeY() {
    return (
      this.options.headerHeight +
      this.options.padding +
      this.taskBar.task.index * (this.taskBar.height + this.options.padding * 2)
    );
  }

  private draw() {
    this.drawBar();
    /* this.draw_progress_bar();
     this.draw_label();
     this.draw_resize_handles();*/
  }

  private drawBar() {
    const barClass = 'bar ' + this.getTaskLevelColor();
    const bar = createSVG('rect', {
      x: this.taskBar.x,
      y: this.taskBar.y,
      width: this.taskBar.width,
      height: this.taskBar.height,
      rx: this.taskBar.cornerRadius,
      ry: this.taskBar.cornerRadius,
      class: barClass,
      append_to: this.barGroup
    });

    animateSVG(bar, 'width', 0, this.taskBar.width);

    if (this.taskBar.invalid) {
      bar.classList.add('bar-invalid');
    }
  }

  getTaskLevelColor() {
    if (this.taskBar.task.invalid) {
      return;
    }
    const overdueItem = this.taskBar.task.overdue ? ' bar-overdue' : '';
    switch (this.taskBar.task.level) {
      case 0:
        return 'bar-level-zero' + overdueItem;
      case 1:
        return 'bar-level-one' + overdueItem;
      case 2:
        return 'bar-level-two' + overdueItem;
      case 3:
        return 'bar-level-three' + overdueItem;
      default:
        return 'bar-level-one' + overdueItem;
    }
  }
}
