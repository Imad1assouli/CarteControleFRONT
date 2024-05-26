import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddXbarControlChartComponent } from './add-xbar-control-chart.component';

describe('AddXbarControlChartComponent', () => {
  let component: AddXbarControlChartComponent;
  let fixture: ComponentFixture<AddXbarControlChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddXbarControlChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddXbarControlChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
