import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'currentUser';
  private adminKey = 'adminCredentials';


  constructor(private router: Router) {
    // Initialiser les identifiants admin par défaut si inexistants
    if (!localStorage.getItem(this.adminKey)) {
      localStorage.setItem(this.adminKey, JSON.stringify({ username: 'admin', password: 'admin' }));
    }
  }

  // Connexion avec rôle et identifiants persistants
  login(username: string, password: string, role: string): boolean {
    const adminCred = JSON.parse(localStorage.getItem(this.adminKey) || '{}');

    if (role === 'admin' && username === adminCred.username && password === adminCred.password) {
      localStorage.setItem(this.userKey, JSON.stringify({ username, role }));
      return true;
    } else if (role === 'user' && username === 'user' && password === 'user') {
      localStorage.setItem(this.userKey, JSON.stringify({ username, role }));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.userKey);
  }
  isLoggedIn(): boolean {
    return this.getRole() !== null; // ou vérifie le token si tu en utilises un
  }

  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // Nouvelle méthode pour changer les identifiants admin
  updateAdminCredentials(newUsername: string, newPassword: string) {
    localStorage.setItem(this.adminKey, JSON.stringify({ username: newUsername, password: newPassword }));

    // Si l'admin est connecté, mettre à jour les infos en session
    const currentUser = this.getUser();
    if (currentUser?.role === 'admin') {
      localStorage.setItem(this.userKey, JSON.stringify({ username: newUsername, role: 'admin' }));
    }
  }
}
