/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { AimGanttChartService } from './aim-gantt-chart.service';
import * as GanntChart from 'js-gantt-chart/dist/gantt-chart.js';
import { Language, ViewMode } from './utils/enums';
// @ts-ignore
var AimGanttChartComponent = /** @class */ (function () {
    function AimGanttChartComponent(service) {
        this.service = service;
        this.ganttTarget = '.gantt-target';
    }
    /**
     * @return {?}
     */
    AimGanttChartComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.showGantt(this.service.getMocked());
    };
    /*  This method show Gantt as Project Overview, showing project as a Bar
     */
    /*  This method show Gantt as Project Overview, showing project as a Bar
       */
    /**
     * @param {?} tasks
     * @return {?}
     */
    AimGanttChartComponent.prototype.showProjectOverview = /*  This method show Gantt as Project Overview, showing project as a Bar
       */
    /**
     * @param {?} tasks
     * @return {?}
     */
    function (tasks) {
        this.ganttChartObj = new GanntChart(this.ganttTarget, tasks, {
            view_mode: ViewMode.Month,
            language: Language.English,
            project_overview: true
        });
    };
    /*
      This method show a Gantt Chart.
     */
    /*
        This method show a Gantt Chart.
       */
    /**
     * @param {?} tasks
     * @param {?=} viewMode
     * @return {?}
     */
    AimGanttChartComponent.prototype.showGantt = /*
        This method show a Gantt Chart.
       */
    /**
     * @param {?} tasks
     * @param {?=} viewMode
     * @return {?}
     */
    function (tasks, viewMode) {
        this.ganttChartObj = new GanntChart(this.ganttTarget, tasks, {
            view_mode: viewMode ? viewMode : ViewMode.Day,
            language: Language.English,
            project_overview: false
        });
    };
    AimGanttChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gc-aim-gantt-chart',
                    template: "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta charset=\"UTF-8\">\r\n\r\n  <style>\r\n    body {\r\n      font-family: sans-serif;\r\n      width: auto;\r\n    }\r\n  </style>\r\n</head>\r\n<body>\r\n<div class=\"gantt-target\"></div>\r\n\r\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    AimGanttChartComponent.ctorParameters = function () { return [
        { type: AimGanttChartService }
    ]; };
    return AimGanttChartComponent;
}());
export { AimGanttChartComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWltLWdhbnR0LWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FpbS1nYW50dC1jaGFydC8iLCJzb3VyY2VzIjpbImxpYi9haW0tZ2FudHQtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sS0FBSyxVQUFVLE1BQU0sb0NBQW9DLENBQUM7QUFDakUsT0FBTyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBR2pEO0lBV0UsZ0NBQW9CLE9BQTZCO1FBQTdCLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBRjFDLGdCQUFXLEdBQUcsZUFBZSxDQUFDO0lBR3JDLENBQUM7Ozs7SUFFRCx5Q0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7T0FDRzs7Ozs7OztJQUNILG9EQUFtQjs7Ozs7O0lBQW5CLFVBQW9CLEtBQUs7UUFDdkIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRTtZQUMzRCxTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDekIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxPQUFPO1lBQzFCLGdCQUFnQixFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHOzs7Ozs7Ozs7SUFDSCwwQ0FBUzs7Ozs7Ozs7SUFBVCxVQUFVLEtBQUssRUFBRSxRQUFtQjtRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFO1lBQzNELFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUc7WUFDN0MsUUFBUSxFQUFFLFFBQVEsQ0FBQyxPQUFPO1lBQzFCLGdCQUFnQixFQUFFLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0JBckNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QiwwUUFBNkM7O2lCQUU5Qzs7OztnQkFUTyxvQkFBb0I7O0lBNEM1Qiw2QkFBQztDQUFBLEFBdkNELElBdUNDO1NBakNZLHNCQUFzQjs7O0lBRWpDLCtDQUFxQjs7SUFDckIsNkNBQXFDOzs7OztJQUV6Qix5Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBaW1HYW50dENoYXJ0U2VydmljZX0gZnJvbSAnLi9haW0tZ2FudHQtY2hhcnQuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBHYW5udENoYXJ0IGZyb20gJ2pzLWdhbnR0LWNoYXJ0L2Rpc3QvZ2FudHQtY2hhcnQuanMnO1xuaW1wb3J0IHtMYW5ndWFnZSwgVmlld01vZGV9IGZyb20gJy4vdXRpbHMvZW51bXMnO1xuXG4vLyBAdHMtaWdub3JlXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYy1haW0tZ2FudHQtY2hhcnQnLFxuICB0ZW1wbGF0ZVVybDogJ2FpbS1nYW50dC1jaGFydC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FpbS5nYW50dC1jaGFydC5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBBaW1HYW50dENoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgZ2FudHRDaGFydE9iajtcbiAgcHVibGljIGdhbnR0VGFyZ2V0ID0gJy5nYW50dC10YXJnZXQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydmljZTogQWltR2FudHRDaGFydFNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2hvd0dhbnR0KHRoaXMuc2VydmljZS5nZXRNb2NrZWQoKSk7XG4gIH1cblxuICAvKiAgVGhpcyBtZXRob2Qgc2hvdyBHYW50dCBhcyBQcm9qZWN0IE92ZXJ2aWV3LCBzaG93aW5nIHByb2plY3QgYXMgYSBCYXJcbiAgICovXG4gIHNob3dQcm9qZWN0T3ZlcnZpZXcodGFza3MpIHtcbiAgICB0aGlzLmdhbnR0Q2hhcnRPYmogPSBuZXcgR2FubnRDaGFydCh0aGlzLmdhbnR0VGFyZ2V0LCB0YXNrcywge1xuICAgICAgdmlld19tb2RlOiBWaWV3TW9kZS5Nb250aCxcbiAgICAgIGxhbmd1YWdlOiBMYW5ndWFnZS5FbmdsaXNoLFxuICAgICAgcHJvamVjdF9vdmVydmlldzogdHJ1ZVxuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICBUaGlzIG1ldGhvZCBzaG93IGEgR2FudHQgQ2hhcnQuXG4gICAqL1xuICBzaG93R2FudHQodGFza3MsIHZpZXdNb2RlPzogVmlld01vZGUpIHtcbiAgICB0aGlzLmdhbnR0Q2hhcnRPYmogPSBuZXcgR2FubnRDaGFydCh0aGlzLmdhbnR0VGFyZ2V0LCB0YXNrcywge1xuICAgICAgdmlld19tb2RlOiB2aWV3TW9kZSA/IHZpZXdNb2RlIDogVmlld01vZGUuRGF5LFxuICAgICAgbGFuZ3VhZ2U6IExhbmd1YWdlLkVuZ2xpc2gsXG4gICAgICBwcm9qZWN0X292ZXJ2aWV3OiBmYWxzZVxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==