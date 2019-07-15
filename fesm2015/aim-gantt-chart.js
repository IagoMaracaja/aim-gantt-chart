import * as GanntChart from 'js-gantt-chart/dist/gantt-chart.js';
import { Injectable, Component, NgModule, defineInjectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AimGanttChartService {
    constructor() {
    }
    /**
     * @return {?}
     */
    getMocked() {
        return [
            {
                name: 'Mock 1',
                start: '2019-06-01',
                end: '2019-08-10',
                level: 0,
                progress: 10,
                overdue: false,
                taskList: [
                    {
                        start: '2019-06-05',
                        end: '2019-07-01',
                        name: 'Kick off',
                        id: 'Task 1',
                        progress: 5,
                        level: 1,
                        overdue: false
                    },
                    {
                        start: '2019-06-01',
                        end: '2019-06-15',
                        name: 'CEB approval',
                        id: 'Task 2',
                        progress: 100,
                        level: 2,
                        overdue: false
                    },
                    {
                        start: '2019-06-01',
                        end: '2019-06-15',
                        name: 'CEB approval',
                        id: 'Task 2',
                        progress: 100,
                        level: 3,
                        overdue: false
                    }
                ]
            },
            {
                name: 'Mock 2',
                start: '2019-06-01',
                end: '2019-07-10',
                level: 0,
                progress: 15,
                overdue: false,
                taskList: [
                    {
                        start: '2019-06-01',
                        end: '2019-07-10',
                        name: 'BOM',
                        id: 'Task 7',
                        progress: 0,
                        level: 1,
                        overdue: false
                    },
                    {
                        start: '2019-06-01',
                        end: '2019-07-10',
                        name: 'BOM',
                        id: 'Task 7',
                        progress: 0,
                        level: 3,
                        overdue: false
                    },
                    {
                        start: '2019-06-01',
                        end: '2019-07-10',
                        name: 'BOM',
                        id: 'Task 7',
                        progress: 0,
                        level: 3,
                        overdue: false
                    }
                ]
            }
        ];
    }
}
AimGanttChartService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
AimGanttChartService.ctorParameters = () => [];
/** @nocollapse */ AimGanttChartService.ngInjectableDef = defineInjectable({ factory: function AimGanttChartService_Factory() { return new AimGanttChartService(); }, token: AimGanttChartService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const ViewMode = {
    Day: 'Day',
    Week: 'Week',
    Month: 'Month',
};
/** @enum {string} */
const Language = {
    English: 'en',
    Spanish: 'es',
    Russian: 'ru',
    Portuguese: 'ptBr',
    French: 'fr',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// @ts-ignore
class AimGanttChartComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AimGanttChartModule {
}
AimGanttChartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [AimGanttChartComponent],
                imports: [],
                exports: [AimGanttChartComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AimGanttChartService, AimGanttChartComponent, AimGanttChartModule };

//# sourceMappingURL=aim-gantt-chart.js.map