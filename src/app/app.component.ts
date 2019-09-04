import {Component} from '@angular/core';

@Component({
  selector: 'aigc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private ganttTarget = '.gantt-chart-target';
  private options = {
    view_mode: 'Week',
    language: 'en',
    project_overview: false
  };

  getMocked2() {
    return [
      {
        start: '2019-06-01',
        end: '2019-06-10',
        name: 'Refreshed Project',
        id: 'TaskModel 0',
        progress: 55,
        level: 0,
        overdue: true,
        showOnGraph: true,
        taskList: [
          {
            start: '2019-06-10',
            end: '2019-06-12',
            name: 'Refreshed Tasks',
            id: 'TaskModel 1',
            progress: 13,
            showOnGraph: true,
            level: 1,
            overdue: true
          },
          {
            start: '2019-06-12',
            end: '2019-06-15',
            name: 'Another Task',
            id: 'TaskModel 2',
            progress: 100,
            level: 2,
            overdue: true,
            showOnGraph: true,
          }
        ]
      }
    ];
  }

}
