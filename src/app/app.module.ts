import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AiGanttChartModule} from '../../projects/ai-gantt-chart/src/lib/ai-gantt-chart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AiGanttChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
