import { TestBed } from '@angular/core/testing';

import { ControlChartService } from './control-chart.service';

describe('ControlChartService', () => {
  let service: ControlChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
