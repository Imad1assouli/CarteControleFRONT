import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlChartService } from '../control-chart.service';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { ControlChart } from '../models/control-chart.model';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  controlChart: ControlChart | null = null;
  chartOption: EChartsOption = {};
  chartInstance: any;

  constructor(private route: ActivatedRoute, private controlChartService: ControlChartService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadControlChart(id);
    }
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  loadControlChart(id: string): void {
    this.controlChartService.getById(id).subscribe(controlChart => {
      this.controlChart = controlChart;
      if (this.controlChart) {
        this.addInterpretations(this.controlChart);
        this.updateChart(this.controlChart);
      }
    });
  }

  initChart(): void {
    const chartDom = document.getElementById('chart');
    if (chartDom) {
      this.chartInstance = echarts.init(chartDom);
    }
  }

  updateChart(controlChart: ControlChart): void {
    if (!controlChart || !controlChart.echantillons) {
      return;
    }

    const measurements = controlChart.echantillons.flatMap(e => e.measurements).map(m => m.value);
    const minValue = Math.min(...measurements);
    const maxValue = Math.max(...measurements);

    this.chartOption = {
      xAxis: {
        type: 'category',
        data: controlChart.echantillons.flatMap(e => e.measurements).map((_, index) => index + 1)  // Assuming measurements are sequential
      },
      yAxis: {
        type: 'value',
        min: Math.min(controlChart.lowerControlLimit * 0.95, minValue),
        max: Math.max(controlChart.upperControlLimit * 1.05, maxValue)
      },
      series: [
        {
          name: 'Measurements',
          type: 'line',
          data: measurements
        },
        {
          name: 'LCL', // Lower Control Limit
          type: 'line',
          data: Array(measurements.length).fill(controlChart.lowerControlLimit),
          lineStyle: {
            type: 'dashed'
          }
        },
        {
          name: 'UCL', // Upper Control Limit
          type: 'line',
          data: Array(measurements.length).fill(controlChart.upperControlLimit),
          lineStyle: {
            type: 'dashed'
          }
        },
        {
          name: 'LSL', // Lower Security Limit
          type: 'line',
          data: Array(measurements.length).fill(controlChart.lowerSecurityLimit),
          lineStyle: {
            type: 'dashed',
            color: 'red'
          }
        },
        {
          name: 'USL', // Upper Security Limit
          type: 'line',
          data: Array(measurements.length).fill(controlChart.upperSecurityLimit),
          lineStyle: {
            type: 'dashed',
            color: 'red'
          }
        },
        {
          name: 'CL', // Central Line (X-bar)
          type: 'line',
          data: Array(measurements.length).fill(controlChart.centralLine),
          lineStyle: {
            type: 'dashed'
          }
        },
        {
          name: 'XBar',
          type: 'line',
          data: Array(measurements.length).fill(controlChart.xBar),
          lineStyle: {
            type: 'dashed',
            color: 'green'
          }
        },
        {
          name: 'RBar',
          type: 'line',
          data: Array(measurements.length).fill(controlChart.rBar),
          lineStyle: {
            type: 'dashed',
            color: 'purple'
          }
        },
        {
          name: 'Upper Tolerance Limit',
          type: 'line',
          data: Array(measurements.length).fill(controlChart.upperToleranceLimit),
          lineStyle: {
            type: 'dashed',
            color: 'blue'
          }
        },
        {
          name: 'Lower Tolerance Limit',
          type: 'line',
          data: Array(measurements.length).fill(controlChart.lowerToleranceLimit),
          lineStyle: {
            type: 'dashed',
            color: 'blue'
          }
        }
      ]
    };

    if (this.chartInstance) {
      this.chartInstance.setOption(this.chartOption);
    }
  }

  addInterpretations(controlChart: ControlChart): void {
    const values = controlChart.echantillons.flatMap(e => e.measurements).map(m => m.value);
    const upperControlLimit = controlChart.upperControlLimit;
    const lowerControlLimit = controlChart.lowerControlLimit;
    const centralLine = controlChart.centralLine;
    const interpretations: string[] = [];

    // Check for points outside control limits
    for (const value of values) {
      if (value > upperControlLimit || value < lowerControlLimit) {
        interpretations.push('Si un ou plusieurs points sont en dehors des limites de contrôle supérieure (UCL) ou inférieure (LCL), cela indique que le processus est hors contrôle et qu\'il y a des causes spéciales de variation qui doivent être identifiées et éliminées.');
        break;
      }
    }

    // Check for trends and patterns
    if (this.checkTrend(values)) {
      interpretations.push('Une série de points montrant une tendance constante vers le haut ou vers le bas peut indiquer une dérive du processus.');
    }
    if (this.checkCycles(values)) {
      interpretations.push('Des cycles réguliers peuvent suggérer une variation systématique due à des causes récurrentes.');
    }
    if (this.checkSameSide(values, centralLine)) {
      interpretations.push('Si plusieurs points consécutifs sont du même côté de la ligne centrale, cela peut indiquer un biais dans le processus.');
    }

    // Check for points near control limits
    if (this.checkNearControlLimits(values, upperControlLimit, lowerControlLimit)) {
      interpretations.push('Si beaucoup de points sont proches des limites de contrôle, cela peut indiquer une instabilité du processus.');
    }

    // Check for lack of variability
    if (this.checkLackOfVariability(values, centralLine)) {
      interpretations.push('Si les points sont très proches de la ligne centrale et ne montrent que peu de variabilité, cela pourrait indiquer que le processus est trop contrôlé ou que les données ont été manipulées.');
    }

    // Process capability interpretations
    const { cp, cpk, cm, cmk } = controlChart;
    if (cp !== undefined && cpk !== undefined && cm !== undefined && cmk !== undefined) {
      if (cp > 1 && cm > 1 && cpk > 1 && cmk > 1) {
        interpretations.push('Les points sont majoritairement à l\'intérieur des limites de contrôle sans tendance ou motifs inhabituels. Cm, Cp, Cmk, et Cpk sont tous supérieurs à 1, indiquant que le processus est capable et bien centré.');
      } else if (cp < 1 && cm < 1) {
        interpretations.push('Les points sont à l\'intérieur des limites de contrôle, mais Cm et Cp sont inférieurs à 1. Cela signifie que même si le processus est stable, il ne produit pas dans les limites spécifiées.');
      } else if (cpk < cmk) {
        interpretations.push('Les indices Cmk et Cpk sont inférieurs à Cm et Cp, indiquant que le processus est décalé par rapport aux spécifications.');
      } else {
        interpretations.push('Points en dehors des limites de contrôle ou montrant des tendances/motifs inhabituels. Indique la présence de causes spéciales de variation. Les indices Cm, Cp, Cmk, et Cpk peuvent être trompeurs car ils présupposent un processus stable.');
      }
    }

    // If interpretations are still empty, add a default interpretation
    if (interpretations.length === 0) {
      interpretations.push('Le machine ou processus fonctionne normalement.');
    }

    controlChart.interpretations = interpretations;
    console.log('Interpretations: ', interpretations);  // Debug log for frontend
  }

  checkRun(values: number[], centralLine: number, runLength: number): boolean {
    let countAbove = 0;
    let countBelow = 0;

    for (const value of values) {
      if (value > centralLine) {
        countAbove++;
        countBelow = 0;
      } else {
        countBelow++;
        countAbove = 0;
      }

      if (countAbove >= runLength || countBelow >= runLength) {
        return true;
      }
    }
    return false;
  }

  checkTrend(values: number[]): boolean {
    const n = values.length;
    if (n < 7) return false;

    for (let i = 0; i <= n - 7; i++) {
      const trend = values.slice(i, i + 7);
      if (trend.every((v, j, a) => j === 0 || v > a[j - 1]) || trend.every((v, j, a) => j === 0 || v < a[j - 1])) {
        return true;
      }
    }
    return false;
  }

  checkCycles(values: number[]): boolean {
    const n = values.length;
    if (n < 14) return false;

    for (let i = 0; i <= n - 14; i++) {
      const cycle = values.slice(i, i + 14);
      if (cycle.slice(0, 7).every((v, j, a) => v === cycle[j + 7])) {
        return true;
      }
    }
    return false;
  }

  checkSameSide(values: number[], centralLine: number): boolean {
    let countAbove = 0;
    let countBelow = 0;

    for (const value of values) {
      if (value > centralLine) {
        countAbove++;
        countBelow = 0;
      } else {
        countBelow++;
        countAbove = 0;
      }

      if (countAbove >= 7 || countBelow >= 7) {
        return true;
      }
    }
    return false;
  }

  checkNearControlLimits(values: number[], upperControlLimit: number, lowerControlLimit: number): boolean {
    const nearLimit = 0.05; // 5% of the control limit range

    const nearUpperLimit = upperControlLimit * (1 - nearLimit);
    const nearLowerLimit = lowerControlLimit * (1 + nearLimit);

    return values.some(value => value >= nearUpperLimit || value <= nearLowerLimit);
  }

  checkLackOfVariability(values: number[], centralLine: number): boolean {
    const variability = 0.01; // 1% of the central line value

    const lowerBound = centralLine * (1 - variability);
    const upperBound = centralLine * (1 + variability);

    return values.every(value => value >= lowerBound && value <= upperBound);
  }
}
