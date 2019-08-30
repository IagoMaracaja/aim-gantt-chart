import {NgModule} from '@angular/core';
import {GanttChartComponent} from './component/gantt-chart/gantt-chart.component';
import {GanttBusiness} from './core/ganttBusiness';
import {GridMaker} from './core/gridMaker';
import {Draw} from './core/draw';

@NgModule({
  declarations: [GanttChartComponent],
  imports: [],
  exports: [GanttChartComponent],
  providers: [GanttBusiness, GridMaker, Draw]
})
export class AimGanttChartModule {
}
