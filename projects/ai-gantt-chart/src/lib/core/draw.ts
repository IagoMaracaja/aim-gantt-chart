import {createSVG} from '../utils/svg-utils';
import {ChartOptions} from '../models/chartOptions.models';
import {diffBetweenDates, getDatesToDraw, getOldestStartingDate, getToday} from '../utils/date-utils';
import {GanttOptions} from '../models/ganttOptions.models';
import {Injectable} from '@angular/core';
// @ts-ignore
import {Bar} from './bar';
import {Gantt} from '../models/gantt.models';
import {Scale, ViewMode} from '../utils/enums';
import {Filter} from './filter';
import {GanttChartComponent} from '../component/gantt-chart/gantt-chart.component';

@Injectable({
  providedIn: 'root',
})
export class Draw {

  static getLevelOneTask(taskList) {
    let levelOne;
    for (const tsk of taskList) {
      if (tsk.level === 1) {
        levelOne = tsk;
      }
    }
    if (!levelOne) {
      throw new TypeError('There is no TaskModel Level One');
    }
    return levelOne;
  }

  static changeSvgHeight(options: GanttOptions, chartOptions: ChartOptions, svg: SVGElement) {
    if (options.projectOverview) {
      let newSVGHeight = options.headerHeight;
      let headerHeight = 0;
      for (const project of chartOptions.allTasks) {
        newSVGHeight += (options.barHeight + options.padding * 2);
        for (const tsk of project.taskList) {
          headerHeight =
            (options.barHeight + options.padding * 2) *
            tsk.taskList.length;
          newSVGHeight += headerHeight;
        }
      }

      svg.setAttribute('height', String(newSVGHeight));
    }
  }

  static makeTaskHeader(options: GanttOptions, chartOptions: ChartOptions, svg: SVGElement) {
    let y = options.headerHeight;
    const headerWidth = chartOptions.startPosition;
    const fixedValueForSum = y;
    let totalHeight = fixedValueForSum;
    let newSVGHeight = fixedValueForSum;
    let headerHeight = 0;
    for (const project of chartOptions.allTasks) {
      for (const tsk of project.taskList) {
        headerHeight =
          (options.barHeight + options.padding * 2) *
          tsk.taskList.length;
        const taskLevelOne = Draw.getLevelOneTask(tsk.taskList);
        const taskGroup = createSVG('g', {
          x: 0,
          y,
          width: headerWidth,
          height: headerHeight,
          class: 'task-header-group',
          append_to: chartOptions.layers.bar
        });
        createSVG('rect', {
          x: 0,
          y,
          width: headerWidth,
          height: headerHeight,
          class: 'task-header',
          append_to: taskGroup
        });
        const nameTest = taskLevelOne.name;
        const labelPosX = headerWidth / 2;
        const labelPosY = totalHeight + headerHeight / 2;
        createSVG('text', {
          x: labelPosX,
          y: labelPosY,
          innerHTML: nameTest,
          class: 'task-name',
          append_to: taskGroup
        });
        if (taskLevelOne.overdue) {
          const overdue = '(overdue)';
          const overdueY = labelPosY + 15;
          createSVG('text', {
            x: labelPosX,
            y: overdueY,
            innerHTML: overdue,
            class: 'overdue-label',
            append_to: taskGroup
          });
        }
        totalHeight += headerHeight;
        y = y + headerHeight;
        newSVGHeight += headerHeight;
      }
    }

    svg.setAttribute('height', String(newSVGHeight));
  }


  private static createUpperDate(date, calendarLayer) {
    return createSVG('text', {
      x: date.upperX,
      y: date.upperY,
      innerHTML: date.upperText,
      class: 'upper-text',
      append_to: calendarLayer
    });
  }


  drawDates(chartOptions: ChartOptions, options: GanttOptions) {
    const monthPlottedNames = [];
    const calendarLayer = createSVG('g', {
      x: chartOptions.dateStartPosition,
      y: 0,
      class: 'date',
      append_to: chartOptions.layers.grid
    });

    for (const date of getDatesToDraw(options, chartOptions)) {
      createSVG('text', {
        x: date.lowerX,
        y: date.lowerY,
        innerHTML: date.lowerText,
        class: 'lower-text',
        append_to: calendarLayer
      });

      switch (options.viewMode) {
        case ViewMode.Day:
          if (date.lowerText === '02' || date.lowerText === '29') {
            Draw.createUpperDate(date, calendarLayer);
          }
          break;
        case ViewMode.Week:
          if (monthPlottedNames.indexOf(date.upperText) === -1) {
            Draw.createUpperDate(date, calendarLayer);
            monthPlottedNames.push(date.upperText);
          }
          break;
        case ViewMode.Month:
          if (date.lowerText === 'DEC' || date.lowerText === 'JAN') {
            Draw.createUpperDate(date, calendarLayer);
          }
          break;
      }
    }
  }

