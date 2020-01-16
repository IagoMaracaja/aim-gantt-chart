import {attr, createSVG} from '../utils/svg-utils';
import {GanttOptions} from '../models/ganttOptions.models';
import {addDate, getDaysInMonth, getNumberOfWeek, getToday} from '../utils/date-utils';
import {Scale, ViewMode} from '../utils/enums';
import {ChartOptions} from '../models/chartOptions.models';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GridMaker {
  private options: GanttOptions;
  private chartOptions: ChartOptions;

  static changeGanttContainerWidth(ganttWidth) {
    document.documentElement.style.setProperty(
      '--gantt-container-width',
      ganttWidth + 'px'
    );
  }

  make(options, chartOptions) {
    this.options = options;
    this.chartOptions = chartOptions;

    this.makeGridBackground();
    this.makeGridRows();
    this.makeGridHeader();
    this.makeGridTicks();
  }

  makeGridBackground() {
    const gridWidth =
      this.chartOptions.calendar.length * this.options.columnWidth + this.chartOptions.startPosition;
    const taskActiveLength = this.getNumberOfAllTasksActive(this.chartOptions);
    const taskLength = this.options.projectOverview ?
      taskActiveLength + 1 : taskActiveLength;
    const gridHeight =
      this.options.headerHeight +
      this.options.padding +
      (this.options.barHeight + this.options.padding) *
      taskLength;

    createSVG('rect', {
      x: 0,
      y: 0,
      width: gridWidth,
      height: gridHeight,
      class: 'grid-background',
      append_to: this.chartOptions.layers.grid
    });
    // Setting width as default value until calculates the total area
    this.changeGridAttr(gridHeight, gridWidth, this.chartOptions.svg);
    if (gridWidth < screen.width) {
      GridMaker.changeGanttContainerWidth(gridWidth);
    }
  }

  makeGridHeader() {
    const headerWidth = this.chartOptions.calendar.length * this.options.columnWidth;
    const headerHeight = this.options.headerHeight;
    createSVG('rect', {
      x: this.chartOptions.startPosition,
      y: 0,
      width: headerWidth,
      height: headerHeight,
      class: 'grid-header',
      append_to: this.chartOptions.layers.grid
    });
  }

  makeGridRows() {
    const rowsLayer = createSVG('g',
      {
        append_to: this.chartOptions.layers.grid,
        class: 'rows'
      }
    );
    const linesLayer = createSVG('g',
      {
        append_to: this.chartOptions.layers.grid,
        class: 'lines'
      }
    );

    const rowWidth = this.chartOptions.calendar.length * this.options.columnWidth;
    const rowHeight = this.options.barHeight + this.options.padding * 2;
    const lineRowWidth = rowWidth + this.chartOptions.startPosition;

    let allActiveTaskQty = 0;
    let rowY = this.options.headerHeight;
    for (const project of this.chartOptions.allTasks) {
      for (const tsk of project.taskList) {
        let pos = 0;
        let lineClass = 'row-line';
        allActiveTaskQty = this.getNumberOfTasksActive(tsk.taskList);
        for (const task of tsk.taskList) {

          this.createGridRow(rowY, rowWidth, rowHeight, rowsLayer);

          if (pos === allActiveTaskQty - 1 && !this.options.projectOverview) {
            // lineClass = 'last-row-line';
          }

          this.createLine(rowY, rowHeight, lineRowWidth, lineClass, linesLayer);
          pos++;
          rowY += rowHeight;
        }
      }
    }
    if (this.options.projectOverview) {
      this.createGridRow(rowY, rowWidth, rowHeight, rowsLayer);
      this.createLine(rowY, rowHeight, lineRowWidth, 'row-line', linesLayer);
    }
  }

  getNumberOfTasksActive(taskList) {
    let taskQty = 0;
    for (const task of taskList) {
      if (task.showOnGraph) {
        taskQty++;
      }
    }
    return taskQty;
  }

  getNumberOfAllTasksActive(chartOptions: ChartOptions) {
    let taskQty = 0;
    for (const task of chartOptions.tasks) {
      if (task.showOnGraph) {
        taskQty++;
      }
    }
    return taskQty;
  }

  makeGridTicks() {
    let tickX = this.chartOptions.dateStartPosition;
    const tickY = this.options.headerHeight + this.options.padding / 2;
    const tickHeight =
      (this.options.barHeight + this.options.padding) *
      this.chartOptions.tasks.length;

    const todayDate = getToday();
    const currentDay = todayDate.getDate();
    let lastMonth = null;
    for (const date of this.chartOptions.calendar) {
      let tickClass = 'tick';

      if (this.options.viewMode === ViewMode.Day) {
        if (
          date.getDate() === currentDay &&
          date.getMonth() === todayDate.getMonth() &&
          date.getFullYear() === todayDate.getFullYear()
        ) {
          this.chartOptions.todayXCoords = tickX + this.options.columnWidth / 2;
        }
        if (date.getDate() === 1) {
          tickClass += ' thick';
        }
      }

      if (this.options.viewMode === ViewMode.Month) {
        const currentMonth = date.getUTCMonth();
        const qtyDaysInMonth = getDaysInMonth(date);
        if (
          currentMonth === todayDate.getUTCMonth() &&
          date.getFullYear() === todayDate.getFullYear()
        ) {
          if (currentDay === qtyDaysInMonth) {
            /*highlight begin of Month*/
            this.chartOptions.highlightMonthXCoords =
              tickX + this.options.columnWidth;
          } else {
            let monthDivisor = qtyDaysInMonth / currentDay;
            monthDivisor += 1; // to adjust on current day
            /*highlight day of Month*/
            this.chartOptions.highlightMonthXCoords =
              tickX + this.options.columnWidth / monthDivisor;
          }
          /* The Month name must be highlighted */
          this.chartOptions.highlightMonthNameXCoords =
            tickX + this.options.columnWidth / 2;
        }
        if (date.getMonth() === 0) {
          tickClass += ' thick';
        }

      }
      if (this.options.viewMode === ViewMode.Week) {
        if (!lastMonth) {
          lastMonth = addDate(date, -1, Scale.Month).getMonth();
        }
        if (
          getNumberOfWeek(date) ===
          getNumberOfWeek(todayDate) &&
          date.getFullYear() === todayDate.getFullYear()
        ) {
          if (todayDate.getDay() === 6) {
            /*highlight end of week*/
            this.chartOptions.highlightWeekXCoords = tickX;
          } else {
            const weekDaysCount = 6;
            let weekDay = todayDate.getDay();
            weekDay -= 1;
            const weekDivisor = weekDaysCount / weekDay;
            /*highlight day of week*/
            this.chartOptions.highlightWeekXCoords =
              tickX + this.options.columnWidth / weekDivisor;
          }
        }
        if (date.getMonth() !== lastMonth) {
          tickClass += ' thick';
        }
        lastMonth = date.getMonth();
      }

      if (tickClass.includes('thick')) {
        this.make_divisor_highlights(tickX);
      }

      createSVG('path', {
        d: `M ${tickX} ${tickY} v ${tickHeight}`,
        class: tickClass,
        append_to: this.chartOptions.layers.divisor
      });
      tickX += this.options.columnWidth;
    }
  }

  changeGridAttr(gridHeight, gridWidth, svg: SVGAElement) {
    attr(svg, {
      height: gridHeight,
      width: gridWidth
    });
  }

  make_divisor_highlights(x) {
    const y = 0;
    const height =
      (this.options.barHeight + this.options.padding * 2) *
      this.chartOptions.tasks.length +
      this.options.headerHeight +
      this.options.padding / 2;
    createSVG('path', {
      d: `M ${x} ${y} v ${height}`,
      class: 'month-divisor',
      append_to: this.chartOptions.layers.divisor
    });
  }

  private createLine(rowY, rowHeight, lineRowWidth, lineClass: string, linesLayer) {
    createSVG('line', {
      x1: this.chartOptions.startPosition,
      y1: rowY + rowHeight,
      x2: lineRowWidth,
      y2: rowY + rowHeight,
      class: lineClass,
      append_to: linesLayer
    });
  }

  private createGridRow(rowY, rowWidth, rowHeight, rowsLayer) {
    createSVG('rect', {
      x: this.chartOptions.startPosition,
      y: rowY,
      width: rowWidth,
      height: rowHeight,
      class: 'grid-row',
      append_to: rowsLayer
    });
  }
}
