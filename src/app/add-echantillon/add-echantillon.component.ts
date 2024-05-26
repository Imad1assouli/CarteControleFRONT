import { Component } from '@angular/core';
import { EchantillonService } from '../echantillon.service';
import { MessageService } from 'primeng/api';
import {Echantillon} from "../models/echantillon.model";
import {Measurement} from "../models/measurement.model";

@Component({
  selector: 'app-add-echantillon',
  templateUrl: './add-echantillon.component.html',
  styleUrls: ['./add-echantillon.component.css']
})
export class AddEchantillonComponent {
  echantillon: Echantillon = new Echantillon();
  measurementValue: number = 0;

  constructor(private echantillonService: EchantillonService, private messageService: MessageService) {}

  addMeasurement() {
    if (this.measurementValue !== null && this.measurementValue !== undefined) {
      const measurement = new Measurement();
      measurement.value = this.measurementValue;
      this.echantillon.measurements.push(measurement);
      this.measurementValue = 0;
    }
  }

  saveEchantillon() {
    this.echantillonService.create(this.echantillon).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Echantillon created successfully' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create Echantillon' });
      }
    );
  }
}
