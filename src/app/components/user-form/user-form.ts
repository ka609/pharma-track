import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  isEdit = false;
  userToEdit: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.userService.getById(+id).subscribe(user => {
        this.userToEdit = user;
        this.form.patchValue(user);
      });
    }
  }

  submit() {
    if (!this.form.valid) return;

    this.submitting = true;
    const userData = this.form.value;

    if (this.isEdit && this.userToEdit) {
      const updatedUser = { ...this.userToEdit, ...userData };
      this.userService.update(updatedUser).subscribe({
        next: () => this.router.navigate(['/users-list']),
        error: () => (this.submitting = false)
      });
    } else {
      this.userService.create(userData).subscribe({
        next: () => this.router.navigate(['/users-list']),
        error: () => (this.submitting = false)
      });
    }
  }
}
