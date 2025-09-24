import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service'; // <-- importer le service Auth

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] 
})
export class App {
  protected readonly title = signal('pharma-track');

  // Injecter AuthService pour gérer login/logout
  constructor(public auth: AuthService) {}

  // Méthode de déconnexion
  logout(): void {
    this.auth.logout();
  }
}
