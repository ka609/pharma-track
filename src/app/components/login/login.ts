import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent implements OnInit {
  errorMsg = '';
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['user', Validators.required]  // ajout du rôle avec valeur par défaut
    });
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
  const { username, password, role } = this.loginForm.value;

  console.log('Form values:', username, password, role); // <- debug
  if (this.auth.login(username!, password!, role!)) {
    console.log('Connexion réussie');
    this.router.navigate(['/dashboard']); // redirection
  } else {
    this.errorMsg = 'Identifiants invalides';
  }
}

}
