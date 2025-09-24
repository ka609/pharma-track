import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SalesService } from './sales.service';
import { Sale } from '../models/sale.model';
import { MedicineService } from './medicine.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private salesService: SalesService,
    private medicineService: MedicineService
  ) {}

  // Médicaments proches de rupture (stock < 10)
  getLowStockMedicines(): Observable<any[]> {
    return this.medicineService.getAll().pipe(
      map(meds => meds.filter(m => m.stock < 10))
    );
  }

  // Chiffre d'affaires du jour
  getDailyRevenue(): Observable<number> {
    const today = new Date().toLocaleDateString('fr-FR'); // '23/09/2025'
    return this.salesService.getAll().pipe(
      map(sales => sales.filter(s => s.date.startsWith(today))),
      map(todaySales =>
      todaySales.reduce((total, s) => total + (s.totalPrice ?? 0), 0)
      )
    );
  }

  // Quantité totale vendue du jour
  getDailyQuantity(): Observable<number> {
    const today = new Date().toLocaleDateString('fr-FR');
    return this.salesService.getAll().pipe(
      map(sales => sales.filter(s => s.date.startsWith(today))),
      map(todaySales => todaySales.reduce((total, s) => total + s.quantity, 0))
    );
  }

  // Nombre de ventes du jour
  getDailySalesCount(): Observable<number> {
    const today = new Date().toLocaleDateString('fr-FR');
    return this.salesService.getAll().pipe(
      map(sales => sales.filter(s => s.date.startsWith(today)).length)
    );
  }

  // Ventes par semaine (pour le graphique)
  getWeeklySales(): Observable<any> {
    return this.salesService.getAll().pipe(
      map(sales => {
        const labels = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
        const data = [0, 0, 0, 0, 0, 0, 0];

        sales.forEach(s => {
          const day = new Date(s.date).getDay(); // 0=Dimanche
          const index = day === 0 ? 6 : day - 1;
          data[index] += s.quantity;
        });

        return { labels, datasets: [{ data, label: 'Ventes' }] };
      })
    );
  }
}
