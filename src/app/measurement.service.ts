import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Measurement {
  id: string;
  controlChartId: string;
  value?: number;  // For Variable charts
  conforming?: boolean;  // For Attribute charts
}

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private apiUrl = 'http://localhost:8080/api/measurements';

  constructor(private http: HttpClient) {}

  getMeasurements(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(this.apiUrl);
  }

  getMeasurementsByControlChartId(controlChartId: string): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${this.apiUrl}/${controlChartId}`);
  }

  addMeasurement(measurement: Measurement): Observable<Measurement> {
    return this.http.post<Measurement>(this.apiUrl, measurement);
  }

  updateMeasurement(measurement: Measurement): Observable<Measurement> {
    return this.http.put<Measurement>(`${this.apiUrl}/${measurement.id}`, measurement);
  }

  deleteMeasurement(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
