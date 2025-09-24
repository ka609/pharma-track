import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sale } from '../models/sale.model';
import { MedicineService } from './medicine.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SalesService {
  private sales: Sale[] = [];

  constructor(private medicineService: MedicineService) {
    this.loadSales(); 
  }

  private saveSales() {
    localStorage.setItem('sales', JSON.stringify(this.sales));
  }

  // ✅ Chargement des ventes sauvegardées
  private loadSales() {
    const saved = localStorage.getItem('sales');
    if (saved) {
      this.sales = JSON.parse(saved);
    }
  }

  getAll(): Observable<Sale[]> {
    return this.medicineService.getAll().pipe(
      map(meds => this.sales.map(sale => {
        const med = meds.find(m => m.id === sale.medicineId);
        return {
          ...sale,
          medicineName: med ? med.name : sale.medicineName || 'Inconnu',
          category: med ? med.category : sale.category || 'Non défini',
          unitPrice: med ? med.price : sale.unitPrice || 0,
          totalPrice: sale.quantity * (med ? med.price : sale.unitPrice || 0)
        };
      }))
    );
  }

  create(sale: Sale): Observable<Sale> {
    sale.id = this.sales.length + 1;
    sale.date = new Date().toLocaleString('fr-FR');

    this.medicineService.getById(sale.medicineId).subscribe(med => {
      if (med) {
        sale.unitPrice = med.price;
        sale.totalPrice = med.price * sale.quantity;
        sale.category = med.category;

        // Décrémente le stock
        med.stock -= sale.quantity;
        this.medicineService.update(med).subscribe();
      }
    });

    this.sales.push(sale);
    this.saveSales(); // ✅ persiste après ajout
    return of(sale);
  }

  delete(id: number): Observable<void> {
    this.sales = this.sales.filter(s => s.id !== id);
    this.saveSales(); // ✅ met à jour après suppression
    return of(void 0);
  }
}
