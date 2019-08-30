import {Component, Input, OnInit} from '@angular/core';
import {createSVG} from '../../utils/svg-utils';
import {Language, Options, ViewMode} from '../../utils/enums';
import {addDate, diffBetweenDates, getDateValues, getToday, parseDate} from '../../utils/date-utils';
import {generateId} from '../../utils/commom-code';
import {GanttOptions} from '../../models/ganttOptions.models';
import {GanttBusiness} from '../../core/ganttBusiness';
import {Gantt} from '../../models/gantt.models';
import {TaskModel} from '../../models/task.models';
import {ChartOptions} from '../../models/chartOptions.models';

@Component({
  selector: 'gc-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit {

  @Input() wrapper;
  @Input() tasks: TaskModel[];
  @Input() options: GanttOptions;
  private svg: SVGAElement;
  private container: HTMLDivElement;
  private popupWrapper: HTMLDivElement;
  private chartOptions: ChartOptions = {};
  private gantt: Gantt = {};

  constructor(public ganttBusiness: GanttBusiness) {
  }

  ngOnInit() {
    if (this.tasks) {
      this.setupWrapper(this.wrapper);
      this.setupOptions(this.options);
      this.initValues();
      this.setupTasks(this.tasks);

      this.changeViewMode(this.options.viewMode);
    }
  }

  setupWrapper(element) {
    let svgElement;
    let wrapperElement;

    // CSS Selector is passed
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    // get the SVGElement
    if (element instanceof HTMLElement) {
      wrapperElement = element;
      svgElement = element.querySelector('svg');
    } else if (element instanceof SVGElement) {
      svgElement = element;
    } else {
      throw new TypeError(
        'Gantt only supports usage of a string CSS selector,' +
        ' HTML DOM element or SVG DOM element for the \'element\' parameter'
      );
    }

    // svg element
    if (!svgElement) {
      // create it
      this.svg = createSVG('svg', {
        append_to: wrapperElement,
        class: 'gantt'
      });
    } else {
      this.svg = svgElement;
      this.svg.classList.add('gantt');
    }

    // wrapper element
    this.container = document.createElement('div');
    this.container.classList.add('gantt-container');

    const parentElement = document.getElementsByTagName('svg').item(0);
    parentElement.appendChild(this.container);

    // popup wrapper
    this.popupWrapper = document.createElement('div');
    this.popupWrapper.classList.add('popup-wrapper-color');
    this.container.appendChild(this.popupWrapper);
  }

  setupOptions(options) {

    const defaultOptions: GanttOptions = {
      headerHeight: 80,
      columnWidth: 30,
      step: 24,
      viewModes: [
        ViewMode.QuarterDay,
        ViewMode.HalfDay,
        ViewMode.Day,
        ViewMode.Week,
        ViewMode.Month,
        ViewMode.Year
      ],
      barHeight: 50,
      barCornerRadius: 10,
      padding: 10,
      viewMode: ViewMode.Day,
      dateFormat: Options.DateFormat,
      popupTrigger: Options.PopupTrigger,
      language: Language.English,
      projectOverview: false
    };
    this.options = {...defaultOptions, ...options};
  }

  initValues() {
    if (!this.chartOptions.startPosition) {
      this.chartOptions.startPosition = 0;
    }
    this.options.projectOverview
      ? (this.chartOptions.startPosition = 0)
      : (this.chartOptions.startPosition = 200);
    this.options.projectOverview
      ? (this.chartOptions.dateStartPosition = 5)
      : (this.chartOptions.dateStartPosition = 205);
    this.chartOptions.taskLevelOneQty = 0;

  }

  setupTasks(tasks) {
    this.chartOptions.allTasks = tasks;
    const allTasks = [];
    for (const tsk of tasks) {
      this.chartOptions.taskLevelOneQty += 1;
      const array = tsk.taskList;
      if (this.options.projectOverview) {
        array.splice(0, 0, tsk);
      }
      allTasks.push.apply(allTasks, array);
    }

    // prepare tasks
    this.chartOptions.tasks = allTasks.map((task, i) => {
      // convert to Date objects
      task._start = parseDate(task.start);
      task._end = parseDate(task.end);

      // make task invalid if duration too large
      if (diffBetweenDates(task._end, task._start, 'year') > 10) {
        task.end = null;
      }

      // cache index
      task._index = i;

      // invalid dates
      if (!task.start && !task.end) {
        const todayVar = getToday();
        task._start = todayVar;
        task._end = addDate(todayVar, 2, 'day');
      }

      if (!task.start && task.end) {
        task._start = addDate(task._end, -2, 'day');
      }

      if (task.start && !task.end) {
        task._end = addDate(task._start, 2, 'day');
      }
      // if hours is not set, assume the last day is full day
      // e.g: 2018-09-09 becomes 2018-09-09 23:59:59
      const taskEndValues = getDateValues(task._end);
      if (taskEndValues.slice(3).every(d => d === 0)) {
        task._end = addDate(task._end, 24, 'hour');
      }
      // invalid flag
      if (!task.start || !task.end) {
        task.invalid = true;
      }
      // dependencies
      if (typeof task.dependencies === 'string' || !task.dependencies) {
        let deps = [];
        if (task.dependencies) {
          deps = task.dependencies
            .split(',')
            .map(d => d.trim())
            .filter(d => d);
        }
        task.dependencies = deps;
      }
      // uids
      if (!task.id) {
        task.id = generateId(task);
      }

      return task;
    });

  }

  changeViewMode(mode) {
    if (!mode) {
      mode = this.options.viewMode;
    }
    this.updateViewScale(mode);
    this.setupDates();
    this.ganttBusiness.render(this.svg, this.options, this.chartOptions);
  }

  updateViewScale(viewMode) {
    this.options.viewMode = viewMode;
    const hoursOfDay = 24;
    if (viewMode === ViewMode.Day) {
      this.options.step = hoursOfDay;
      this.options.columnWidth = 38;
    } else if (viewMode === ViewMode.HalfDay) {
      this.options.step = hoursOfDay / 2;
      this.options.columnWidth = 38;
    } else if (viewMode === ViewMode.QuarterDay) {
      this.options.step = hoursOfDay / 4;
      this.options.columnWidth = 38;
    } else if (viewMode === ViewMode.Week) {
      this.options.step = hoursOfDay * 7;
      this.options.columnWidth = 90;
    } else if (viewMode === ViewMode.Month) {
      this.options.step = hoursOfDay * 30;
      this.options.columnWidth = 70;
    } else if (viewMode === ViewMode.Year) {
      this.options.step = hoursOfDay * 365;
      this.options.columnWidth = 120;
    }
  }

  setupDates() {
    this.chartOptions.calendar = GanttBusiness.setupDateValues(this.gantt, this.options);
    this.gantt = GanttBusiness.setupGanttDates(this.gantt, this.tasks, this.options);
  }
}
