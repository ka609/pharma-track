import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-credentials',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-credentials.html'
})
export class ChangeCredentialsComponent {
  form: FormGroup;
  successMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    const currentAdmin = auth.getUser() || { username: '', password: '' };
    this.form = this.fb.group({
      username: [currentAdmin.username, Validators.required],
      password: ['', Validators.required]
    });
  }

  onSave() {
    const { username, password } = this.form.value;
    this.auth.updateAdminCredentials(username, password);
    this.successMsg = 'Identifiants mis à jour avec succès !';
  }
}
