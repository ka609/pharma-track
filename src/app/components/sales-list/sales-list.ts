import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../models/sale.model';
import { Router } from '@angular/router';
import { DecimalPipe, DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.html',
  standalone: true,
  imports: [CommonModule, DecimalPipe]
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  loading = false;
  dailyRevenue: number = 0; // chiffre d’affaires du jour

  constructor(private salesService: SalesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSales();
  }

  fetchSales() {
    this.loading = true;
    this.salesService.getAll().subscribe({
      next: (data) => { 
        // ⚡ calcul du prix total par vente et du chiffre d’affaires
        this.sales = data.map(sale => ({
          ...sale,
          totalPrice: sale.quantity * sale.unitPrice   // recalcul automatique
        }));
        this.calculateDailyRevenue();
        this.loading = false; 
      },
      error: () => { this.loading = false; }
    });
  }

  calculateDailyRevenue() {
    this.dailyRevenue = this.sales.reduce((sum, sale) => sum + (sale.totalPrice || 0), 0);
  }

  addNew() {
    this.router.navigate(['/sales/new']);
  }

  delete(sale: Sale) {
    if (sale.id !== undefined && confirm('Voulez-vous vraiment supprimer cette vente ?')) {
      this.salesService.delete(sale.id).subscribe(() => this.fetchSales());
    }
  }
}
