import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sale } from '../models/sale.model';
import { MedicineService } from './medicine.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private sales: Sale[] = [];

  constructor(private medicineService: MedicineService) {}

  getAll(): Observable<Sale[]> {
    // Ajoute le nom du médicament pour affichage
    return this.medicineService.getAll().pipe(
      map(meds => 
        this.sales.map(sale => ({
          ...sale,
          medicineName: meds.find(m => m.id === sale.medicineId)?.name,
          totalPrice: (meds.find(m => m.id === sale.medicineId)?.price || 0) * sale.quantity
        }))
      )
    );
  }

  create(sale: Sale): Observable<Sale> {
    sale.id = this.sales.length + 1;
    sale.date = new Date().toISOString();
    this.sales.push(sale);

    // Décrémente le stock du médicament
    this.medicineService.getById(sale.medicineId).subscribe(med => {
      if (med) {
        med.stock = med.stock - sale.quantity;
        this.medicineService.update(med).subscribe();
      }
    });

    return of(sale);
  }

  delete(id: number): Observable<void> {
    this.sales = this.sales.filter(s => s.id !== id);
    return of(void 0);
  }
}
