import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlChartService } from '../../control-chart.service';
import { MessageService } from 'primeng/api';
import {ControlChart} from "../../models/control-chart.model";
import {Echantillon} from "../../models/echantillon.model";
import {Measurement} from "../../models/measurement.model";

@Component({
  selector: 'app-edit-control-chart',
  templateUrl: './edit-control-chart.component.html',
  styleUrls: ['./edit-control-chart.component.css']
})
export class EditControlChartComponent implements OnInit {
  controlChart: ControlChart | null = null;
  newEchantillon: Echantillon = new Echantillon();
  newMeasurementValue: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private controlChartService: ControlChartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.controlChartService.getById(id).subscribe(controlChart => {
        this.controlChart = controlChart;
      });
    }
  }

  addMeasurementToEchantillon(echantillon: Echantillon): void {
    if (this.newMeasurementValue !== null && this.newMeasurementValue !== undefined) {
      const measurement = new Measurement();
      measurement.value = this.newMeasurementValue;
      echantillon.measurements.push(measurement);
      this.newMeasurementValue = 0;
    }
  }

  addEchantillon(): void {
    if (this.controlChart) {
      this.controlChart.echantillons.push(this.newEchantillon);
      this.saveControlChart();
      this.newEchantillon = new Echantillon();
    }
  }

  editEchantillon(echantillon: Echantillon): void {
    this.newEchantillon = { ...echantillon };
  }

  deleteEchantillon(echantillonId: string): void {
    if (this.controlChart) {
      this.controlChart.echantillons = this.controlChart.echantillons.filter(e => e.id !== echantillonId);
      this.saveControlChart();
    }
  }

  saveControlChart(): void {
    if (this.controlChart) {
      this.controlChartService.update(this.controlChart.id!, this.controlChart).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Control Chart updated successfully' });
        this.router.navigate(['/control-charts']);
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update Control Chart' });
      });
    }
  }
}
