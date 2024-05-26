import { Component, OnInit } from '@angular/core';
import { MeasurementService, Measurement } from '../measurement.service';

@Component({
  selector: 'app-measurement-list',
  templateUrl: './measurement-list.component.html',
  styleUrls: ['./measurement-list.component.css']
})
export class MeasurementListComponent implements OnInit {
  measurements: Measurement[] = [];
  selectedMeasurement: Measurement | null = null;
  isDialogVisible: boolean = false;

  constructor(private measurementService: MeasurementService) {}

  ngOnInit(): void {
    this.loadMeasurements();
  }

  loadMeasurements(): void {
    this.measurementService.getMeasurements().subscribe(data => {
      this.measurements = data;
    });
  }

  editMeasurement(measurement: Measurement): void {
    this.selectedMeasurement = { ...measurement };
    this.isDialogVisible = true;
  }

  saveMeasurement(): void {
    if (this.selectedMeasurement) {
      this.measurementService.updateMeasurement(this.selectedMeasurement).subscribe(() => {
        this.loadMeasurements();
        this.selectedMeasurement = null;
        this.isDialogVisible = false;
      });
    }
  }

  deleteMeasurement(id: string): void {
    this.measurementService.deleteMeasurement(id).subscribe(() => {
      this.loadMeasurements();
    });
  }

  cancelEdit(): void {
    this.selectedMeasurement = null;
    this.isDialogVisible = false;
  }
}
