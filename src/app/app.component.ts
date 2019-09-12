import {Component} from '@angular/core';

@Component({
  selector: 'aigc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private ganttTarget = '.gantt-chart-target';
  private options = {
    viewMode: 'Day',
    language: 'en',
    projectOverview: false
  };

  getMocked2() {
    return [
      {
        start: '2019-08-05',
        end: '2019-08-20',
        name: 'Refreshed Project',
        id: 'TaskModel 0',
        progress: 55,
        level: 0,
        overdue: true,
        showOnGraph: true,
        taskList: [
          {
            start: '2019-08-11',
            end: '2019-08-15',
            name: 'Refreshed Tasks',
            id: 'TaskModel 1',
            progress: 13,
            showOnGraph: true,
            level: 1,
            overdue: true
          },
          {
            start: '2019-08-12',
            end: '2019-08-18',
            name: 'Another Task',
            id: 'TaskModel 2',
            progress: 100,
            level: 2,
            overdue: true,
            showOnGraph: true,
          }
        ]
      }, {
        start: '2019-09-01',
        end: '2019-09-20',
        name: 'Stabilise Project',
        id: 'TaskModel 3',
        progress: 79,
        level: 0,
        overdue: false,
        showOnGraph: true,
        taskList: [
          {
            start: '2019-09-05',
            end: '2019-09-15',
            name: 'Stabilise Tasks',
            id: 'TaskModel 4',
            progress: 66,
            showOnGraph: true,
            level: 1,
            overdue: false
          },
          {
            start: '2019-09-12',
            end: '2019-09-15',
            name: 'Great Task',
            id: 'TaskModel 5',
            progress: 0,
            level: 2,
            overdue: false,
            showOnGraph: true,
          },
          {
            start: '2019-09-12',
            end: '2019-09-13',
            name: 'Amazing Task',
            id: 'TaskModel 6',
            progress: 0,
            level: 3,
            overdue: false,
            showOnGraph: true,
          }
        ]
      }
    ];
  }
}
