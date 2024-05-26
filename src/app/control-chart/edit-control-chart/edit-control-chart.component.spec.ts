import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditControlChartComponent } from './edit-control-chart.component';

describe('EditControlChartComponent', () => {
  let component: EditControlChartComponent;
  let fixture: ComponentFixture<EditControlChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditControlChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditControlChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
