import {Gantt} from '../models/gantt.models';
import {GanttChartComponent} from '../component/gantt-chart/gantt-chart.component';

export class Filter {
  private gantt: Gantt;

  constructor(gantt: Gantt) {
    this.gantt = gantt;
  }

  static changeFilter(filterType, gantt) {
    switch (filterType) {
      case 1:
        gantt.refreshByFilter('Day');
        break;
      case 2:
        gantt.refreshByFilter('Week');
        break;
      case 3:
        gantt.refreshByFilter('Month');
        break;
    }
  }

  getFilter() {
    return `
        <div class="radio-btn">
            <label class="container">Days
               <input type="radio" id="radioDay" checked="checked" name="radio">
               <span class="checkmark"/>
            </label>
            <label class="container">Week
              <input type="radio" id="radioWeek" name="radio">
              <span class="checkmark"/>
            </label>
            <label class="container">Month
              <input type="radio" id="radioMonth" name="radio">
              <span class="checkmark"/>
            </label>
        </div>
    `;
  }

  checkDefault(filterType) {
    switch (filterType) {
      case 1:
        const radioBtnDay = document.getElementById('radioDay');
        radioBtnDay.setAttribute('checked', 'true');
        break;
      case 2:
        const radioBtnWeek = document.getElementById('radioWeek');
        radioBtnWeek.setAttribute('checked', 'true');
        break;
      case 3:
        const radioBtnMonth = document.getElementById('radioMonth');
        radioBtnMonth.setAttribute('checked', 'true');
        break;
    }
  }

  setClick(ganttComponent: GanttChartComponent) {
    const radioBtnDay = document.getElementById('radioDay');
    radioBtnDay.addEventListener(
      'click',
      // tslint:disable-next-line:only-arrow-functions
      function() {
        Filter.changeFilter(1, ganttComponent);
      },
      false
    );
    const radioBtnWeek = document.getElementById('radioWeek');
    radioBtnWeek.addEventListener(
      'click',
      // tslint:disable-next-line:only-arrow-functions
      function() {
        Filter.changeFilter(2, ganttComponent);
      },
      false
    );
    const radioBtnMonth = document.getElementById('radioMonth');
    radioBtnMonth.addEventListener(
      'click',
      // tslint:disable-next-line:only-arrow-functions
      function() {
        Filter.changeFilter(3, ganttComponent);
      },
      false
    );
  }
}
