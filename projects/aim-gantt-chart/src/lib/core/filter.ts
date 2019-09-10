import {Gantt} from '../models/gantt.models';
import {GanttChartComponent} from '../component/gantt-chart/gantt-chart.component';
import {ChartOptions} from '../models/chartOptions.models';
import {createSVG, on} from '../utils/svg-utils';
import {GanttOptions} from '../models/ganttOptions.models';

export class Filter {
  private gantt: Gantt;
  private filterLayer: SVGAElement;
  private chartOptions: ChartOptions;
  private options: GanttOptions;
  private filterOptions = ['Day', 'Week', 'Month'];
  private optionChecked: SVGAElement;
  private readonly filterType: number;
  private readonly ganttComponent: GanttChartComponent;

  constructor(gantt: Gantt, chartOptions: ChartOptions, options: GanttOptions, filterType: number, ganttComponent: GanttChartComponent) {
    this.gantt = gantt;
    this.chartOptions = chartOptions;
    this.options = options;
    this.filterType = filterType;
    this.ganttComponent = ganttComponent;
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
      this.drawItems(layer, layerHeight, yCoords, this.filterOptions[counter - 1], counter);
      yCoords = counter * layerHeight;
    }
  }

  drawItems(layer: SVGAElement, layerHeight, yCoords, optionLabel, index) {
    // attributes for checkbox
    const cornerRadius = 5;
    const margin = 2;
    const checkboxProp = layerHeight - 2 * margin; // Width and Height
    const xCoords = this.chartOptions.startPosition / 4;
    this.drawCheckbox(xCoords, yCoords, cornerRadius, checkboxProp, layer, index);

    // attributes for label
    const labelPosX = this.chartOptions.startPosition / 2;
    const labelPosY = yCoords + (layerHeight / 2) - margin;
    this.drawLabel(labelPosX, labelPosY, optionLabel, layer);

    // attributes for circle
    const circleX = (xCoords) + checkboxProp / 2;
    const circleY = (yCoords) + checkboxProp / 2;
    if (index === this.filterType) {
      this.drawCircle(circleX, circleY, layer);
    }

    // this.drawCircle(circleX, circleY, layer);

  }

  drawCheckbox(xCoords, yCoords, cornerRadius, checkboxProp, layer, index) {
    const checkbox = createSVG('rect', {
      x: xCoords,
      y: yCoords,
      rx: cornerRadius,
      ry: cornerRadius,
      width: checkboxProp,
      height: checkboxProp,
      class: 'checkbox',
      append_to: layer
    });
    this.setClickItem(checkbox, index);
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

  drawCircle(posX, posY, layer) {
    const radius = 5;
    this.optionChecked = createSVG('circle', {
      cx: posX,
      cy: posY,
      r: radius,
      class: 'circle',
      append_to: layer
    });
  }

  setClickItem(itemClickable, index) {
    on(itemClickable, 'click', e => {
      if (index !== this.filterType) {
        Filter.changeFilter(index, this.ganttComponent);
      }
    });
  }

}
