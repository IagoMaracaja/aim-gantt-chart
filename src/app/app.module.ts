import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AimGanttChartModule} from '../../projects/aim-gantt-chart/src/lib/aim-gantt-chart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AimGanttChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
