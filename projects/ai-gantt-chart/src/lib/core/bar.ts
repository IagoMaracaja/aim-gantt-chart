import {Gantt} from '../models/gantt.models';
import {ChartOptions} from '../models/chartOptions.models';
import {GanttOptions} from '../models/ganttOptions.models';
import {TaskBar} from '../models/taskBar';
import {animateSVG, createSVG, on} from '../utils/svg-utils';
import {addDate, diffBetweenDates, format} from '../utils/date-utils';
import {Scale, ViewMode} from '../utils/enums';
import {TaskModel} from '../models/task.models';
import {Popup} from './popup';

export class Bar {
  gantt: Gantt;
  chartOptions: ChartOptions;
  options: GanttOptions;
  taskBar: TaskBar = {};
  private barGroup: SVGAElement;
  group: SVGAElement;
  private handleGroup: SVGAElement;
  private bar: SVGAElement;
  private svg: SVGElement;
  private popup: Popup;


  constructor(gantt: Gantt, chartOptions: ChartOptions, options: GanttOptions, task: TaskModel, svg: SVGElement) {
    this.gantt = gantt;
    this.chartOptions = chartOptions;
    this.options = options;
    this.taskBar.task = task;
    this.svg = svg;
  }

  createBars() {
    this.prepare();
    this.draw();
  }

  private prepare() {
    this.prepareValues();
    if (this.popup) {
      this.popup.hide();
    }
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
      class: 'bar-wrapper ',
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
    this.drawProgressBar();
    this.drawLabel();
    // this.draw_resize_handles();
  }

  private drawBar() {
    const barClass = 'bar ' + this.getTaskLevelColor();
    this.bar = createSVG('rect', {
      x: this.taskBar.x,
      y: this.taskBar.y,
      width: this.taskBar.width,
      height: this.taskBar.height,
      rx: this.taskBar.cornerRadius,
      ry: this.taskBar.cornerRadius,
      class: barClass,
      append_to: this.barGroup
    });

    animateSVG(this.bar, 'width', 0, this.taskBar.width);

    if (this.taskBar.invalid) {
      this.bar.classList.add('bar-invalid');
    }
  }

  drawProgressBar() {
    if (this.taskBar.invalid) {
      return;
    }
    const barProgressClass = 'bar ' + this.getTaskLevelProgressColor();

    let x = this.taskBar.x;
    let y = this.taskBar.y;
    let height = this.taskBar.height;
    const strokeSize = 1;
    let width = this.taskBar.progressWidth;
    if (this.taskBar.task.overdue) {
      x += strokeSize;
      y += strokeSize;
      height -= strokeSize + 1;
      if (this.taskBar.task.progress === 100) {
        width -= 2;
      }
    }
    const barProgress = createSVG('rect', {
      x,
      y,
      width,
      height,
      rx: this.taskBar.cornerRadius,
      ry: this.taskBar.cornerRadius,
      class: barProgressClass,
      append_to: this.barGroup
    });
    animateSVG(barProgress, 'width', 0, this.taskBar.progressWidth);
  }

  drawLabel() {
    const textSVG = createSVG('text', {
      x: this.taskBar.x + this.taskBar.width / 2,
      y: this.taskBar.y + this.taskBar.height / 2,
      append_to: this.barGroup,
      class: 'bar-label'
    });
    const taskBarName = this.taskBar.task.name.concat(' ');
    const taskBarProgress = '[' + this.taskBar.task.progress + '%]';

    const taskNameSVG = createSVG('tspan', {
      append_to: textSVG,
      innerHTML: taskBarName
    });
    const taskProgressSVG = createSVG('tspan', {
      append_to: this.barGroup,
      innerHTML: taskBarProgress,
      class: 'bar-label-progress'
    });
    taskNameSVG.appendChild(taskProgressSVG);
    // labels get BBox in the next tick
    this.updateLabelPosition();
  }

  updateLabelPosition() {
    const bar = this.bar;
    const label: SVGAElement = this.group.querySelector('.bar-label');
    if (this.taskBar.task.overdue) {
      this.showTooltipToBigBar(true);
    }
    const labelWidth = this.calculateWidth(label.textContent, 12);

    if (labelWidth > +bar.getAttribute('width')) {
      this.addClass(label, 'big');
      this.showTooltipToBigBar(false);
      this.barGroup.removeChild(label);
      this.drawLabelJustProgress();
    } else {
      this.removeClass(label, 'big');
      const radix = 10;
      const currentX = parseInt(bar.getAttribute('x'), radix);
      const currentWidth = parseInt(bar.getAttribute('width'), radix);
      const newQualifiedX = currentX + (currentWidth / 2);
      label.setAttribute('x', String(newQualifiedX));
    }
  }

