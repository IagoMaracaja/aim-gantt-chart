import {createSVG} from '../utils/svg-utils';
import {ChartOptions} from '../models/chartOptions.models';
import {getDatesToDraw} from '../utils/date-utils';
import {GanttOptions} from '../models/ganttOptions.models';
import {Injectable} from '@angular/core';
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

  static changeSvgHeight(options: GanttOptions, chartOptions: ChartOptions) {
    if (options.projectOverview) {
      let newSVGHeight = options.headerHeight;
      let headerHeight = 0;
      for (const tsk of chartOptions.allTasks) {
        headerHeight =
          (options.barHeight + options.padding * 2) *
          tsk.taskList.length;
        newSVGHeight += headerHeight;
      }
      // todo Uncomment this line 
      /*$.attr(this.$svg, {
        height: newSVGHeight
      });*/
    }
  }

  static makeTaskHeader(options: GanttOptions, chartOptions: ChartOptions) {
    let y = options.headerHeight;
    const headerWidth = chartOptions.startPosition;
    const fixedValueForSum = y;
    let totalHeight = fixedValueForSum;
    let newSVGHeight = fixedValueForSum;
    let headerHeight = 0;
    for (const tsk of chartOptions.allTasks) {
      headerHeight =
        (options.barHeight + options.padding * 2) *
        tsk.taskList.length;
      const taskLevelOne = Draw.getLevelOneTask(tsk.taskList);
      const taskGroup = createSVG('g', {
        x: 0,
        y: y,
        width: headerWidth,
        height: headerHeight,
        class: 'task-header-group',
        append_to: chartOptions.layers.bar
      });
      createSVG('rect', {
        x: 0,
        y: y,
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
    // todo Uncomment this line
    /*$.attr(this.$svg, {
      height: newSVGHeight
    });*/
  }


  drawDates(chartOptions: ChartOptions, options: GanttOptions) {
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

      if (date.upperText) {
        const $upperText = createSVG('text', {
          x: date.upperX,
          y: date.upperY,
          innerHTML: date.upperText,
          class: 'upper-text',
          append_to: calendarLayer
        });
        // remove out-of-bound dates
        /*if ($upperText.getBBox().x2 > chartOptions.layers.grid.getBBox().width) {
          $upperText.remove();
        }*/
      }
    }
  }

  drawBars(chartOptions: ChartOptions, options: GanttOptions) {
    if (!options.projectOverview) {
      Draw.makeTaskHeader(options, chartOptions);
    }
    /*this.bars = this.tasks.map(task => {
      if (task.showOnGraph) {
        const bar = new Bar(this, task);
        chartOptions.layers.bar.appendChild(bar.group);
        return bar;
      }
    });

    Draw.changeSvgHeight();*/
  }
}
