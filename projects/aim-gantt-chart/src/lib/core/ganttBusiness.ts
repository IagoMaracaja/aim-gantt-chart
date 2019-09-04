import {addDate, diffBetweenDates, startOf} from '../utils/date-utils';
import {Scale, ViewMode} from '../utils/enums';
import {GanttOptions} from '../models/ganttOptions.models';
import {createSVG} from '../utils/svg-utils';
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
  /*  private options: GanttOptions;
    private chartOptions: ChartOptions;*/

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

  static clear(svg: SVGAElement) {
    svg.innerHTML = '';
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
    chartOptions.layers.tasks = createSVG('g', {
      class: 'tasks',
      append_to: svg
    });
    chartOptions.layers.filter = createSVG('g', {
      class: 'filter',
      append_to: svg
    });

  }

  static setupGanttDates(gantt: Gantt, tasks: TaskModel[], options: GanttOptions) {
    for (const task of tasks) {
      // set global start and end date
      if (!gantt.start || task.start < gantt.start) {
        gantt.start = new Date(task.start);
      }
      if (!gantt.end || task.end > gantt.end) {
        gantt.end = new Date(task.end);
      }
    }

    gantt.start = startOf(gantt.start, Scale.Day);
    gantt.end = startOf(gantt.end, Scale.Day);

    // add date padding on both sides
    if (options.viewMode === ViewMode.QuarterDay
      || options.viewMode === ViewMode.HalfDay) {
      gantt.start = addDate(gantt.start, -7, Scale.Day);
      gantt.end = addDate(gantt.end, 7, Scale.Day);
    } else if (options.viewMode === ViewMode.Month) {
      gantt.start = startOf(gantt.start, Scale.Year);
      gantt.end = addDate(gantt.end, 18, Scale.Month);
    } else if (options.viewMode === ViewMode.Year) {
      gantt.start = addDate(gantt.start, -2, Scale.Year);
      gantt.end = addDate(gantt.end, 2, Scale.Year);
    } else if (options.viewMode === ViewMode.Week) {
      gantt.start = addDate(gantt.start, -20, Scale.Day);
      gantt.end = addDate(gantt.end, 2, Scale.Month);
    } else {
      let qtDayBefore = -2;
      let qtDayAfter = 5;
      if (diffBetweenDates(gantt.end, gantt.start, Scale.Day) < 30) {
        qtDayBefore = -5;
        qtDayAfter = 35;
      }
      gantt.start = addDate(gantt.start, qtDayBefore, Scale.Day);
      gantt.end = addDate(gantt.end, qtDayAfter, Scale.Day);
    }
    return gantt;
  }

  render(svg: SVGAElement, options: GanttOptions, chartOptions: ChartOptions, gantt: Gantt, ganttComponent: GanttChartComponent) {
    GanttBusiness.clear(svg);
    GanttBusiness.setupLayers(svg, chartOptions);
    this.gridMaker.make(options, chartOptions);
    this.draw.drawDates(chartOptions, options);

    this.draw.drawBars(chartOptions, options, gantt, svg);
    this.draw.setWidth(svg);

    this.draw.setScrollPosition(chartOptions, svg, gantt, options);


    if (!options.projectOverview) {
      // this.draw.makeFilter(chartOptions, gantt, options, ganttComponent);
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