  calculateWidth(text, fontSize) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context.font = fontSize + 'px ';
    return context.measureText(text).width;

  }

  addClass(ele, cls) {
    if (ele.classList) {
      ele.classList.add(cls);
    } else if (!this.hasClass(ele, cls)) {
      ele.setAttribute('class', ele.getAttribute('class') + ' ' + cls);
    }
  }

  hasClass(ele, cls) {
    return ele.getAttribute('class').indexOf(cls) > -1;
  }

  removeClass(ele, cls) {
    if (ele.classList) {
      ele.classList.remove(cls);
    } else if (this.hasClass(ele, cls)) {
      ele.setAttribute('class', ele.getAttribute('class').replace(cls, ' '));
    }
  }

  showTooltipToBigBar(overdue) {
    on(this.group, 'mouseover ' + this.options.popupTrigger, e => {
      if (this.taskBar.actionCompleted) {
        // just finished a move action, wait for a few seconds
        return;
      }

      if (e.type === 'click') {
        this.triggerEvent('click', [this.taskBar.task]);
      }

      this.unselectAll();
      this.addClass(this.group, 'active');

      // this.group.classList.toggle('active');

      this.addStyleForPopup();
      let popupTitle = '';
      if (overdue) {
        popupTitle = 100 - this.taskBar.task.progress + '% overdue';
      } else {
        popupTitle = this.taskBar.task.name;
      }

      this.show_popup({
        target_element: this.bar,
        title: popupTitle,
        task: this.taskBar.task
      });

    });

    on(this.group, 'mouseout ', e => {
      this.popup.hide();
      this.popup = null;
    });
  }

  addStyleForPopup() {
    this.options.popupWrapper.classList.add(this.getPopupClassByTaskLevel());

    // @ts-ignore
    for (const token of this.options.popupWrapper.classList) {
      if (token !== 'popup-wrapper-color') {
        this.options.popupWrapper.classList.remove(token);
      }
    }
    this.options.popupWrapper.classList.add(this.getPopupClassByTaskLevel());

  }

  show_popup(options) {
    if (!this.popup) {
      this.popup = new Popup(
        this.options.popupWrapper,
        this.options.customPopupHtml
      );
    }
    this.popup.show(options);
  }

  unselectAll() {
    const items = Array.prototype.slice.call(this.svg.querySelectorAll('.bar-wrapper'));
    for (const item of items) {
      this.removeClass(item, 'active');
    }
  }

  drawLabelJustProgress() {
    const textSVG = createSVG('text', {
      x: this.taskBar.x + this.taskBar.width / 2,
      y: this.taskBar.y + this.taskBar.height / 2,
      append_to: this.barGroup,
      class: 'bar-label'
    });
    createSVG('tspan', {
      append_to: textSVG,
      innerHTML: this.taskBar.task.progress + '%',
      class: 'bar-label-progress'
    });
  }

  triggerEvent(event, args) {
    if (this.options['on_' + event]) {
      this.options['on_' + event].apply(null, args);
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

  getTaskLevelProgressColor() {
    if (this.taskBar.invalid) {
      return;
    }
    const overdueItem = this.taskBar.task.overdue ? ' bar-progress-overdue' : '';
    switch (this.taskBar.task.level) {
      case 0:
        return 'bar-progress-zero' + overdueItem;
      case 1:
        return 'bar-progress-one' + overdueItem;
      case 2:
        return 'bar-progress-two' + overdueItem;
      case 3:
        return 'bar-progress-three' + overdueItem;
      default:
        return 'bar-progress-one' + overdueItem;
    }
  }

  getPopupClassByTaskLevel() {
    if (this.taskBar.task.overdue) {
      return 'task-overdue';
    }
    switch (this.taskBar.task.level) {
      case 0:
        return 'task-level-zero';
      case 1:
        return 'task-level-one';
      case 2:
        return 'task-level-two';
      case 3:
        return 'task-level-three';
      default:
        return 'task-level-one';
    }
  }
}
