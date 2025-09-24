import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/medicine.model';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter} from 'rxjs';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DecimalPipe],
  templateUrl: './medicine-list.html',
  styleUrls: ['./medicine-list.scss']
})
export class MedicineListComponent implements OnInit {
  medicines: Medicine[] = [];
  filteredMedicines: Medicine[] = [];
  searchTerm: string = '';
  loading = false;

  constructor(private medicineService: MedicineService, private router: Router) {
    // Recharge la liste automatiquement après retour de navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.load());
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.medicineService.getAll().subscribe({
      next: (data) => {
        // Trier par nom
        this.medicines = data.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredMedicines = [...this.medicines];
        this.loading = false;
      },
      error: () => {
        alert('Erreur lors du chargement des médicaments.');
        this.loading = false;
      }
    });
  }

  search() {
    const term = this.searchTerm.toLowerCase();
    this.filteredMedicines = this.medicines.filter(m =>
      m.name.toLowerCase().includes(term) || (m.category && m.category.toLowerCase().includes(term))
    );
  }

  delete(med: Medicine) {
    if (!confirm(`Supprimer ${med.name} ?`)) return;
    this.medicineService.delete(med.id!).subscribe({
      next: () => this.load(),
      error: () => alert('Erreur lors de la suppression.')
    });
  }

  edit(med: Medicine) {
    this.router.navigate(['/medicines/edit', med.id]);
  }

  addNew() {
    this.router.navigate(['/medicines/new']);
  }
}
