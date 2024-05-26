import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Echantillon} from "./models/echantillon.model";

@Injectable({
  providedIn: 'root'
})
export class EchantillonService {
  private baseUrl = 'http://localhost:8080/api/echantillons';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Echantillon[]> {
    return this.http.get<Echantillon[]>(this.baseUrl);
  }

  getById(id: string): Observable<Echantillon> {
    return this.http.get<Echantillon>(`${this.baseUrl}/${id}`);
  }

  create(echantillon: Echantillon): Observable<Echantillon> {
    return this.http.post<Echantillon>(this.baseUrl, echantillon);
  }

  update(id: string, echantillon: Echantillon): Observable<Echantillon> {
    return this.http.put<Echantillon>(`${this.baseUrl}/${id}`, echantillon);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
