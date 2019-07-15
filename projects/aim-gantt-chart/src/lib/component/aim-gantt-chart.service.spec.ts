import { TestBed } from '@angular/core/testing';

import { AimGanttChartService } from '../service/aim-gantt-chart.service';

describe('AimGanttChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AimGanttChartService = TestBed.get(AimGanttChartService);
    expect(service).toBeTruthy();
  });
});
