import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/medicine.model';

@Injectable({ providedIn: 'root' })
export class MedicineService {
  private apiUrl = 'http://localhost:3000/medicines';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl);
  }

  getById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.apiUrl}/${id}`);
  }

  create(med: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.apiUrl, med);
  }

  update(med: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.apiUrl}/${med.id}`, med);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLowStock(limit = 10): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(`${this.apiUrl}?stock_lte=${limit}`);
  }
}
