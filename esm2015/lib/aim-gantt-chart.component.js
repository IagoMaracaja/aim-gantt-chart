/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { AimGanttChartService } from './aim-gantt-chart.service';
import * as GanntChart from 'js-gantt-chart/dist/gantt-chart.js';
import { Language, ViewMode } from './utils/enums';
// @ts-ignore
export class AimGanttChartComponent {
    /**
     * @param {?} service
     */
    constructor(service) {
        this.service = service;
        this.ganttTarget = '.gantt-target';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.showGantt(this.service.getMocked());
    }
    /*  This method show Gantt as Project Overview, showing project as a Bar
       */
    /**
     * @param {?} tasks
     * @return {?}
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
    /**
     * @param {?} tasks
     * @param {?=} viewMode
     * @return {?}
     */
    showGantt(tasks, viewMode) {
        this.ganttChartObj = new GanntChart(this.ganttTarget, tasks, {
            view_mode: viewMode ? viewMode : ViewMode.Day,
            language: Language.English,
            project_overview: false
        });
    }
}
AimGanttChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'gc-aim-gantt-chart',
                template: "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n\r\n  <style>\r\n    body {\r\n      font-family: sans-serif;\r\n      width: auto;\r\n    }\r\n  </style>\r\n</head>\r\n<body>\r\n<div class=\"gantt-target\"></div>\r\n\r\n",
                styles: [""]
            }] }
];
/** @nocollapse */
AimGanttChartComponent.ctorParameters = () => [
    { type: AimGanttChartService }
];
if (false) {
    /** @type {?} */
    AimGanttChartComponent.prototype.ganttChartObj;
    /** @type {?} */
    AimGanttChartComponent.prototype.ganttTarget;
    /**
     * @type {?}
     * @private
     */
    AimGanttChartComponent.prototype.service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWltLWdhbnR0LWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FpbS1nYW50dC1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9haW0tZ2FudHQtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sS0FBSyxVQUFVLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBU2pELE1BQU0sT0FBTyxzQkFBc0I7Ozs7SUFLakMsWUFBb0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFGMUMsZ0JBQVcsR0FBRyxlQUFlLENBQUM7SUFHckMsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDOzs7Ozs7O0lBSUQsbUJBQW1CLENBQUMsS0FBSztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzNELFNBQVMsRUFBRSxRQUFRLENBQUMsS0FBSztZQUN6QixRQUFRLEVBQUUsUUFBUSxDQUFDLE9BQU87WUFDMUIsZ0JBQWdCLEVBQUUsSUFBSTtTQUN2QixDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7Ozs7SUFLRCxTQUFTLENBQUMsS0FBSyxFQUFFLFFBQW1CO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUU7WUFDM0QsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRztZQUM3QyxRQUFRLEVBQUUsUUFBUSxDQUFDLE9BQU87WUFDMUIsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QixDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUFyQ0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLDBRQUE2Qzs7YUFFOUM7Ozs7WUFUTyxvQkFBb0I7Ozs7SUFhMUIsK0NBQXFCOztJQUNyQiw2Q0FBcUM7Ozs7O0lBRXpCLHlDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FpbUdhbnR0Q2hhcnRTZXJ2aWNlfSBmcm9tICcuL2FpbS1nYW50dC1jaGFydC5zZXJ2aWNlJztcbmltcG9ydCAqIGFzIEdhbm50Q2hhcnQgZnJvbSAnanMtZ2FudHQtY2hhcnQvZGlzdC9nYW50dC1jaGFydC5qcyc7XG5pbXBvcnQge0xhbmd1YWdlLCBWaWV3TW9kZX0gZnJvbSAnLi91dGlscy9lbnVtcyc7XG5cbi8vIEB0cy1pZ25vcmVcbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2djLWFpbS1nYW50dC1jaGFydCcsXG4gIHRlbXBsYXRlVXJsOiAnYWltLWdhbnR0LWNoYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWltLmdhbnR0LWNoYXJ0LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEFpbUdhbnR0Q2hhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBnYW50dENoYXJ0T2JqO1xuICBwdWJsaWMgZ2FudHRUYXJnZXQgPSAnLmdhbnR0LXRhcmdldCc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2aWNlOiBBaW1HYW50dENoYXJ0U2VydmljZSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zaG93R2FudHQodGhpcy5zZXJ2aWNlLmdldE1vY2tlZCgpKTtcbiAgfVxuXG4gIC8qICBUaGlzIG1ldGhvZCBzaG93IEdhbnR0IGFzIFByb2plY3QgT3ZlcnZpZXcsIHNob3dpbmcgcHJvamVjdCBhcyBhIEJhclxuICAgKi9cbiAgc2hvd1Byb2plY3RPdmVydmlldyh0YXNrcykge1xuICAgIHRoaXMuZ2FudHRDaGFydE9iaiA9IG5ldyBHYW5udENoYXJ0KHRoaXMuZ2FudHRUYXJnZXQsIHRhc2tzLCB7XG4gICAgICB2aWV3X21vZGU6IFZpZXdNb2RlLk1vbnRoLFxuICAgICAgbGFuZ3VhZ2U6IExhbmd1YWdlLkVuZ2xpc2gsXG4gICAgICBwcm9qZWN0X292ZXJ2aWV3OiB0cnVlXG4gICAgfSk7XG4gIH1cblxuICAvKlxuICAgIFRoaXMgbWV0aG9kIHNob3cgYSBHYW50dCBDaGFydC5cbiAgICovXG4gIHNob3dHYW50dCh0YXNrcywgdmlld01vZGU/OiBWaWV3TW9kZSkge1xuICAgIHRoaXMuZ2FudHRDaGFydE9iaiA9IG5ldyBHYW5udENoYXJ0KHRoaXMuZ2FudHRUYXJnZXQsIHRhc2tzLCB7XG4gICAgICB2aWV3X21vZGU6IHZpZXdNb2RlID8gdmlld01vZGUgOiBWaWV3TW9kZS5EYXksXG4gICAgICBsYW5ndWFnZTogTGFuZ3VhZ2UuRW5nbGlzaCxcbiAgICAgIHByb2plY3Rfb3ZlcnZpZXc6IGZhbHNlXG4gICAgfSk7XG4gIH1cblxufVxuIl19