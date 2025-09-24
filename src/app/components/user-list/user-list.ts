import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.html',
  standalone: true,
  imports: [CommonModule]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: data => { this.users = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  addNew() {
    this.router.navigate(['/users/new']);
  }

  editUser(user: User) {
    this.router.navigate(['/users/edit', user.id]);
  }

  delete(user: User) {
  if (user.id !== undefined && confirm('Voulez-vous vraiment supprimer cette vente ?')) {
    this.userService.delete(user.id).subscribe(() => this.fetchUsers());
  }
}

}
