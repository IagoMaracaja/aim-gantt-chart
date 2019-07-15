import { OnInit } from '@angular/core';
import { AimGanttChartService } from './aim-gantt-chart.service';
import { ViewMode } from './utils/enums';
export declare class AimGanttChartComponent implements OnInit {
    private service;
    ganttChartObj: any;
    ganttTarget: string;
    constructor(service: AimGanttChartService);
    ngOnInit(): void;
    showProjectOverview(tasks: any): void;
    showGantt(tasks: any, viewMode?: ViewMode): void;
}
