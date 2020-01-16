import {Component, Input, OnInit} from '@angular/core';
import {createSVG} from '../../utils/svg-utils';
import {Language, Options, Scale, ViewMode} from '../../utils/enums';
import {addDate, diffBetweenDates, getToday, parseDate} from '../../utils/date-utils';
import {generateId} from '../../utils/commom-code';
import {GanttOptions} from '../../models/ganttOptions.models';
import {GanttBusiness} from '../../core/ganttBusiness';
import {Gantt} from '../../models/gantt.models';
import {TaskModel} from '../../models/task.models';
import {ChartOptions} from '../../models/chartOptions.models';
import {Draw} from '../../core/draw';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ai-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.css']
})
export class GanttChartComponent implements OnInit {

  @Input() wrapper;
  @Input() tasks: TaskModel[];
  @Input() options: GanttOptions;
  private svg: SVGAElement;
  private container: HTMLDivElement;
  private chartOptions: ChartOptions = {};
  private gantt: Gantt = {};

  private wrapperElement;

  constructor(public ganttBusiness: GanttBusiness, public draw: Draw) {
  }

  ngOnInit() {
    if (this.tasks.length > 0) {
      this.setupWrapper(this.wrapper);
      this.setupOptions(this.options);
      this.initValues();
      this.setupTasks(this.tasks);

      this.changeViewMode(this.options.viewMode);
    } else {
      this.showTasksEmpty();
    }
  }

  showTasksEmpty() {
    const element = document.querySelector(this.wrapper);
    if (!this.svg) {
      this.svg = createSVG('svg', {
        append_to: element,
        width: element.clientWidth,
        height: 100,
        class: 'gantt'
      });
    }
    this.draw.drawEmptyTaskMessage('There is no task to show', this.svg);
  }

  updateTasks(tasks) {
    if (tasks.length > 0) {
      this.setupTasks(tasks);
      this.ganttBusiness.render(this.svg, this.options, this.chartOptions, this.gantt, this);
    } else {
      this.showTasksEmpty();
    }

  }

  setupWrapper(element) {
    let svgElement;

    // CSS Selector is passed
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    // get the SVGElement
    if (element instanceof HTMLElement) {
      this.wrapperElement = element;
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
        append_to: this.wrapperElement,
        class: 'gantt'
      });
    } else {
      this.svg = svgElement;
      this.svg.classList.add('gantt');
    }

    // wrapper element
    this.container = document.createElement('div');
    this.container.classList.add('gantt-container');

    const parentElement = this.wrapperElement.getElementsByTagName('svg').item(0);
    this.wrapperElement.appendChild(this.container);
    this.container.appendChild(parentElement);

    this.gantt.container = this.container;

    // popup wrapper
    this.options.popupWrapper = document.createElement('div');
    this.options.popupWrapper.classList.add('popup-wrapper-color');
    this.container.appendChild(this.options.popupWrapper);


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
      projectOverview: false,
      makeFilter: true
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
    const allTasks = this.getAllTasks(tasks);
    // prepare tasks
    let taskIndex = 0;
    this.chartOptions.tasks = allTasks.map((task, i) => {
      // convert to Date objects
      task.start = parseDate(task.start);
      task.end = parseDate(task.end);
      // make task invalid if duration too large
      if (diffBetweenDates(task.end, task.start, Scale.Year) > 10) {
        task.end = null;
      }

      // cache index
      if (task.showOnGraph) {
        task.index = taskIndex;
        taskIndex ++;
      }

      // invalid dates
      if (!task.start && !task.end) {
        const todayVar = getToday();
        task.start = todayVar;
        task.end = addDate(todayVar, 2, Scale.Day);
      }

      if (!task.start && task.end) {
        task.start = addDate(task.end, -2, Scale.Day);
      }

      if (task.start && !task.end) {
        task.end = addDate(task.start, 2, Scale.Day);
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

  getAllTasksOld(tasks) {
    const allTasks = [];
    for (const tsk of tasks) {
      this.chartOptions.taskLevelOneQty += 1;
      const array = tsk.taskList;
      if (this.options.projectOverview) {
        array.splice(0, 0, tsk);
      }
      allTasks.push.apply(allTasks, array);
    }
    return allTasks;
  }

  getAllTasks(tasks) {
    const allTasks = [];
    for (const projects of tasks) {
      if (this.options.projectOverview) {
        allTasks.splice(0, 0, projects); // add the task Level 0
      }
      for (const tsk of projects.taskList) {
        this.chartOptions.taskLevelOneQty += 1;
        const array = tsk.taskList;
        if (array.indexOf(tsk) === -1) {
          array.splice(0, 0, tsk); // add the task level 1
        }
        allTasks.push.apply(allTasks, array);
      }
    }
    return allTasks;
  }

  changeViewMode(mode) {
    if (!mode) {
      mode = this.options.viewMode;
    }
    this.updateViewScale(mode);
    this.setupDates();
    this.ganttBusiness.render(this.svg, this.options, this.chartOptions, this.gantt, this);
  }

  refreshByFilter(viewMode) {
    if (this.chartOptions.allTasks) {
      this.setupTasks(this.chartOptions.allTasks);
      this.changeViewMode(viewMode);
    }
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
    this.clearDates();
    this.gantt = GanttBusiness.getGanttDates(this.gantt, this.chartOptions.tasks, this.options);
    this.chartOptions.calendar = GanttBusiness.setupDateValues(this.gantt, this.options);
  }

  private clearDates() {
    this.chartOptions.calendar = [];
  }
}
