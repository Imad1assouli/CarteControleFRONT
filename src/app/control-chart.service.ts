import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ControlChart} from "./models/control-chart.model";

@Injectable({
  providedIn: 'root'
})
export class ControlChartService {
  private baseUrl = 'http://localhost:8080/api/controlcharts';

  constructor(private http: HttpClient) { }

  create(controlChart: ControlChart): Observable<ControlChart> {
    return this.http.post<ControlChart>(this.baseUrl, controlChart);
  }

  getAll(): Observable<ControlChart[]> {
    return this.http.get<ControlChart[]>(this.baseUrl);
  }

  getById(id: string): Observable<ControlChart> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache').set('Pragma', 'no-cache');
    return this.http.get<ControlChart>(`${this.baseUrl}/${id}`, { headers });
  }

  update(id: string, controlChart: ControlChart): Observable<ControlChart> {
    return this.http.put<ControlChart>(`${this.baseUrl}/${id}`, controlChart);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
