import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartData, ChartOptions } from 'chart.js';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgChartsModule, RouterModule]
})
export class DashboardComponent implements OnInit {
  dailyRevenue: number = 0;          
  dailyQuantity: number = 0;         
  lowStockMedicines: any[] = [];     

  salesChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{ data: [], label: 'Ventes' }]
  };

  salesChartType: 'line' = 'line';
  salesChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
    }
  };

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDailyRevenue().subscribe(val => {
      this.dailyRevenue = val;
    });

    this.dashboardService.getDailyQuantity().subscribe(val => {
      this.dailyQuantity = val;
    });

    // Récupérer les médicaments proches de rupture
    this.dashboardService.getLowStockMedicines().subscribe(val => {
      this.lowStockMedicines = val;
    });

    // Charger le graphique des ventes hebdomadaires
    this.dashboardService.getWeeklySales().subscribe(chart => {
      this.salesChartData = {
        labels: chart.labels,
        datasets: chart.datasets
      };
    });

    // Redirection vers login si non authentifié
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
  this.auth.logout();
  this.router.navigate(['/login']);
}

}
