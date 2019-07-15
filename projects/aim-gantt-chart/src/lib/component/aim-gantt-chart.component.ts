import {Component, OnInit} from '@angular/core';
import * as GanntChart from 'js-gantt-chart/dist/gantt-chart.js';
import {AimGanttChartService} from '../service/aim-gantt-chart.service';
import {Language, ViewMode} from '../utils/enums';

// @ts-ignore
@Component({
  selector: 'gc-aim-gantt-chart',
  template: `
    <div class="gantt-target"></div>
  `,
  styles: [`
    body {
      font-family: sans-serif;
      width: auto;
    }
  `]
})

export class AimGanttChartComponent implements OnInit {

  public ganttChartObj;
  public ganttTarget = '.gantt-target';

  constructor(private service: AimGanttChartService) {
  }

  ngOnInit() {
    this.showGantt(this.service.getMocked());
  }

  /*  This method show Gantt as Project Overview, showing project as a Bar
   */
  showProjectOverview(tasks) {
    this.ganttChartObj = new GanntChart(this.ganttTarget, tasks, {
      view_mode: ViewMode.Month,
      language: Language.English,
      project_overview: true
    });
  }

  /*
    This method show a Gantt Chart.
   */
  showGantt(tasks, viewMode?: ViewMode) {
    this.ganttChartObj = new GanntChart(this.ganttTarget, tasks, {
      view_mode: viewMode ? viewMode : ViewMode.Day,
      language: Language.English,
      project_overview: false
    });
  }

}
