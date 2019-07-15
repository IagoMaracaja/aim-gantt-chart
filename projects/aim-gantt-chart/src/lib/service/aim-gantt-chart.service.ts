import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AimGanttChartService {

  constructor() {
  }

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
