import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimGanttChartComponent } from './aim-gantt-chart.component';

describe('AimGanttChartComponent', () => {
  let component: AimGanttChartComponent;
  let fixture: ComponentFixture<AimGanttChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimGanttChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimGanttChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
