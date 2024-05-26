import { Component, OnInit } from '@angular/core';
import { ControlChartService } from '../control-chart.service';
import { ControlChart } from '../models/control-chart.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-control-chart',
  templateUrl: './control-chart.component.html',
  styleUrls: ['./control-chart.component.css']
})
export class ControlChartComponent implements OnInit {
  controlCharts: ControlChart[] = [];

  constructor(
      private controlChartService: ControlChartService,
      private router: Router,
      private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadControlCharts();
  }

  loadControlCharts(): void {
    this.controlChartService.getAll().subscribe(
      (data) => {
        this.controlCharts = data;
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load control charts' });
      }
    );
  }

  editControlChart(chartId: string): void {
    if (chartId) {
      this.router.navigate(['/edit-control-chart', chartId]);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid chart ID' });
    }
  }

  deleteControlChart(id: string): void {
    this.controlChartService.delete(id).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Control Chart deleted successfully' });
      this.loadControlCharts(); // Refresh the list after deletion
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete Control Chart' });
    });
  }

  viewControlChart(chartId: string): void {
    if (chartId) {
      this.router.navigate([`/graph`, chartId]);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid chart ID' });
    }
  }
}
