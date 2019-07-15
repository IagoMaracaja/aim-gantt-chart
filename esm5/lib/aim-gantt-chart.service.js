/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var AimGanttChartService = /** @class */ (function () {
    function AimGanttChartService() {
    }
    /**
     * @return {?}
     */
    AimGanttChartService.prototype.getMocked = /**
     * @return {?}
     */
    function () {
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
    };
    AimGanttChartService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    AimGanttChartService.ctorParameters = function () { return []; };
    /** @nocollapse */ AimGanttChartService.ngInjectableDef = i0.defineInjectable({ factory: function AimGanttChartService_Factory() { return new AimGanttChartService(); }, token: AimGanttChartService, providedIn: "root" });
    return AimGanttChartService;
}());
export { AimGanttChartService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWltLWdhbnR0LWNoYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9haW0tZ2FudHQtY2hhcnQvIiwic291cmNlcyI6WyJsaWIvYWltLWdhbnR0LWNoYXJ0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBRXpDO0lBS0U7SUFDQSxDQUFDOzs7O0lBRUQsd0NBQVM7OztJQUFUO1FBQ0UsT0FBTztZQUNMO2dCQUNFLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxZQUFZO2dCQUNuQixHQUFHLEVBQUUsWUFBWTtnQkFDakIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsUUFBUSxFQUFFO29CQUNSO3dCQUNFLEtBQUssRUFBRSxZQUFZO3dCQUNuQixHQUFHLEVBQUUsWUFBWTt3QkFDakIsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEVBQUUsRUFBRSxRQUFRO3dCQUNaLFFBQVEsRUFBRSxDQUFDO3dCQUNYLEtBQUssRUFBRSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNFLEtBQUssRUFBRSxZQUFZO3dCQUNuQixHQUFHLEVBQUUsWUFBWTt3QkFDakIsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLEVBQUUsRUFBRSxRQUFRO3dCQUNaLFFBQVEsRUFBRSxHQUFHO3dCQUNiLEtBQUssRUFBRSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNFLEtBQUssRUFBRSxZQUFZO3dCQUNuQixHQUFHLEVBQUUsWUFBWTt3QkFDakIsSUFBSSxFQUFFLGNBQWM7d0JBQ3BCLEVBQUUsRUFBRSxRQUFRO3dCQUNaLFFBQVEsRUFBRSxHQUFHO3dCQUNiLEtBQUssRUFBRSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxLQUFLO3FCQUNmO2lCQUNGO2FBQ0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsWUFBWTtnQkFDbkIsR0FBRyxFQUFFLFlBQVk7Z0JBQ2pCLEtBQUssRUFBRSxDQUFDO2dCQUNSLFFBQVEsRUFBRSxFQUFFO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRTtvQkFDUjt3QkFDRSxLQUFLLEVBQUUsWUFBWTt3QkFDbkIsR0FBRyxFQUFFLFlBQVk7d0JBQ2pCLElBQUksRUFBRSxLQUFLO3dCQUNYLEVBQUUsRUFBRSxRQUFRO3dCQUNaLFFBQVEsRUFBRSxDQUFDO3dCQUNYLEtBQUssRUFBRSxDQUFDO3dCQUNSLE9BQU8sRUFBRSxLQUFLO3FCQUNmO29CQUNEO3dCQUNFLEtBQUssRUFBRSxZQUFZO3dCQUNuQixHQUFHLEVBQUUsWUFBWTt3QkFDakIsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsRUFBRSxFQUFFLFFBQVE7d0JBQ1osUUFBUSxFQUFFLENBQUM7d0JBQ1gsS0FBSyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxFQUFFLEtBQUs7cUJBQ2Y7b0JBQ0Q7d0JBQ0UsS0FBSyxFQUFFLFlBQVk7d0JBQ25CLEdBQUcsRUFBRSxZQUFZO3dCQUNqQixJQUFJLEVBQUUsS0FBSzt3QkFDWCxFQUFFLEVBQUUsUUFBUTt3QkFDWixRQUFRLEVBQUUsQ0FBQzt3QkFDWCxLQUFLLEVBQUUsQ0FBQzt3QkFDUixPQUFPLEVBQUUsS0FBSztxQkFDZjtpQkFDRjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQXJGRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OzsrQkFKRDtDQXdGQyxBQXRGRCxJQXNGQztTQW5GWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBaW1HYW50dENoYXJ0U2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBnZXRNb2NrZWQoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ01vY2sgMScsXG4gICAgICAgIHN0YXJ0OiAnMjAxOS0wNi0wMScsXG4gICAgICAgIGVuZDogJzIwMTktMDgtMTAnLFxuICAgICAgICBsZXZlbDogMCxcbiAgICAgICAgcHJvZ3Jlc3M6IDEwLFxuICAgICAgICBvdmVyZHVlOiBmYWxzZSxcbiAgICAgICAgdGFza0xpc3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGFydDogJzIwMTktMDYtMDUnLFxuICAgICAgICAgICAgZW5kOiAnMjAxOS0wNy0wMScsXG4gICAgICAgICAgICBuYW1lOiAnS2ljayBvZmYnLFxuICAgICAgICAgICAgaWQ6ICdUYXNrIDEnLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDUsXG4gICAgICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgICAgIG92ZXJkdWU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGFydDogJzIwMTktMDYtMDEnLFxuICAgICAgICAgICAgZW5kOiAnMjAxOS0wNi0xNScsXG4gICAgICAgICAgICBuYW1lOiAnQ0VCIGFwcHJvdmFsJyxcbiAgICAgICAgICAgIGlkOiAnVGFzayAyJyxcbiAgICAgICAgICAgIHByb2dyZXNzOiAxMDAsXG4gICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgIG92ZXJkdWU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGFydDogJzIwMTktMDYtMDEnLFxuICAgICAgICAgICAgZW5kOiAnMjAxOS0wNi0xNScsXG4gICAgICAgICAgICBuYW1lOiAnQ0VCIGFwcHJvdmFsJyxcbiAgICAgICAgICAgIGlkOiAnVGFzayAyJyxcbiAgICAgICAgICAgIHByb2dyZXNzOiAxMDAsXG4gICAgICAgICAgICBsZXZlbDogMyxcbiAgICAgICAgICAgIG92ZXJkdWU6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnTW9jayAyJyxcbiAgICAgICAgc3RhcnQ6ICcyMDE5LTA2LTAxJyxcbiAgICAgICAgZW5kOiAnMjAxOS0wNy0xMCcsXG4gICAgICAgIGxldmVsOiAwLFxuICAgICAgICBwcm9ncmVzczogMTUsXG4gICAgICAgIG92ZXJkdWU6IGZhbHNlLFxuICAgICAgICB0YXNrTGlzdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0OiAnMjAxOS0wNi0wMScsXG4gICAgICAgICAgICBlbmQ6ICcyMDE5LTA3LTEwJyxcbiAgICAgICAgICAgIG5hbWU6ICdCT00nLFxuICAgICAgICAgICAgaWQ6ICdUYXNrIDcnLFxuICAgICAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgICAgICBsZXZlbDogMSxcbiAgICAgICAgICAgIG92ZXJkdWU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGFydDogJzIwMTktMDYtMDEnLFxuICAgICAgICAgICAgZW5kOiAnMjAxOS0wNy0xMCcsXG4gICAgICAgICAgICBuYW1lOiAnQk9NJyxcbiAgICAgICAgICAgIGlkOiAnVGFzayA3JyxcbiAgICAgICAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgICAgICAgbGV2ZWw6IDMsXG4gICAgICAgICAgICBvdmVyZHVlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3RhcnQ6ICcyMDE5LTA2LTAxJyxcbiAgICAgICAgICAgIGVuZDogJzIwMTktMDctMTAnLFxuICAgICAgICAgICAgbmFtZTogJ0JPTScsXG4gICAgICAgICAgICBpZDogJ1Rhc2sgNycsXG4gICAgICAgICAgICBwcm9ncmVzczogMCxcbiAgICAgICAgICAgIGxldmVsOiAzLFxuICAgICAgICAgICAgb3ZlcmR1ZTogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iXX0=