import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { MedicineService } from '../../services/medicine.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class SalesFormComponent implements OnInit {
  form: FormGroup;
  medicines: Medicine[] = [];
  submitting = false;

  // ✅ Messages flottants
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private salesService: SalesService,
    private medicineService: MedicineService,
    private router: Router
  ) {
    this.form = this.fb.group({
      medicineId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      totalPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines() {
    this.medicineService.getAll().subscribe(meds => this.medicines = meds);
  }

  submit() {
    if (this.form.valid) {
      this.submitting = true;
      this.form.patchValue({ totalPrice: this.calculateTotal() });

      this.salesService.create(this.form.value).subscribe({
        next: () => {
          this.submitting = false;
          this.successMessage = '✅ Vente enregistrée avec succès !';
          this.errorMessage = '';

          // Disparition auto après 3s
          setTimeout(() => this.successMessage = '', 3000);

          // Réinitialiser le formulaire
          this.form.reset({ quantity: 1, totalPrice: 0 });

          // Redirection après 1.5s
          setTimeout(() => this.router.navigate(['/sales-list']), 1500);
        },
        error: () => {
          this.submitting = false;
          this.errorMessage = '❌ Erreur lors de l’enregistrement de la vente.';
          this.successMessage = '';

          // Disparition auto après 3s
          setTimeout(() => this.errorMessage = '', 3000);
        }
      });
    }
  }

  calculateTotal() {
    const med = this.medicines.find(m => m.id === this.form.value.medicineId);
    return (med?.price || 0) * this.form.value.quantity;
  }
}
