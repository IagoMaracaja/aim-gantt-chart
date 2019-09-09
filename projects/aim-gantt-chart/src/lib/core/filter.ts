import {Gantt} from '../models/gantt.models';
import {GanttChartComponent} from '../component/gantt-chart/gantt-chart.component';
import {ChartOptions} from '../models/chartOptions.models';
import {createSVG} from '../utils/svg-utils';
import {GanttOptions} from '../models/ganttOptions.models';

export class Filter {
  private gantt: Gantt;
  private filterLayer: SVGAElement;
  private chartOptions: ChartOptions;
  private options: GanttOptions;
  private filterOptions = ['Day', 'Week', 'Month'];

  constructor(gantt: Gantt, chartOptions: ChartOptions, options: GanttOptions) {
    this.gantt = gantt;
    this.chartOptions = chartOptions;
    this.options = options;
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
        <div class="filter" id="ganttFilter">
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

  drawFilter() {
    const filterHeight = this.options.headerHeight;
    this.filterLayer = createSVG('g', {
      x: 0,
      y: 0,
      width: this.chartOptions.startPosition,
      height: filterHeight,
      class: 'filter',
      append_to: this.chartOptions.layers.filter
    });
    this.drawSubLayers();
  }

  drawSubLayers() {
    const layerHeight = this.options.headerHeight / 3;
    let yCoords = 0;
    for (let counter = 1; counter <= 3; counter++) {
      const layer = createSVG('g', {
        x: 0,
        y: yCoords,
        width: this.chartOptions.startPosition,
        height: layerHeight,
        class: 'filter-option',
        append_to: this.filterLayer
      });
      this.drawItems(layer, layerHeight, yCoords, this.filterOptions[counter - 1]);
      yCoords = counter * layerHeight;
    }
  }

  drawItems(layer: SVGAElement, layerHeight, yCoords, optionLabel) {
    // attributes for checkbox
    const cornerRadius = 5;
    const margin = 2;
    const checkboxProp = layerHeight - 2 * margin; // Width and Height
    const xCoords = this.chartOptions.startPosition / 4;
    this.drawCheckbox(xCoords, yCoords, cornerRadius, checkboxProp, layer);

    // attributes for label
    const labelPosX = this.chartOptions.startPosition / 2;
    const labelPosY = yCoords + (layerHeight / 2) - margin * 2;
    this.drawLabel(labelPosX, labelPosY, optionLabel, layer);

    // attributes for circle
    const circleX = (xCoords) + checkboxProp / 2 ;
    const circleY = (yCoords) + checkboxProp / 2;
    this.drawCircleTest(circleX, circleY, layer);

  }

  drawCheckbox(xCoords, yCoords, cornerRadius, checkboxProp, layer) {
    createSVG('rect', {
      x: xCoords,
      y: yCoords,
      rx: cornerRadius,
      ry: cornerRadius,
      width: checkboxProp,
      height: checkboxProp,
      class: 'checkbox',
      append_to: layer
    });
  }

  drawLabel(labelPosX, labelPosY, optionLabel, layer) {
    createSVG('text', {
      x: labelPosX,
      y: labelPosY,
      innerHTML: optionLabel,
      class: 'filter-option-name',
      append_to: layer
    });
  }

  drawCircleTest(posX, posY, layer) {
    createSVG('circle', {
      cx: posX,
      cy: posY,
      r: 5,
      class: 'circle',
      append_to: layer
    });
  }

}
