/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AimGanttChartService {
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
/** @nocollapse */ AimGanttChartService.ngInjectableDef = i0.defineInjectable({ factory: function AimGanttChartService_Factory() { return new AimGanttChartService(); }, token: AimGanttChartService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWltLWdhbnR0LWNoYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9haW0tZ2FudHQtY2hhcnQvIiwic291cmNlcyI6WyJsaWIvYWltLWdhbnR0LWNoYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBS3pDLE1BQU0sT0FBTyxvQkFBb0I7SUFFL0I7SUFDQSxDQUFDOzs7O0lBRUQsU0FBUztRQUNQLE9BQU87WUFDTDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDO2dCQUNSLFFBQVEsRUFBRSxFQUFFO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsR0FBRyxFQUFFLFlBQVk7d0JBQ2pCLElBQUksRUFBRSxVQUFVO3dCQUNoQixFQUFFLEVBQUUsUUFBUTt3QkFDWixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsS0FBSztxQkFDZjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsR0FBRyxFQUFFLFlBQVk7d0JBQ2pCLElBQUksRUFBRSxjQUFjO3dCQUNwQixFQUFFLEVBQUUsUUFBUTt3QkFDWixRQUFRLEVBQUUsR0FBRzt3QkFDYixLQUFLLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsS0FBSztxQkFDZjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsR0FBRyxFQUFFLFlBQVk7d0JBQ2pCLElBQUksRUFBRSxjQUFjO3dCQUNwQixFQUFFLEVBQUUsUUFBUTt3QkFDWixRQUFRLEVBQUUsR0FBRzt3QkFDYixLQUFLLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsS0FBSztxQkFDZjtpQkFDRjthQUNGO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFlBQVk7Z0JBQ25CLEdBQUcsRUFBRSxZQUFZO2dCQUNqQixLQUFLLEVBQUUsQ0FBQztnQkFDUixRQUFRLEVBQUUsRUFBRTtnQkFDWixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUU7b0JBQ1I7d0JBQ0UsS0FBSyxFQUFFLFlBQVk7d0JBQ25CLEdBQUcsRUFBRSxZQUFZO3dCQUNqQixJQUFJLEVBQUUsS0FBSzt3QkFDWCxFQUFFLEVBQUUsUUFBUTt3QkFDWixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsS0FBSztxQkFDZjtvQkFDRDt3QkFDRSxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsR0FBRyxFQUFFLFlBQVk7d0JBQ2pCLElBQUksRUFBRSxLQUFLO3dCQUNYLEVBQUUsRUFBRSxRQUFRO3dCQUNaLFFBQVEsRUFBRSxDQUFDO3dCQUNYLEtBQUssRUFBRSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNFLEtBQUssRUFBRSxZQUFZO3dCQUNuQixHQUFHLEVBQUUsWUFBWTt3QkFDakIsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsRUFBRSxFQUFFLFFBQVE7d0JBQ1osUUFBUSxFQUFFLENBQUM7d0JBQ1gsS0FBSyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLEtBQUs7cUJBQ2Y7aUJBQ0Y7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFyRkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWltR2FudHRDaGFydFNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgZ2V0TW9ja2VkKCkge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdNb2NrIDEnLFxuICAgICAgICBzdGFydDogJzIwMTktMDYtMDEnLFxuICAgICAgICBlbmQ6ICcyMDE5LTA4LTEwJyxcbiAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgIHByb2dyZXNzOiAxMCxcbiAgICAgICAgb3ZlcmR1ZTogZmFsc2UsXG4gICAgICAgIHRhc2tMaXN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhcnQ6ICcyMDE5LTA2LTA1JyxcbiAgICAgICAgICAgIGVuZDogJzIwMTktMDctMDEnLFxuICAgICAgICAgICAgbmFtZTogJ0tpY2sgb2ZmJyxcbiAgICAgICAgICAgIGlkOiAnVGFzayAxJyxcbiAgICAgICAgICAgIHByb2dyZXNzOiA1LFxuICAgICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgICBvdmVyZHVlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhcnQ6ICcyMDE5LTA2LTAxJyxcbiAgICAgICAgICAgIGVuZDogJzIwMTktMDYtMTUnLFxuICAgICAgICAgICAgbmFtZTogJ0NFQiBhcHByb3ZhbCcsXG4gICAgICAgICAgICBpZDogJ1Rhc2sgMicsXG4gICAgICAgICAgICBwcm9ncmVzczogMTAwLFxuICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICBvdmVyZHVlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhcnQ6ICcyMDE5LTA2LTAxJyxcbiAgICAgICAgICAgIGVuZDogJzIwMTktMDYtMTUnLFxuICAgICAgICAgICAgbmFtZTogJ0NFQiBhcHByb3ZhbCcsXG4gICAgICAgICAgICBpZDogJ1Rhc2sgMicsXG4gICAgICAgICAgICBwcm9ncmVzczogMTAwLFxuICAgICAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgICAgICBvdmVyZHVlOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ01vY2sgMicsXG4gICAgICAgIHN0YXJ0OiAnMjAxOS0wNi0wMScsXG4gICAgICAgIGVuZDogJzIwMTktMDctMTAnLFxuICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgcHJvZ3Jlc3M6IDE1LFxuICAgICAgICBvdmVyZHVlOiBmYWxzZSxcbiAgICAgICAgdGFza0xpc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGFydDogJzIwMTktMDYtMDEnLFxuICAgICAgICAgICAgZW5kOiAnMjAxOS0wNy0xMCcsXG4gICAgICAgICAgICBuYW1lOiAnQk9NJyxcbiAgICAgICAgICAgIGlkOiAnVGFzayA3JyxcbiAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgICBvdmVyZHVlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhcnQ6ICcyMDE5LTA2LTAxJyxcbiAgICAgICAgICAgIGVuZDogJzIwMTktMDctMTAnLFxuICAgICAgICAgICAgbmFtZTogJ0JPTScsXG4gICAgICAgICAgICBpZDogJ1Rhc2sgNycsXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgIGxldmVsOiAzLFxuICAgICAgICAgICAgb3ZlcmR1ZTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0OiAnMjAxOS0wNi0wMScsXG4gICAgICAgICAgICBlbmQ6ICcyMDE5LTA3LTEwJyxcbiAgICAgICAgICAgIG5hbWU6ICdCT00nLFxuICAgICAgICAgICAgaWQ6ICdUYXNrIDcnLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgICAgIG92ZXJkdWU6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXTtcbiAgfVxufVxuIl19