import {addDate, addDaysToDate, diffBetweenDates, parseDate} from '../utils/date-utils';
import {Scale, ViewMode} from '../utils/enums';
import {GanttOptions} from '../models/ganttOptions.models';
import {createHTMLFromString, createSVG} from '../utils/svg-utils';
import {GridMaker} from './gridMaker';
import {ChartOptions} from '../models/chartOptions.models';
import {Draw} from './draw';
import {Gantt} from '../models/gantt.models';
import {TaskModel} from '../models/task.models';
import {Injectable} from '@angular/core';
import {GanttChartComponent} from '../component/gantt-chart/gantt-chart.component';

@Injectable({
  providedIn: 'root',
})
export class GanttBusiness {

  constructor(public gridMaker: GridMaker, public draw: Draw) {
  }

  static setupDateValues(gantt: Gantt, options: GanttOptions) {
    const dates = [];
    let curDate = null;
    while (curDate === null || curDate < gantt.end) {
      if (!curDate) {
        curDate = gantt.start;
      } else {
        if (options.viewMode === ViewMode.Year) {
          curDate = addDate(curDate, 1, Scale.Year);
        } else if (options.viewMode === ViewMode.Month) {
          curDate = addDate(curDate, 1, Scale.Month);
        } else {
          curDate = addDate(curDate, options.step, Scale.Hour);
        }
      }
      dates.push(curDate);
    }
    return dates;
  }

  static clear(svg: SVGAElement, options: GanttOptions) {
    svg.textContent = '';
    if (options.popupWrapper) {
      options.popupWrapper.textContent = '';
    }
    return svg;

  }

  static setupLayers(svg: SVGAElement, chartOptions: ChartOptions) {
    if (!chartOptions.layers) {
      chartOptions.layers = {};
    }
    chartOptions.layers.grid = createSVG('g', {
      class: 'grid',
      append_to: svg
    });
    chartOptions.layers.bar = createSVG('g', {
      class: 'bar',
      append_to: svg
    });
    chartOptions.layers.divisor = createSVG('g', {
      class: 'divisor',
      append_to: svg
    });
    chartOptions.layers.filter = createSVG('g', {
      class: 'filter',
      append_to: svg
    });

  }

  static getGanttDates(gantt: Gantt, tasks: TaskModel[], options: GanttOptions): Gantt {
    gantt = this.getBoundsOfDates(tasks, gantt);
    let beforeDays;
    let afterDays;
    const diffBetweenDays = diffBetweenDates(gantt.end, gantt.start);

    switch (options.viewMode) {
      case ViewMode.Day:
        beforeDays = diffBetweenDays < 30 ? -5 : -1;
        afterDays = diffBetweenDays < 15 ? 50 : 10;
        break;
      case ViewMode.Week:
        beforeDays = diffBetweenDays < 30 ? -15 : -7;
        afterDays = diffBetweenDays < 30 ? 180 : 90;
        break;
      case ViewMode.Month:
        beforeDays = diffBetweenDays < 30 ? -100 : -30;
        afterDays = diffBetweenDays < 30 ? 830 : 800;
        break;
    }
    gantt.start = addDaysToDate(gantt.start, beforeDays);
    gantt.end = addDaysToDate(gantt.end, afterDays);

    return gantt;
  }

  static getBoundsOfDates(tasks: TaskModel[], gantt: Gantt) {
    let start;
    let end;
    for (const task of tasks) {
      // 'T00:00:00' below fix some problems with TimeZone
      const startTaskDate = parseDate(task.start);
      const endTaskDate = parseDate(task.end);

      if (!start) {
        start = startTaskDate;
      } else {
        start = startTaskDate < start ? startTaskDate : start;
      }
      if (!end) {
        end = endTaskDate;
      } else {
        end = endTaskDate > end ? endTaskDate : end;
      }

    }
    gantt.start = start;
    gantt.end = end;
    return gantt;
  }

  render(svg: SVGAElement, options: GanttOptions, chartOptions: ChartOptions,
         gantt: Gantt, ganttComponent: GanttChartComponent) {
    GanttBusiness.clear(svg, options);
    GanttBusiness.setupLayers(svg, chartOptions);
    chartOptions.svg = svg;
    this.gridMaker.make(options, chartOptions);
    this.draw.drawDates(chartOptions, options);

    this.draw.drawBars(chartOptions, options, gantt, svg);
    this.draw.setWidth(svg);

    // this.draw.setScrollPosition(chartOptions, svg, gantt, options);


    if (!options.projectOverview && options.makeFilter) {
      this.draw.makeFilter(chartOptions, gantt, options, ganttComponent);
    }
    if (
      chartOptions.todayXCoords ||
      chartOptions.highlightMonthXCoords ||
      chartOptions.highlightWeekXCoords
    ) {
      this.draw.makeGridHighlights(chartOptions, gantt, options, svg);
    }
  }
}

