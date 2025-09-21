import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-medicine-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicine-form.html',
  styleUrls: ['./medicine-form.scss']
})
export class MedicineFormComponent implements OnInit {
  form: FormGroup;
  editingId: number | null = null;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      expiryDate: ['', [Validators.required, this.dateValidator]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = +idParam;
      this.medicineService.getById(this.editingId).subscribe({
        next: (med) => this.form.patchValue(med),
        error: () => alert('Impossible de charger le médicament.')
      });
    }
  }

  dateValidator(control: AbstractControl) {
    if (!control.value) return null;
    const d = Date.parse(control.value);
    return isNaN(d) ? { invalidDate: true } : null;
  }

  submit() {
    this.submitting = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submitting = false;
      return;
    }

    const payload: Medicine = {
      ...this.form.value,
      price: +this.form.value.price,
      stock: +this.form.value.stock
    };

    if (this.editingId) {
      payload.id = this.editingId;
      this.medicineService.update(payload).subscribe({
        next: () => { alert('Médicament mis à jour.'); this.router.navigate(['/medicines']); },
        error: () => { alert('Erreur mise à jour.'); this.submitting = false; }
      });
    } else {
      this.medicineService.create(payload).subscribe({
        next: () => { alert('Médicament ajouté.'); this.router.navigate(['/medicines']); },
        error: () => { alert('Erreur ajout.'); this.submitting = false; }
      });
    }
  }

  hasError(controlName: string, error: string) {
    const c = this.form.get(controlName);
    return c && c.touched && c.hasError(error);
  }
}