  drawBars(chartOptions: ChartOptions, options: GanttOptions, gantt: Gantt, svg: SVGElement) {
    if (!options.projectOverview) {
      Draw.makeTaskHeader(options, chartOptions, svg);
    }
    chartOptions.bars = chartOptions.tasks.map(task => {
      if (task.showOnGraph) {
        const bar = new Bar(gantt, chartOptions, options, task, svg);
        bar.createBars();
        if (bar.taskBar.x < 0) {
          const message = 'There are Task(s) that starts before the project start date.';
          this.drawEmptyTaskMessage(message, svg);
        }

        chartOptions.layers.bar.appendChild(bar.group);
        return bar;
      }
    });

    Draw.changeSvgHeight(options, chartOptions, svg);
  }

  setWidth(svg: SVGElement) {
    const curWidth = svg.getBoundingClientRect().width;
    const actualWidth = svg
      .querySelector('.grid .grid-row')
      .getAttribute('width');
    if (curWidth < +actualWidth) {
      svg.setAttribute('width', actualWidth);
    }
  }

  /*
     Scroll screen to content.
     */
  setScrollPosition(charOptions: ChartOptions, svg: SVGElement, gantt: Gantt, options: GanttOptions) {
    const parentElement = svg.parentElement;
    if (!parentElement) {
      return;
    }

    const hoursBeforeFirstTask = diffBetweenDates(
      getOldestStartingDate(charOptions),
      gantt.start,
      Scale.Hour
    );
    parentElement.scrollLeft = hoursBeforeFirstTask / options.step * options.columnWidth - options.columnWidth;
  }

  makeGridHighlights(chartOptions: ChartOptions, gantt: Gantt, options: GanttOptions, svg: SVGElement) {
    // highlight today's date
    let boxXCoords = 0;
    if (options.viewMode === ViewMode.Day) {
      boxXCoords = chartOptions.todayXCoords;
    } else if (options.viewMode === ViewMode.Month) {
      boxXCoords = chartOptions.highlightMonthXCoords;
    } else if (options.viewMode === ViewMode.Week) {
      boxXCoords = chartOptions.highlightWeekXCoords;
    }
    let x =
      diffBetweenDates(getToday(), gantt.start, Scale.Hour) /
      options.step *
      options.columnWidth +
      chartOptions.startPosition;

    let y = options.headerHeight;

    let width = options.columnWidth;
    let height =
      (options.barHeight + options.padding * 2) *
      chartOptions.tasks.length +
      options.headerHeight +
      options.padding / 2;
    if (boxXCoords) {
      createSVG('path', {
        d: `M ${boxXCoords} ${y} v ${height}`,
        id: 'td',
        class: 'today-divisor',
        append_to: chartOptions.layers.divisor
      });
    }

    if (options.viewMode === ViewMode.Day || options.viewMode === ViewMode.Month) {
      // change values for square.
      height = 20;
      width = 30;
      y = options.headerHeight - 30;
      if (options.viewMode === ViewMode.Month) {
        x = chartOptions.highlightMonthNameXCoords - 15;
      } else {
        x = boxXCoords - 15;
      }

      if (x) { // x can be undefined when change view mode
        createSVG('rect', {
          x,
          y,
          width,
          height,
          class: 'today-highlight',
          append_to: svg
        });
      }

    }
  }

  makeFilter(chartOptions: ChartOptions, gantt: Gantt, options: GanttOptions, ganttComponent: GanttChartComponent) {
    const filter = new Filter(gantt, chartOptions, options, this.getFilterType(options), ganttComponent);
    filter.drawFilter();
  }

  getFilterType(options: GanttOptions) {
    if (options.viewMode === ViewMode.Day) {
      return 1;
    } else if (options.viewMode === ViewMode.Week) {
      return 2;
    } else {
      return 3;
    }
  }

  drawEmptyTaskMessage(message, parent) {
    parent.setAttribute('height', String('100'));
    const emptyLayer = createSVG('g', {
      class: 'empty',
      append_to: parent
    });

    const rect = createSVG('rect', {
      x: 0,
      y: 0,
      width: parent.clientWidth,
      height: parent.clientHeight,
      class: 'emptyBox',
      append_to: emptyLayer
    });

    createSVG('text', {
      x: rect.getBBox().width / 2,
      y: rect.getBBox().height / 2,
      innerHTML: message,
      class: 'empty-text',
      append_to: emptyLayer
    });
  }

}
