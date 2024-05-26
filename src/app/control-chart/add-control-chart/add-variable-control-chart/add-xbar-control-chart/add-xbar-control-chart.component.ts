import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ControlChart } from '../../../../models/control-chart.model';
import { Echantillon } from '../../../../models/echantillon.model';
import { ControlChartService } from '../../../../control-chart.service';
import { Measurement } from '../../../../models/measurement.model';
import {nanoid} from "nanoid";



@Component({
  selector: 'app-add-xbar-control-chart',
  templateUrl: './add-xbar-control-chart.component.html',
  styleUrls: ['./add-xbar-control-chart.component.css']
})
export class AddXbarControlChartComponent implements OnInit {
  controlChart: ControlChart = new ControlChart();
  newEchantillon: Echantillon = new Echantillon();
  newMeasurementValue: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private controlChartService: ControlChartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.controlChart.type = 'X-bar'; // Ensure type is set
  }

  addMeasurementToEchantillon(): void {
    if (this.newMeasurementValue !== null && this.newMeasurementValue !== undefined) {
      const measurement = new Measurement();
      measurement.value = this.newMeasurementValue;
      this.newEchantillon.measurements.push(measurement);
      this.newMeasurementValue = 0; // Reset to initial value
    }
  }

  addEchantillon(): void {
    if (!this.newEchantillon.id) {
      this.newEchantillon.id = nanoid();
    }
    this.controlChart.echantillons.push(this.newEchantillon);
    this.newEchantillon = new Echantillon();
  }

  saveControlChart(): void {
    if (!this.controlChart.id) {
      this.controlChart.id = nanoid();
    }
    this.controlChartService.create(this.controlChart).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Control Chart created successfully' });
      this.router.navigate(['/control-charts']);
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create Control Chart' });
    });
  }
}
