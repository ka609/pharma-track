import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../models/sale.model';
import { Router } from '@angular/router';
import { DecimalPipe, DatePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.html',
  standalone: true,
  imports: [CommonModule, DecimalPipe, DatePipe]
})
export class SalesListComponent implements OnInit {
  sales: Sale[] = [];
  loading = false;

  constructor(private salesService: SalesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchSales();
  }

  fetchSales() {
    this.loading = true;
    this.salesService.getAll().subscribe({
      next: (data) => { this.sales = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
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


